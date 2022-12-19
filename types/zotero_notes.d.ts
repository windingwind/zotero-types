/// <reference path="zotero_editor_instance.d.ts" />

// chrome/content/zotero/xpcom/data/notes.js

declare class _ZoteroNotes {
  [attr: string]: any;
  AUTO_SYNC_DELAY: number;
  MAX_TITLE_LENGTH: number;
  defaultNote: string;
  notePrefix: string;
  noteSuffix: string;
  _editorInstances: _ZoteroEditorInstance[];
  _downloadInProgressPromise: Promise<any>;
  registerEditorInstance: (instance: _ZoteroEditorInstance) => void;
  unregisterEditorInstance: (instance: _ZoteroEditorInstance) => Promise<void>;
  updateUser: (fromUserID: number, toUserID: number) => Promise<void>;
  replaceAllItemKeys: (
    item: _ZoteroItem,
    itemKeyMap: Map<string, string>
  ) => void;
  replaceItemKey: (
    item: _ZoteroItem,
    fromItemKey: string,
    toItemKey: string
  ) => void;
  getableNote: (item: _ZoteroItem) => Promise<string>;
  ensureEmbeddedImagesAreAvailable: (item: _ZoteroItem) => Promise<boolean>;
  copyEmbeddedImages: (
    fromNote: _ZoteroItem,
    toNote: _ZoteroItem
  ) => Promise<void>;
  promptToIgnoreMissingImage: () => boolean;
  deleteUnusedEmbeddedImages: (item: _ZoteroItem) => Promise<void>;
  hasSchemaVersion: (note: _ZoteroItem) => boolean;
}
