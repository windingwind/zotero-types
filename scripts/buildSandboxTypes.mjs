/**
 * Split the global *values* out of the generated Gecko DOM types, and generate
 * the global scope of a Zotero plugin sandbox.
 *
 * `lib.gecko.dom.d.ts` mixes interfaces (types, available everywhere) with
 * `declare var` / `declare function` blocks (values, only available in a
 * window). A plugin's bootstrap.js runs in a `Cu.Sandbox` created by
 * `_loadScope()` in Zotero's `chrome/content/zotero/xpcom/plugins.js`, which
 * exposes a small subset of those values and nothing else: no AbortController,
 * no document, no window.
 *
 * So:
 *   - lib.gecko.dom.d.ts          keeps the types only;
 *   - lib.gecko.dom-globals.d.ts  gets the values, referenced by window entries;
 *   - sandbox-globals.d.ts        gets the subset available in the sandbox,
 *                                 referenced by the sandbox entry.
 *
 * Run by scripts/updateGecko.mjs, after the files are downloaded.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const DOM_TYPES_PATH = "types/gecko/generated/lib.gecko.dom.d.ts";
export const DOM_GLOBALS_PATH =
  "types/gecko/generated/lib.gecko.dom-globals.d.ts";
export const DOM_VARS_PATH = "types/gecko/lib.gecko.dom-vars.d.ts";
export const SANDBOX_GLOBALS_PATH = "types/gecko/sandbox-globals.d.ts";

const SPLIT_MARKER =
  "// Global value declarations are moved to lib.gecko.dom-globals.d.ts";

const DECLARATION_RE = /^declare (?:var|function) (\w+)/;

/**
 * Names available to `bootstrap.js` and everything it loads, from the
 * `wantGlobalProperties` and `Object.assign(scope, ...)` calls of
 * `_loadScope()` in Zotero's chrome/content/zotero/xpcom/plugins.js.
 *
 * `ChromeUtils`, `IOUtils` and `PathUtils` are not listed: they are declared as
 * namespaces inside the DOM types, so they stay available.
 */
const SANDBOX_NAMES = [
  // wantGlobalProperties
  "atob",
  "btoa",
  "Blob",
  "DOMParser",
  "fetch",
  "File",
  "FileReader",
  "TextDecoder",
  "TextEncoder",
  "URL",
  "URLSearchParams",
  "XMLHttpRequest",
  // Object.assign(scope, {...})
  "ChromeWorker",
  "Localization",
  "setTimeout",
  "clearTimeout",
  "setInterval",
  "clearInterval",
  "requestIdleCallback",
  "cancelIdleCallback",
  "Worker",
  "XMLSerializer",
];

/** Values available in the sandbox that neither type file declares. */
const SANDBOX_EXTRA_DECLARATIONS = [
  [
    "// `crypto` is part of wantGlobalProperties but is only declared in",
    "// lib.gecko.dom-vars.d.ts, which the sandbox entry does not reference.",
  ].join("\n"),
  ["declare var crypto: Crypto;"].join("\n"),
  [
    "declare var CSS: {",
    "  escape(value: string): string;",
    "  supports(property: string, value?: string): boolean;",
    "};",
  ].join("\n"),
];

/**
 * Collect every top-level `declare var` / `declare function` block, i.e. every
 * global value, and return the remaining text with those blocks removed.
 * @param {string} text
 * @returns {{ content: string; blocks: Map<string, string> }}
 */
export function splitGlobalValues(text) {
  const lines = text.split("\n");
  const kept = [];
  /** @type {Map<string, string>} */
  const blocks = new Map();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nameMatch = line.match(DECLARATION_RE);

    if (!nameMatch) {
      kept.push(line);
      continue;
    }

    let end = i;
    if (!line.endsWith(";")) {
      // `declare var X: {` ... `};` or a multi-line function signature.
      end = -1;
      let depth = 0;
      for (let j = i; j < lines.length; j++) {
        for (const char of lines[j]) {
          if (char === "{") depth++;
          else if (char === "}") depth--;
        }
        if (depth === 0) {
          end = j;
          break;
        }
      }
      if (end === -1) throw new Error(`Unterminated declaration: ${line}`);
    }

    const name = nameMatch[1];
    if (blocks.has(name)) throw new Error(`Duplicate declaration: ${name}`);
    blocks.set(name, lines.slice(i, end + 1).join("\n"));
    i = end;
  }

  return { content: kept.join("\n"), blocks };
}

/**
 * Parse a `lib.gecko.dom-vars.d.ts` style file, whose declarations are all
 * single line.
 * @param {string} text
 * @returns {Map<string, string>}
 */
export function parseSingleLineDeclarations(text) {
  /** @type {Map<string, string>} */
  const blocks = new Map();
  for (const line of text.split("\n")) {
    const nameMatch = line.match(DECLARATION_RE);
    if (!nameMatch) continue;
    blocks.set(nameMatch[1], line);
  }
  return blocks;
}

export function buildSandboxTypes() {
  if (!fs.existsSync(DOM_TYPES_PATH)) {
    throw new Error(
      `${DOM_TYPES_PATH} is missing, run scripts/updateGecko.mjs first`,
    );
  }

  const domTypes = fs.readFileSync(DOM_TYPES_PATH, "utf-8");

  /** @type {Map<string, string>} */
  let domGlobals;
  if (domTypes.includes(SPLIT_MARKER)) {
    domGlobals = splitGlobalValues(
      fs.readFileSync(DOM_GLOBALS_PATH, "utf-8"),
    ).blocks;
  } else {
    const { content, blocks } = splitGlobalValues(domTypes);
    domGlobals = blocks;

    fs.writeFileSync(DOM_TYPES_PATH, `${content}\n${SPLIT_MARKER}\n`, {
      encoding: "utf-8",
    });
    fs.writeFileSync(
      DOM_GLOBALS_PATH,
      [
        "// @ts-nocheck",
        "// Global values of the Gecko DOM, split out of lib.gecko.dom.d.ts.",
        "// Generated by scripts/buildSandboxTypes.mjs. Do not edit.",
        "",
        [...blocks.values()].sort().join("\n\n"),
        "",
      ].join("\n"),
      { encoding: "utf-8" },
    );
  }

  const domVars = parseSingleLineDeclarations(
    fs.readFileSync(DOM_VARS_PATH, "utf-8"),
  );

  // Constructors live in the DOM types, window instance values in the DOM vars.
  const declarations = new Map([...domVars, ...domGlobals]);

  /** @type {string[]} */
  const missing = [];
  const picked = SANDBOX_NAMES.map((name) => {
    const declaration = declarations.get(name);
    if (!declaration) missing.push(name);
    return declaration;
  }).filter(Boolean);

  fs.writeFileSync(
    SANDBOX_GLOBALS_PATH,
    [
      "// @ts-nocheck",
      "// Global values available to a plugin's bootstrap.js, i.e. everything a",
      "// plugin loads from src/index.ts. This is the scope created by",
      "// `_loadScope()` in Zotero's chrome/content/zotero/xpcom/plugins.js:",
      "//",
      "//   new Cu.Sandbox(principal, { wantGlobalProperties: [...] })",
      "//   Object.assign(scope, { Zotero, Services, setTimeout, ... })",
      "//",
      "// Anything else (AbortController, structuredClone, Request, document,",
      "// window, ...) is a `Cannot find name` error on purpose: it does not",
      "// exist there.",
      "//",
      "// Generated by scripts/buildSandboxTypes.mjs. Do not edit.",
      "",
      ...picked,
      "",
      ...SANDBOX_EXTRA_DECLARATIONS,
      "",
    ].join("\n"),
    { encoding: "utf-8" },
  );

  return { missing };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const { missing } = buildSandboxTypes();
  console.log(`Wrote ${SANDBOX_GLOBALS_PATH}`);
  if (missing.length)
    console.log(`Not declared anywhere: ${missing.join(", ")}`);
}
