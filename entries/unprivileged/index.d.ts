// Unprivileged plugin scope types.
//
// Self-contained — does NOT reference types/zotero.d.ts or types/xul.d.ts
// as those transitively pull in gecko types that conflict with DOM lib globals.
//
// Static type subsets (sandbox globals, gecko DOM augmentations, XUL)
// are defined in their own files. The Zotero namespace subset is
// auto-generated in types/unprivileged/index.d.ts.
// Run `npx zotero-types generate-bundled` to regenerate.

/// <reference path="../../types/unprivileged/sandbox.d.ts" />
/// <reference path="../../types/unprivileged/gecko.d.ts" />
/// <reference path="../../types/unprivileged/gecko-globals.d.ts" />
/// <reference path="../../types/unprivileged/xul.d.ts" />
/// <reference path="../../types/unprivileged/index.d.ts" />
