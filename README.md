# Zotero Types

This package contains type definitions for Zotero (<https://www.zotero.org/>) plugin.

npm package: <https://www.npmjs.com/package/zotero-types>

## Usage

1. Run `npm install --save-dev zotero-types`.

2. No need to import the type declaration in your TypeScript code. If your IDE does not recognize the definitions, add `zotero-types` to [`types`](https://www.typescriptlang.org/tsconfig/#types) in `tsconfig.json`:

   ```jsonc
   // tsconfig.json
   {
     "compilerOptions": {
       "types": ["zotero-types"],
     },
   }
   ```

**Example**:

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

## Zotero Plugins Using This Package

- [zotero-better-notes](https://github.com/windingwind/zotero-better-notes): Everything about note management. All in Zotero.
- [zotero-pdf-preview](https://github.com/windingwind/zotero-pdf-preview): PDF Preview for Zotero.
- [zotero-pdf-translate](https://github.com/windingwind/zotero-pdf-translate): PDF Translation for Zotero 6.
- [zotero-tag](https://github.com/windingwind/zotero-tag): Automatically tag items/Batch tagging
- [zotero-theme](https://github.com/iShareStuff/ZoteroTheme): Customize Zotero theme
