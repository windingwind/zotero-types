# Zotero Types

This package contains type definitions for Zotero (<https://www.zotero.org/>) plugin.

npm package: <https://www.npmjs.com/package/zotero-types>

<p align="center">
  <img width="720" src="https://github.com/user-attachments/assets/01a37569-77a6-4222-8624-a2136c1aa0d8" />
</p>

## Installation

Run `npm install --save-dev zotero-types`.

## Usage

### Include Type Definitions

You can include the type definitions in your Zotero plugin project in three ways:

1. Extend the `tsconfig.json` file in your Zotero plugin project. This is the recommended way.

```jsonc
// tsconfig.json
{
  "extends": "zotero-types/entries/sandbox",
}
```

For the best practices, see <https://github.com/windingwind/know-ur-zotero> as a reference.

Available entries:

| Entry        | Description                                                                                                         | Privileged | Zotero | XUL | DOM | MainWindow | WebWorker |
| ------------ | ------------------------------------------------------------------------------------------------------------------- | ---------- | ------ | --- | --- | ---------- | --------- |
| `sandbox`    | The default entry for Zotero plugin development. For Zotero plugin's `bootstrap.js` sandbox environment.            | ✅         | ✅     | ❌  | ❌  | ❌         | ❌        |
| `xhtml`      | The entry for Zotero's `xhtml` environment.                                                                         | ✅         | ✅     | ✅  | ✅  | ❌         | ❌        |
| `mainWindow` | Besides definitions from the `xhtml` entry, it also includes main window APIs, such as `ZoteroPane`, `Zotero_Tabs`. | ✅         | ✅     | ✅  | ✅  | ✅         | ❌        |
| `html`       | Same as normal HTML environment.                                                                                    | ❌         | ❌     | ❌  | ✅  | ❌         | ❌        |
| `webworker`  | Same as normal web worker environment.                                                                              | ❌         | ❌     | ❌  | ❌  | ❌         | ✅        |
| `base`       | The base entry. Does not include any extra type definitions.                                                        | ❌         | ❌     | ❌  | ❌  | ❌         | ❌        |
| `shared`     | The entry for privileged APIs.                                                                                      | ✅         | ✅     | ❌  | ❌  | ❌         | ❌        |

The `sandbox` entry only declares the globals that `_loadScope()` in Zotero's
[`chrome/content/zotero/xpcom/plugins.js`](https://github.com/zotero/zotero/blob/main/chrome/content/zotero/xpcom/plugins.js)
puts into a plugin scope (`wantGlobalProperties` + `Object.assign(scope, ...)`):
`Blob`, `fetch`, `URL`, `TextEncoder`, `XMLHttpRequest`, `setTimeout`, ... plus the
Zotero/Gecko APIs. Anything else a window has (`AbortController`, `structuredClone`,
`Request`, `queueMicrotask`, `document`, `window`, ...) is a `Cannot find name`
error on purpose, because it does not exist in the sandbox at runtime.

This only works if the type environment is clean: a dependency that pulls in
`lib.dom` or `@types/node` declares those globals again (`@types/node` declares
`AbortController` and `structuredClone`, for example) and the error disappears.
Keep Node/DOM types out of the tsconfig used for plugin code, and put your tests
and build scripts in a separate tsconfig.

2. Use `compileOptions > types` in your Zotero plugin project's `tsconfig.json` file.

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "types": ["zotero-types"],
  },
}
```

This is equivalent to the combination of `sandbox` and `xhtml` entries.

3. Use triple-slash directive in your Zotero plugin project's `d.ts` file.

Similar to the `tsconfig.json` file, you can use the `/// <reference path="..." />` directive to include the type definitions.

```ts
/// <reference types="zotero-types/entries/sandbox/index.d.ts" />
```

### Use in Code

```ts
// Example 1: get Zotero.Item by id
const item = Zotero.Items.get(1234);

// Example 2: use XUL.Element type with specific properties
const exportFiles = document.querySelector(
  "#menu_export_files",
) as XULMenuItemElement;
exportFiles.disabled = true;

// Example 3: use platform APIs (OS)
const filepath = "/path/to/file";
if (await IOUtils.exists(filepath)) {
  let contentRaw = await IOUtils.readUTF8(filepath);
}
```

## Development

`npm test` type-checks two fixtures against the `sandbox` and `xhtml` entries: it
asserts that window-only globals stay untyped in the sandbox entry, and stay
available in the window one.

`scripts/updateGecko.mjs` downloads the Gecko types and then re-splits
`lib.gecko.dom.d.ts` into types and globals, regenerating
`types/gecko/sandbox-globals.d.ts`; `npm test` verifies the result.

## Contributing

This type definition only contains frequently used typings and is not complete. Please check the source code of Zotero here: [https://github.com/zotero/zotero](https://github.com/zotero/zotero).

The `d.ts` files of Zotero are set accordingly to their corresponding file in the Zotero repository.

Planning to merge to <https://github.com/DefinitelyTyped/DefinitelyTyped/>

To release this to the npm package, use `npm run release`.

## Disclaimer

Use this code under MIT License. No warranties are provided. Keep the laws of your locality in mind!

If you want to change the license, please contact me at <wyzlshx@foxmail.com>

Part of the code of this repo refers to other open-source projects within the allowed scope.

- zotero-better-bibtex(`d.ts`)
