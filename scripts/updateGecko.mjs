import { Octokit } from "octokit";
import fs from "fs";
import path from "path";

// Download all files in https://github.com/mozilla/gecko-dev/tree/master/tools/@types to types/gecko

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const owner = "mozilla";
const repo = "gecko-dev";
const dir = "tools/@types";

async function main() {
  const { data: files } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: dir,
  });

  let domVars = `/// <reference lib="dom" />\n`;

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

    const filePath = path.join("types/gecko", file.name);

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
    }

    // Attach a `// @ts-nocheck` comment to the top of the file
    // to avoid type checking errors
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
