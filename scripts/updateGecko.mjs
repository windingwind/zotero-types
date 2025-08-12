import { Octokit } from "octokit";
import fs from "fs";
import path from "path";

// Download all files in https://github.com/mozilla/gecko-dev/tree/master/tools/@types to types/gecko

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const owner = "mozilla";
const repo = "gecko-dev";
const dir = "tools/@types";
const dirGenerated = "tools/@types/generated";

const localDir = "types/gecko";
const localGeneratedDir = path.join(localDir, "generated");

async function main() {
  // Remove the existing generated directory
  if (fs.existsSync(localDir)) {
    fs.rmSync(localDir, { recursive: true, force: true });
  }
  // Create the new directory
  fs.mkdirSync(localDir, { recursive: true });
  // Create the generated directory
  fs.mkdirSync(localGeneratedDir, { recursive: true });

  const { data: files } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: dir,
  });

  const { data: generatedFiles } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: dirGenerated,
  });

  files.push(...generatedFiles);

  let domVars = `// @ts-nocheck\n/// <reference lib="dom" />\n`;

  for (const file of files) {
    if (file.type !== "file" || file.name === "tsconfig.json") {
      continue;
    }
    let { data: fileContent } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: file.path,
      mediaType: {
        format: "raw",
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const filePath = path.join(
      file.path.includes("generated") ? localGeneratedDir : localDir,
      file.name,
    );

    if (file.name === "lib.gecko.dom.d.ts") {
      // Include the `lib.dom.d.ts` file in `lib.gecko.dom.d.ts`
      // fileContent = `/// <reference lib="dom" />\n${fileContent}`;

      // From `declare var Glean:...` to `declare function removeEventListener...`,
      // remove from this file and save it as a separate file
      const startIndex = fileContent.indexOf("declare var Glean:");
      let endIndex = fileContent.indexOf(
        "declare function removeEventListener",
      );
      // Find actual end index to the eol
      while (fileContent[endIndex] !== "\n") {
        endIndex++;
      }
      domVars += fileContent.slice(startIndex, endIndex);
      fileContent =
        fileContent.slice(0, startIndex) +
        "\n// Moved to lib.gecko.dom-vars.d.ts\n" +
        fileContent.slice(endIndex);

      // Remove the `interface CSSStyleDeclaration {...}` block
      const cssStartIndex = fileContent.indexOf(
        "interface CSSStyleDeclaration {",
      );
      const cssEndIndex = fileContent.indexOf("}", cssStartIndex) + 1;

      // Copy the one from `node_modules/typescript/lib.dom.d.ts`
      const libDomPath = path.join("node_modules/typescript/lib/lib.dom.d.ts");
      const libDomContent = fs.readFileSync(libDomPath, "utf-8");
      const libDomStartIndex = libDomContent.indexOf(
        "interface CSSStyleDeclaration {",
      );
      const libDomEndIndex = libDomContent.indexOf("}", libDomStartIndex) + 1;
      const libDomContentSlice = libDomContent.slice(
        libDomStartIndex,
        libDomEndIndex,
      );
      fileContent =
        fileContent.slice(0, cssStartIndex) +
        libDomContentSlice +
        fileContent.slice(cssEndIndex);

      // Replace `document: Document | null;` with `document: Document;`
      fileContent = fileContent.replace(
        /document: Document \| null;/g,
        "document: Document;",
      );

      // Replace `TrustedScript` with a string type to avoid type conflicts
      //
      fileContent = fileContent.replace(
        `interface TrustedScript {
    toJSON(): string;
    toString(): string;
}`,
        `type TrustedScript = string & {
    toJSON(): string;
    toString(): string;
};`,
      );

      // Replace TextEncoder#encode for https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html#libdts-changes
      fileContent = fileContent.replace(
        `encode(input?: string): Uint8Array;`,
        `encode(input?: string): Uint8Array<ArrayBuffer>;`,
      );
    }

    // Attach a `// @ts-nocheck` comment to the top of the file
    // to avoid type checking errors
    // https://github.com/windingwind/zotero-plugin-toolkit/issues/79
    if (file.name.endsWith(".d.ts")) {
      fileContent = `// @ts-nocheck\n${fileContent}`;
    }
    fs.writeFileSync(filePath, fileContent, { encoding: "utf-8" });
  }

  // Save the `domVars` to a separate file
  const domVarsPath = path.join("types/gecko", "lib.gecko.dom-vars.d.ts");
  fs.writeFileSync(domVarsPath, domVars, { encoding: "utf-8" });
}

main().catch(console.error);
