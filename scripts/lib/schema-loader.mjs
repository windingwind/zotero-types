/**
 * Schema loading utilities — fetch Zotero plugin schema from GitHub or local.
 */

import fs from "fs";
import path from "path";
import vm from "vm";

const SCHEMA_RELATIVE_PATH = "chrome/content/zotero/xpcom/plugins/schema.mjs";
const GITHUB_RAW_URL = `https://raw.githubusercontent.com/zotero/zotero/main/${SCHEMA_RELATIVE_PATH}`;

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
 * Load schema — from local path if given, otherwise from GitHub.
 * @param {string | null} zoteroClientPath
 */
export async function loadSchema(zoteroClientPath) {
  if (zoteroClientPath) {
    return loadSchemaFromLocal(zoteroClientPath);
  }
  return loadSchemaFromGitHub();
}
