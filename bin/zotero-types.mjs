#!/usr/bin/env node
/**
 * zotero-types CLI — generate TypeScript declarations for Zotero plugins
 * based on the permissions declared in their manifest.json.
 *
 * Usage:
 *   npx zotero-types generate [options]
 *   npx zotero-types generate-bundled [options]   (internal: all-permissions build)
 *
 * Options:
 *   --manifest <path>        Path to plugin manifest.json (default: ./manifest.json)
 *   --outdir <path>          Output directory (default: ./typings/zotero)
 *   --zotero-client <path>   Use a local zotero-client checkout instead of GitHub
 *   --permissions <list>     Comma-separated permissions (overrides manifest)
 *   --help                   Show help
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  loadSchema,
  EXTERNAL_TYPE_SCHEMAS,
  SANDBOX_GECKO_GLOBALS,
} from "../scripts/lib/schema-loader.mjs";
import { createTypeEmitter } from "../scripts/lib/type-emitter.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

function showHelp() {
  console.log(`
zotero-types — Generate TypeScript declarations for Zotero plugins.

Usage:
  npx zotero-types generate [options]
  npx zotero-types generate-bundled [options]

Commands:
  generate          Generate .d.ts files based on plugin permissions
  generate-bundled  Generate all-permissions bundled types (for zotero-types internal use)

Options (generate):
  --manifest <path>        Path to plugin manifest.json (default: ./manifest.json)
  --outdir <path>          Output directory (default: ./typings/zotero)
  --zotero-client <path>   Use a local zotero-client checkout for schema
                           (default: fetch from GitHub)
  --permissions <list>     Comma-separated permissions, overrides manifest
                           (e.g., --permissions data,fileSystem,network)

Options (generate-bundled):
  --zotero-client <path>   Use a local zotero-client checkout for schema
                           (default: fetch from GitHub)

  --help                   Show this help message
`);
}

if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  showHelp();
  process.exit(0);
}

const command = args[0];
if (command !== "generate" && command !== "generate-bundled") {
  console.error(`Unknown command: ${command}`);
  console.error(`Run "npx zotero-types --help" for usage.`);
  process.exit(1);
}

let manifestPath = null;
let outDir = path.resolve("typings/zotero");
let zoteroClientPath = null;
let cliPermissions = null;

for (let i = 1; i < args.length; i++) {
  switch (args[i]) {
    case "--manifest":
      manifestPath = path.resolve(args[++i]);
      break;
    case "--outdir":
      outDir = path.resolve(args[++i]);
      break;
    case "--zotero-client":
      zoteroClientPath = path.resolve(args[++i]);
      break;
    case "--permissions":
      cliPermissions = args[++i].split(",").map((s) => s.trim());
      break;
  }
}

/**
 * Find manifest.json by searching the current directory and common subdirectories.
 * Returns the first match found, or null.
 */
function findManifest() {
  const candidates = [];

  // Breadth-first search: scan CWD, then one level of subdirs
  function scanDir(dir, depth) {
    const manifest = path.join(dir, "manifest.json");
    if (fs.existsSync(manifest)) {
      candidates.push(manifest);
      return;
    }
    if (depth >= 2) return;
    try {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (
          entry.isDirectory() &&
          !entry.name.startsWith(".") &&
          entry.name !== "node_modules"
        ) {
          scanDir(path.join(dir, entry.name), depth + 1);
        }
      }
    } catch {
      // permission errors, etc.
    }
  }

  scanDir(process.cwd(), 0);
  return candidates[0] || null;
}

// Auto-discover manifest if not explicitly provided
if (!manifestPath && !cliPermissions) {
  manifestPath = findManifest();
  if (manifestPath) {
    console.log(
      `Found manifest: ${path.relative(process.cwd(), manifestPath)}`,
    );
  }
} else if (!manifestPath) {
  manifestPath = path.resolve("manifest.json");
}

// ---------------------------------------------------------------------------
// generate-bundled: all-permissions build for zotero-types package itself
// ---------------------------------------------------------------------------

if (command === "generate-bundled") {
  const { PERMISSION_SCHEMAS, WINDOW_SCHEMAS, MAIN_WINDOW_SCHEMAS } =
    await loadSchema(zoteroClientPath);

  const UNPRIVILEGED_DIR = path.join(PACKAGE_ROOT, "types/unprivileged");
  const emitter = createTypeEmitter(PACKAGE_ROOT, {
    excludeDir: UNPRIVILEGED_DIR,
  });

  const output = emitter.generateAllPermissionTypes(
    PERMISSION_SCHEMAS,
    WINDOW_SCHEMAS,
    MAIN_WINDOW_SCHEMAS,
    EXTERNAL_TYPE_SCHEMAS,
  );

  fs.mkdirSync(UNPRIVILEGED_DIR, { recursive: true });

  const outFile = path.join(UNPRIVILEGED_DIR, "index.d.ts");
  fs.writeFileSync(outFile, output.join("\n") + "\n");

  const xulOutFile = path.join(UNPRIVILEGED_DIR, "xul.d.ts");
  fs.writeFileSync(xulOutFile, emitter.generateXulTypes());

  const geckoGlobalsContent = emitter.generateGeckoGlobalTypes(
    SANDBOX_GECKO_GLOBALS,
  );
  if (geckoGlobalsContent) {
    const geckoGlobalsFile = path.join(UNPRIVILEGED_DIR, "gecko-globals.d.ts");
    fs.writeFileSync(geckoGlobalsFile, geckoGlobalsContent);
    console.log(`Generated ${geckoGlobalsFile}`);
  }

  console.log(`Generated ${outFile}`);
  console.log(`Generated ${xulOutFile}`);
  console.log(`  Permissions: ${Object.keys(PERMISSION_SCHEMAS).join(", ")}`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// generate: per-plugin types based on manifest permissions
// ---------------------------------------------------------------------------

// Resolve permissions
function readPermissionsFromManifest(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const manifest = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return manifest.permissions || null;
}

let permissions;
if (cliPermissions) {
  permissions = cliPermissions;
  console.log(`Using permissions from CLI: ${permissions.join(", ")}`);
} else {
  const fromManifest = readPermissionsFromManifest(manifestPath);
  if (fromManifest) {
    permissions = fromManifest;
    console.log(
      `Read permissions from ${path.relative(process.cwd(), manifestPath)}: ${permissions.join(", ")}`,
    );
  } else {
    console.error(
      manifestPath
        ? `Error: Could not read manifest at ${manifestPath}\n`
        : `Error: No manifest.json found in current directory or subdirectories.\n`,
      `Provide --manifest <path> or --permissions <list>.`,
    );
    process.exit(1);
  }
}

// Load schema & generate
console.log();
const { PERMISSION_SCHEMAS, WINDOW_SCHEMAS, MAIN_WINDOW_SCHEMAS } =
  await loadSchema(zoteroClientPath);

// Validate permissions against schema
const validPerms = Object.keys(PERMISSION_SCHEMAS);
const invalid = permissions.filter((p) => !validPerms.includes(p));
if (invalid.length > 0) {
  console.warn(`Warning: unknown permissions ignored: ${invalid.join(", ")}`);
  console.warn(`  Valid permissions: ${validPerms.join(", ")}`);
}

const emitter = createTypeEmitter(PACKAGE_ROOT);
const output = emitter.generatePluginTypes(
  PERMISSION_SCHEMAS,
  WINDOW_SCHEMAS,
  MAIN_WINDOW_SCHEMAS,
  permissions,
  EXTERNAL_TYPE_SCHEMAS,
);

// ---------------------------------------------------------------------------
// Write output files
// ---------------------------------------------------------------------------

fs.mkdirSync(outDir, { recursive: true });

// 1. Generated Zotero namespace types
const zoteroTypesFile = path.join(outDir, "zotero.d.ts");
fs.writeFileSync(zoteroTypesFile, output.join("\n") + "\n");

// 2. Static type files — copy from package
const staticFiles = [
  { src: "types/unprivileged/sandbox.d.ts", dest: "sandbox.d.ts" },
  { src: "types/unprivileged/gecko.d.ts", dest: "gecko.d.ts" },
];

for (const { src, dest } of staticFiles) {
  const srcPath = path.join(PACKAGE_ROOT, src);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(outDir, dest));
  }
}

// 3. Gecko globals — auto-extracted from gecko types
const geckoGlobalsContent = emitter.generateGeckoGlobalTypes(
  SANDBOX_GECKO_GLOBALS,
);
if (geckoGlobalsContent) {
  fs.writeFileSync(
    path.join(outDir, "gecko-globals.d.ts"),
    geckoGlobalsContent,
  );
}

// 4. XUL types — generated from source
const xulContent = emitter.generateXulTypes();
fs.writeFileSync(path.join(outDir, "xul.d.ts"), xulContent);

// 4. Entry index.d.ts — references all type files
const indexContent = [
  `// Auto-generated by zotero-types CLI`,
  `// Do not edit manually.`,
  `//`,
  `// Permissions: ${["default", ...permissions.filter((p) => p !== "default")].join(", ")}`,
  ``,
  `/// <reference path="./sandbox.d.ts" />`,
  `/// <reference path="./gecko.d.ts" />`,
  `/// <reference path="./gecko-globals.d.ts" />`,
  `/// <reference path="./xul.d.ts" />`,
  `/// <reference path="./zotero.d.ts" />`,
  ``,
].join("\n");
fs.writeFileSync(path.join(outDir, "index.d.ts"), indexContent);

// 5. tsconfig.json — ready for the plugin to extend
const tsconfigPath = path.join(outDir, "tsconfig.json");
if (!fs.existsSync(tsconfigPath)) {
  const tsconfig = {
    compilerOptions: {
      composite: true,
      target: "es2025",
      module: "ESNext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      experimentalDecorators: true,
      strict: true,
      skipLibCheck: true,
      lib: ["ESNext", "DOM", "DOM.Iterable"],
    },
    files: ["index.d.ts"],
  };
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + "\n");
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

const rel = (p) => path.relative(process.cwd(), p);

console.log();
console.log(`Generated types in ${rel(outDir)}/`);
console.log(`  ${rel(path.join(outDir, "index.d.ts"))}    (entry point)`);
console.log(`  ${rel(path.join(outDir, "zotero.d.ts"))}   (Zotero namespace)`);
console.log(`  ${rel(path.join(outDir, "sandbox.d.ts"))}  (sandbox globals)`);
console.log(`  ${rel(path.join(outDir, "gecko.d.ts"))}    (gecko DOM)`);
console.log(
  `  ${rel(path.join(outDir, "gecko-globals.d.ts"))} (gecko globals)`,
);
console.log(`  ${rel(path.join(outDir, "xul.d.ts"))}      (XUL elements)`);
console.log(`  ${rel(path.join(outDir, "tsconfig.json"))} (TypeScript config)`);
console.log();
console.log(
  `Permissions: ${["default", ...permissions.filter((p) => p !== "default")].join(", ")}`,
);
console.log();
console.log(`To use, add to your tsconfig.json:`);
console.log(`  {`);
console.log(`    "extends": "./${rel(tsconfigPath)}",`);
console.log(`    // or reference the types directly:`);
console.log(`    // "include": ["src", "${rel(outDir)}"]`);
console.log(`  }`);
