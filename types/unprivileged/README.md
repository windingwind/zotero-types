# types/unprivileged — Auto-generated

This folder contains auto-generated TypeScript declarations for unprivileged
Zotero plugin scopes. **Do not edit the generated files manually.**

## Generated files

| File                 | Description                            |
| -------------------- | -------------------------------------- |
| `index.d.ts`         | Zotero namespace (permission-filtered) |
| `xul.d.ts`           | XUL element types                      |
| `gecko-globals.d.ts` | Gecko globals (e.g. Localization)      |

## Static files

| File           | Description                                              |
| -------------- | -------------------------------------------------------- |
| `sandbox.d.ts` | Sandbox globals provided by Zotero                       |
| `gecko.d.ts`   | Gecko DOM augmentations (XUL tag map, Document, Element) |

## Regenerate

```bash
npx zotero-types generate-bundled [--zotero-client <path>]
```

## Provenance

|                          |                                                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                 | 2026-04-05                                                                                                                                            |
| **zotero-types version** | 4.1.2                                                                                                                                                 |
| **Schema source**        | local zotero-client (1ee415bc63)                                                                                                                      |
| **Gecko types**          | types/gecko/ (from mozilla/gecko-dev)                                                                                                                 |
| **Command**              | `npx zotero-types generate-bundled --zotero-client <local>`                                                                                           |
| **Permissions**          | default, data, fileSystem, network, preferences, translator, itemTree, itemPane, menu, windowResource, reader, preferencePane, userPrompt, openWindow |
