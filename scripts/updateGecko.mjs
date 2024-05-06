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

  for (const file of files) {
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
      // Remove no-default-lib to avoid conflict with lib.d.ts
      fileContent = fileContent.replace(
        '/// <reference no-default-lib="true" />',
        "",
      );
    }
    fs.writeFileSync(filePath, fileContent, { encoding: "utf-8" });
  }
}

main().catch(console.error);
