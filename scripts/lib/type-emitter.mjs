/**
 * Type emission engine — uses the TypeScript compiler API to resolve symbols
 * from the full zotero-types declarations and emit filtered subsets based on
 * the Zotero plugin permission schema.
 */

import fs from "fs";
import path from "path";
import ts from "typescript";

/**
 * Create a type emitter bound to a zotero-types package root.
 *
 * @param {string} zoteroTypesRoot - Absolute path to the zotero-types package root
 * @param {object} [options]
 * @param {string} [options.excludeDir] - Directory to exclude from declaration resolution
 *   (avoids snowball duplication from previously generated output)
 */
export function createTypeEmitter(zoteroTypesRoot, options = {}) {
  const ROOT = zoteroTypesRoot;
  const excludeDir = options.excludeDir || null;

  // ---------------------------------------------------------------------------
  // Load the full type declarations via TypeScript compiler
  // ---------------------------------------------------------------------------

  const FULL_TYPES_ENTRY = path.join(ROOT, "index.d.ts");
  const program = ts.createProgram([FULL_TYPES_ENTRY], {
    target: ts.ScriptTarget.ESNext,
    lib: ["lib.esnext.d.ts", "lib.dom.d.ts"],
    types: [],
    noEmit: true,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
  });
  const checker = program.getTypeChecker();

  const printer = ts.createPrinter({
    newLine: ts.NewLineSyntaxKind?.LineFeed ?? 0,
  });

  // ---------------------------------------------------------------------------
  // Symbol resolution
  // ---------------------------------------------------------------------------

  function resolveSymbolPath(pathParts) {
    let currentType = undefined;
    let currentSymbol = undefined;

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];

      if (i === 0) {
        for (const sf of program.getSourceFiles()) {
          if (sf.isDeclarationFile && sf.fileName.includes("zotero-types")) {
            sf.forEachChild((node) => {
              if (
                ts.isModuleDeclaration(node) &&
                node.name.text === part &&
                !currentSymbol
              ) {
                currentSymbol = checker.getSymbolAtLocation(node.name);
              }
            });
          }
        }
        if (!currentSymbol) return undefined;
        currentType = checker.getDeclaredTypeOfSymbol(currentSymbol);
      } else {
        const props = currentType.getProperties();
        const prop = props.find((p) => p.name === part);
        if (prop) {
          currentSymbol = prop;
          currentType = checker.getTypeOfSymbolAtLocation(
            prop,
            prop.valueDeclaration || prop.declarations?.[0],
          );
        } else {
          const exports =
            currentType?.symbol?.exports || currentSymbol?.exports;
          if (exports) {
            const exp = exports.get(ts.escapeLeadingUnderscores(part));
            if (exp) {
              currentSymbol = exp;
              currentType = checker.getDeclaredTypeOfSymbol(exp);
              if (currentType.flags & ts.TypeFlags.Any) {
                currentType = checker.getTypeOfSymbolAtLocation(
                  exp,
                  exp.valueDeclaration || exp.declarations?.[0],
                );
              }
            } else {
              return undefined;
            }
          } else {
            return undefined;
          }
        }
      }
    }

    return currentSymbol;
  }

  // ---------------------------------------------------------------------------
  // Declaration filtering & printing
  // ---------------------------------------------------------------------------

  function filterDeclarations(declarations) {
    if (!excludeDir) return declarations;
    return declarations.filter(
      (d) => !d.getSourceFile().fileName.startsWith(excludeDir),
    );
  }

  function printNode(node) {
    return printer.printNode(
      ts.EmitHint.Unspecified,
      node,
      node.getSourceFile(),
    );
  }

  function indent(text, level = 1) {
    const prefix = "  ".repeat(level);
    return text
      .split("\n")
      .map((line) => (line.trim() ? `${prefix}${line}` : line))
      .join("\n");
  }

  // ---------------------------------------------------------------------------
  // _ZoteroTypes qualification
  // ---------------------------------------------------------------------------

  const allZtNames = new Set();
  {
    const ztSym = resolveSymbolPath(["_ZoteroTypes"]);
    if (ztSym?.exports) {
      for (const [name] of ztSym.exports) {
        allZtNames.add(name);
      }
    }
  }

  const ztQualifyExclude = new Set(["Zotero", "Promise"]);

  function qualifyZtReferences(text) {
    for (const name of allZtNames) {
      if (ztQualifyExclude.has(name)) continue;
      const re = new RegExp(`(?<!_ZoteroTypes\\.)\\b(${name})\\.`, "g");
      text = text.replace(re, `_ZoteroTypes.${name}.`);
    }
    return text;
  }

  // ---------------------------------------------------------------------------
  // Symbol → declaration text
  // ---------------------------------------------------------------------------

  function getSymbolDeclarationText(symbol, asNamespaceMember = true) {
    if (!symbol || !symbol.declarations?.length) return undefined;

    const decls = filterDeclarations(symbol.declarations);
    if (!decls.length) return undefined;

    const decl = decls[0];
    const q = qualifyZtReferences;

    if (ts.isFunctionDeclaration(decl)) {
      return decls
        .filter(ts.isFunctionDeclaration)
        .map((d) => q(printNode(d)))
        .join("\n");
    }

    if (
      ts.isVariableDeclaration(decl) &&
      decl.parent &&
      ts.isVariableDeclarationList(decl.parent) &&
      decl.parent.parent &&
      ts.isVariableStatement(decl.parent.parent)
    ) {
      return q(printNode(decl.parent.parent));
    }

    if (ts.isClassDeclaration(decl)) {
      return q(printNode(decl));
    }

    if (ts.isMethodSignature(decl) || ts.isMethodDeclaration(decl)) {
      const overloads = decls.filter(
        (d) => ts.isMethodSignature(d) || ts.isMethodDeclaration(d),
      );
      const seen = new Set();
      const results = [];
      for (const d of overloads) {
        const text = q(printNode(d));
        if (seen.has(text)) continue;
        seen.add(text);
        results.push(asNamespaceMember ? `function ${text}` : text);
      }
      return results.join("\n");
    }

    if (ts.isPropertySignature(decl) || ts.isPropertyDeclaration(decl)) {
      let text = q(printNode(decl));
      if (asNamespaceMember) {
        text = text.replace(/^\s*readonly\s+/, "");
        text = `const ${text}`;
      }
      return text;
    }

    if (
      ts.isEnumDeclaration(decl) ||
      ts.isTypeAliasDeclaration(decl) ||
      ts.isInterfaceDeclaration(decl)
    ) {
      return q(printNode(decl));
    }

    return q(printNode(decl));
  }

  // ---------------------------------------------------------------------------
  // Schema → namespace emission
  // ---------------------------------------------------------------------------

  function emitSchemaAsNamespace(pathParts, schema) {
    const lines = [];

    for (const [key, value] of Object.entries(schema)) {
      const memberPath = [...pathParts, key];

      if (value === "Constructor") {
        const sym = resolveSymbolPath(memberPath);
        if (sym) {
          const text = getSymbolDeclarationText(sym);
          if (text) {
            lines.push(indent(text));
          } else {
            console.warn(
              `Warning: ${memberPath.join(".")}: Constructor (could not print declaration)`,
            );
            lines.push(indent(`// ${key}: Constructor (could not print)`));
          }
        } else {
          console.warn(
            `Warning: ${memberPath.join(".")}: Constructor (not found in types)`,
          );
          lines.push(indent(`// ${key}: Constructor (not found)`));
        }
      } else if (typeof value === "object" && value !== null) {
        const subLines = [];

        for (const [subKey, subValue] of Object.entries(value)) {
          if (typeof subValue === "object" && subValue !== null) {
            const deepBody = emitSchemaAsNamespace(
              [...memberPath, subKey],
              subValue,
            );
            if (deepBody.trim()) {
              subLines.push(indent(`namespace ${subKey} {`));
              subLines.push(deepBody);
              subLines.push(indent(`}`));
            }
            continue;
          }

          const memberSym = resolveSymbolPath([...memberPath, subKey]);
          if (memberSym) {
            const text = getSymbolDeclarationText(memberSym);
            if (text) {
              subLines.push(indent(text));
            } else {
              console.warn(
                `Warning: ${[...memberPath, subKey].join(".")}: ${subValue} (could not print declaration)`,
              );
              subLines.push(
                indent(`// ${subKey}: ${subValue} (could not print)`),
              );
            }
          } else {
            console.warn(
              `Warning: ${[...memberPath, subKey].join(".")}: ${subValue} (not found in types, using fallback signature)`,
            );
            subLines.push(indent(`function ${subKey}(...args: any[]): any;`));
          }
        }

        if (subLines.length) {
          lines.push(indent(`namespace ${key} {`));
          lines.push(...subLines);
          lines.push(indent(`}`));
        }
      } else {
        const sym = resolveSymbolPath(memberPath);
        if (sym) {
          const text = getSymbolDeclarationText(sym);
          if (text) {
            lines.push(indent(text));
          } else {
            console.warn(
              `Warning: ${memberPath.join(".")}: ${value} (could not print declaration)`,
            );
            lines.push(indent(`// ${key}: ${value} (could not print)`));
          }
        } else {
          console.warn(
            `Warning: ${memberPath.join(".")}: ${value} (not found in types)`,
          );
          lines.push(indent(`// ${key}: ${value} (not found)`));
        }
      }
    }

    return lines.join("\n");
  }

  // ---------------------------------------------------------------------------
  // Transitive type dependencies
  // ---------------------------------------------------------------------------

  function emitReferencedTypes(output) {
    const outputText = output.join("\n");
    const emitted = new Set();

    const ztRefs = new Set();
    {
      const regex = /_ZoteroTypes\.(\w+)/g;
      let match;
      while ((match = regex.exec(outputText))) {
        ztRefs.add(match[1]);
      }
    }

    const localZtNames = new Set();
    {
      const ztSym = resolveSymbolPath(["_ZoteroTypes"]);
      if (ztSym?.exports) {
        for (const [name] of ztSym.exports) {
          localZtNames.add(name);
        }
      }
    }

    function findRefsInText(text) {
      const refs = new Set();
      const qualRegex = /_ZoteroTypes\.(\w+)/g;
      let m;
      while ((m = qualRegex.exec(text))) {
        refs.add(m[1]);
      }
      const unqualRegex = /\b(\w+)\.\w+/g;
      while ((m = unqualRegex.exec(text))) {
        if (localZtNames.has(m[1]) && !refs.has(m[1])) {
          refs.add(m[1]);
        }
      }
      return refs;
    }

    function emitZtType(name) {
      if (emitted.has(`zt:${name}`)) return;
      emitted.add(`zt:${name}`);

      const sym = resolveSymbolPath(["_ZoteroTypes", name]);
      if (!sym?.declarations?.length) return;

      for (const decl of filterDeclarations(sym.declarations)) {
        if (
          ts.isInterfaceDeclaration(decl) ||
          ts.isTypeAliasDeclaration(decl) ||
          ts.isEnumDeclaration(decl) ||
          ts.isModuleDeclaration(decl) ||
          ts.isClassDeclaration(decl)
        ) {
          const text = printNode(decl);
          output.push(indent(text));
          for (const ref of findRefsInText(text)) {
            emitZtType(ref);
          }
        }
      }
    }

    if (ztRefs.size > 0) {
      output.push(`declare namespace _ZoteroTypes {`);
      for (const ref of ztRefs) {
        emitZtType(ref);
      }
      output.push(`}`);
      output.push(``);
    }

    // Zotero.* base types (e.g., DataObject) referenced by constructors
    const zoteroTypeRefs = new Set();
    {
      const regex = /extends\s+Zotero\.(\w+)/g;
      let match;
      while ((match = regex.exec(output.join("\n")))) {
        zoteroTypeRefs.add(match[1]);
      }
    }

    const declared = new Set();
    {
      const regex = /(?:class|interface)\s+(\w+)/g;
      let match;
      while ((match = regex.exec(output.join("\n")))) {
        declared.add(match[1]);
      }
    }

    const missingZotero = [...zoteroTypeRefs].filter((r) => !declared.has(r));
    if (missingZotero.length > 0) {
      output.push(`// Base types referenced by constructors`);
      output.push(`declare namespace Zotero {`);
      for (const name of missingZotero) {
        const sym = resolveSymbolPath(["Zotero", name]);
        if (sym?.declarations?.length) {
          for (const decl of filterDeclarations(sym.declarations)) {
            if (
              ts.isClassDeclaration(decl) ||
              ts.isInterfaceDeclaration(decl)
            ) {
              output.push(indent(printNode(decl)));
            }
          }
        } else {
          console.warn(`Warning: Zotero.${name}: base type not found`);
          output.push(indent(`// ${name}: not found`));
        }
      }
      output.push(`}`);
      output.push(``);
    }
  }

  // ---------------------------------------------------------------------------
  // Window types
  // ---------------------------------------------------------------------------

  function emitWindowObject(schema, lines, depth) {
    const prefix = "  ".repeat(depth);
    for (const [key, value] of Object.entries(schema)) {
      if (typeof value === "object" && value !== null) {
        lines.push(`${prefix}readonly ${key}: {`);
        emitWindowObject(value, lines, depth + 1);
        lines.push(`${prefix}};`);
      } else {
        lines.push(`${prefix}readonly ${key}: any;`);
      }
    }
  }

  function emitWindowTypes(WINDOW_SCHEMAS, MAIN_WINDOW_SCHEMAS, output) {
    const allSchemas = { ...WINDOW_SCHEMAS.default };
    for (const [, schema] of Object.entries(MAIN_WINDOW_SCHEMAS)) {
      Object.assign(allSchemas, schema);
    }

    const lines = [];
    lines.push(
      `/** Window interface for unprivileged plugins (subset of main window). */`,
    );
    lines.push(`interface _UnprivilegedMainWindow {`);
    lines.push(`  readonly document: Document;`);

    for (const [key, value] of Object.entries(allSchemas)) {
      if (typeof value === "object" && value !== null) {
        lines.push(`  readonly ${key}: {`);
        emitWindowObject(value, lines, 2);
        lines.push(`  };`);
      } else {
        lines.push(`  ${key}(...args: any[]): any;`);
      }
    }

    lines.push(`}`);
    output.push(lines.join("\n"));
    output.push(``);
  }

  // ---------------------------------------------------------------------------
  // XUL types
  // ---------------------------------------------------------------------------

  function generateXulTypes() {
    const xulSrc = fs.readFileSync(path.join(ROOT, "types/xul.d.ts"), "utf-8");
    const lines = xulSrc.split("\n");
    const filtered = lines.filter((line) => !line.startsWith("/// <reference"));
    while (filtered.length && !filtered[0].trim()) filtered.shift();
    return (
      `// Auto-generated from types/xul.d.ts\n` +
      `// Do not edit manually.\n\n` +
      filtered.join("\n")
    );
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  /**
   * Generate the Zotero namespace declarations for the given permissions.
   *
   * @param {object} PERMISSION_SCHEMAS - The full PERMISSION_SCHEMAS from schema.mjs
   * @param {string[]} permissions - Permission names to include (e.g., ["data", "fileSystem"]).
   *   The "default" permission is always included.
   * @returns {string[]} Output lines (to be joined with "\n")
   */
  function generatePermissionTypes(PERMISSION_SCHEMAS, permissions) {
    const permSet = new Set(["default", ...permissions]);
    const output = [];

    output.push(`// Auto-generated by zotero-types`);
    output.push(`// Do not edit manually.`);
    output.push(``);
    output.push(
      `// =============================================================================`,
    );
    output.push(`// Zotero namespace (from PERMISSION_SCHEMAS)`);
    output.push(
      `// =============================================================================`,
    );
    output.push(``);

    for (const [permName, permSchema] of Object.entries(PERMISSION_SCHEMAS)) {
      if (!permSet.has(permName)) continue;
      const zoteroSchema = permSchema.Zotero;
      if (!zoteroSchema || Object.keys(zoteroSchema).length === 0) continue;

      output.push(`// --- Permission: ${permName} ---`);
      output.push(``);

      const body = emitSchemaAsNamespace(["Zotero"], zoteroSchema);
      if (body.trim()) {
        output.push(`declare namespace Zotero {`);
        output.push(body);
        output.push(`}`);
        output.push(``);
      }
    }

    emitReferencedTypes(output);

    return output;
  }

  /**
   * Generate all types for a full "all permissions" build (used internally).
   */
  function generateAllPermissionTypes(
    PERMISSION_SCHEMAS,
    WINDOW_SCHEMAS,
    MAIN_WINDOW_SCHEMAS,
  ) {
    const allPerms = Object.keys(PERMISSION_SCHEMAS);
    const output = generatePermissionTypes(PERMISSION_SCHEMAS, allPerms);

    output.push(
      `// =============================================================================`,
    );
    output.push(`// Window types (from WINDOW_SCHEMAS + MAIN_WINDOW_SCHEMAS)`);
    output.push(
      `// =============================================================================`,
    );
    output.push(``);
    emitWindowTypes(WINDOW_SCHEMAS, MAIN_WINDOW_SCHEMAS, output);

    return output;
  }

  /**
   * Generate types for a plugin with specific permissions, including window types.
   */
  function generatePluginTypes(
    PERMISSION_SCHEMAS,
    WINDOW_SCHEMAS,
    MAIN_WINDOW_SCHEMAS,
    permissions,
  ) {
    const output = generatePermissionTypes(PERMISSION_SCHEMAS, permissions);

    output.push(
      `// =============================================================================`,
    );
    output.push(`// Window types (from WINDOW_SCHEMAS + MAIN_WINDOW_SCHEMAS)`);
    output.push(
      `// =============================================================================`,
    );
    output.push(``);
    emitWindowTypes(WINDOW_SCHEMAS, MAIN_WINDOW_SCHEMAS, output);

    return output;
  }

  return {
    generatePermissionTypes,
    generateAllPermissionTypes,
    generatePluginTypes,
    generateXulTypes,
  };
}
