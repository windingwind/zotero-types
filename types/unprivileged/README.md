# Auto-generated Zotero plugin types

This folder contains auto-generated TypeScript declarations for unprivileged
Zotero plugin scopes. **Do not edit the generated files manually.**

## Files

| File                 | Description                                              |
| -------------------- | -------------------------------------------------------- |
| `index.d.ts`         | Entry point (references all type files)                  |
| `zotero.d.ts`        | Zotero namespace (permission-filtered)                   |
| `sandbox.d.ts`       | Sandbox globals provided by Zotero                       |
| `gecko.d.ts`         | Gecko DOM augmentations (XUL tag map, Document, Element) |
| `gecko-globals.d.ts` | Gecko globals (e.g. Localization)                        |
| `xul.d.ts`           | XUL element types                                        |
| `tsconfig.json`      | TypeScript config                                        |

## Regenerate

```bash
npx zotero-types generate-bundled [--zotero-client <path>]
```

## Provenance

|                          |                                                                                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                 | 2026-04-06                                                                                                                                                           |
| **zotero-types version** | 4.1.2                                                                                                                                                                |
| **Schema source**        | local zotero-client (918516fa8b)                                                                                                                                     |
| **Gecko types**          | types/gecko/ (from mozilla/gecko-dev)                                                                                                                                |
| **Permissions**          | default, data, fileSystem, network, preferences, translator, itemTree, itemPane, menu, windowResource, pluginInterop, reader, preferencePane, userPrompt, openWindow |
