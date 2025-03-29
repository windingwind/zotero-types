# Zotero Types

This package contains type definitions for Zotero (<https://www.zotero.org/>) plugin.

npm package: <https://www.npmjs.com/package/zotero-types>

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

For the best practices, see https://github.com/windingwind/know-ur-zotero as a reference.

Available entries:

- `sandbox`: The default entry for Zotero plugin development. For Zotero plugin's `bootstrap.js` sandbox environment. Includes privileged APIs and Zotero API definitions.
- `xhtml`: The entry for Zotero's `xhtml` environment. Includes privileged APIs, Zotero API definitions, XUL elements, and DOM definitions.
- `mainWindow`: The entry For Zotero's `zoteroPane.xhtml` environment. Besides definitions from the `xhtml` entry, it also includes main window APIs, such as `ZoteroPane`, `Zotero_Tabs`.
- `html`: The entry for Zotero's `html` environment. Same as normal HTML environment. Includes DOM definitions and standard APIs.
- `webworker`: The entry for Zotero's `webworker` environment. Same as normal web worker environment. Includes standard APIs.
- `base`: The base entry. Does not include any extra type definitions.
- `shared`: The entry for privileged APIs. Includes privileged APIs and Zotero API definitions.

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
/// <reference path="node_modules/zotero-types/entries/sandbox/index.d.ts" />
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
