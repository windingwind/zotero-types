/**
 * Schema loading utilities — fetch Zotero plugin schema from GitHub or local.
 */

import fs from "fs";
import path from "path";
import vm from "vm";

const SCHEMA_RELATIVE_PATH = "chrome/content/zotero/xpcom/plugins/schema.mjs";
const GITHUB_RAW_URL = `https://raw.githubusercontent.com/zotero/zotero/main/${SCHEMA_RELATIVE_PATH}`;

/**
 * Supplementary PERMISSION_SCHEMAS entries for permissions whose APIs are
 * set up dynamically in globals.mjs rather than declared in schema.mjs.
 *
 * Keep in sync with setupHTTP / setupPreferences / setupFilePicker in
 * chrome/content/zotero/xpcom/plugins/globals.mjs
 */
const PERMISSION_SCHEMA_SUPPLEMENT = {
  network: {
    Zotero: {
      HTTP: {
        request: "Method",
        processDocuments: "Method",
      },
    },
  },
  preferences: {
    Zotero: {
      Prefs: {
        get: "Method",
        set: "Method",
        clear: "Method",
        resetBranch: "Method",
        registerObserver: "Method",
        unregisterObserver: "Method",
      },
    },
  },
  fileSystem: {
    FilePicker: "Constructor",
  },
};

/**
 * Schema for extracting external (gecko / platform) types that are
 * referenced in the generated output but not part of the Zotero namespace.
 *
 * The emitter scans the generated output for identifiers matching these
 * patterns, resolves them from the full type program, and emits minimal
 * stub declarations so the output is self-contained.
 *
 * - interfacePatterns: regex patterns to match top-level interface names.
 *     Matched interfaces are emitted with only the members that appear
 *     in the output text. Heritage clauses referencing other matched
 *     interfaces are followed transitively.
 *
 * - namespacePatterns: regex patterns that match `<root>.<member>` references.
 *     Must have two capture groups: (1) the root namespace name,
 *     (2) the dotted member path (e.g. "File.Entry").
 *     Type aliases at the resolved path are emitted.
 */
export const EXTERNAL_TYPE_SCHEMAS = {
  interfacePatterns: ["nsI\\w+"],
  namespacePatterns: ["(OS)\\.(\\w+(?:\\.\\w+)*)"],
};

/**
 * Gecko globals to extract for the unprivileged sandbox.
 *
 * These are gecko-defined interfaces that the Zotero sandbox exposes to
 * unprivileged plugins. The type emitter extracts them (and their transitive
 * type dependencies) from the full gecko type program.
 */
export const SANDBOX_GECKO_GLOBALS = {
  extract: ["Localization"],
};

/**
 * Parse schema source code and return the schema objects.
 * @param {string} src - The raw source of schema.mjs
 */
export function parseSchemaSource(src) {
  const stripped = src.replace(/^export\s*\{[^}]*\}\s*;?\s*$/m, "");
  return vm.runInNewContext(
    stripped +
      "\n;({ PERMISSION_SCHEMAS, WINDOW_SCHEMAS, MAIN_WINDOW_SCHEMAS })",
    {},
  );
}

/**
 * Load the schema from a local zotero-client checkout.
 * @param {string} zoteroClientPath - Path to the zotero-client directory
 */
export function loadSchemaFromLocal(zoteroClientPath) {
  const filePath = path.join(zoteroClientPath, SCHEMA_RELATIVE_PATH);
  console.log(`Reading schema from local path: ${filePath}`);
  const src = fs.readFileSync(filePath, "utf-8");
  return parseSchemaSource(src);
}

/**
 * Load the schema from GitHub (zotero/zotero main branch).
 */
export async function loadSchemaFromGitHub() {
  console.log(`Fetching schema from GitHub: ${GITHUB_RAW_URL}`);
  const res = await fetch(GITHUB_RAW_URL);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch schema from GitHub: ${res.status} ${res.statusText}`,
    );
  }
  const src = await res.text();
  return parseSchemaSource(src);
}

/**
 * Deep-merge supplement entries into PERMISSION_SCHEMAS.
 * Only fills in keys that are missing or empty in the base schema.
 */
function applySchemaSupplements(schemas) {
  for (const [perm, supplement] of Object.entries(
    PERMISSION_SCHEMA_SUPPLEMENT,
  )) {
    if (!schemas.PERMISSION_SCHEMAS[perm]) {
      schemas.PERMISSION_SCHEMAS[perm] = supplement;
      continue;
    }
    for (const [key, value] of Object.entries(supplement)) {
      const target = schemas.PERMISSION_SCHEMAS[perm];
      if (
        !target[key] ||
        (typeof target[key] === "object" &&
          Object.keys(target[key]).length === 0)
      ) {
        target[key] = value;
      } else if (typeof target[key] === "object" && typeof value === "object") {
        Object.assign(target[key], value);
      }
    }
  }
  return schemas;
}

/**
 * Load schema — from local path if given, otherwise from GitHub.
 * @param {string | null} zoteroClientPath
 */
export async function loadSchema(zoteroClientPath) {
  const schemas = zoteroClientPath
    ? loadSchemaFromLocal(zoteroClientPath)
    : await loadSchemaFromGitHub();
  return applySchemaSupplements(schemas);
}
