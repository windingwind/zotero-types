/// <reference path="../editorInstance.d.ts" />

declare namespace _ZoteroTypes {
  // chrome/content/zotero/xpcom/data/notes.js
  interface Notes {
    [attr: string]: any;
    AUTO_SYNC_DELAY: number;
    MAX_TITLE_LENGTH: number;
    defaultNote: string;
    notePrefix: string;
    noteSuffix: string;
    _editorInstances: Zotero.EditorInstance[];
    _downloadInProgressPromise: Promise<any>;
    registerEditorInstance(instance: Zotero.EditorInstance): void;
    unregisterEditorInstance(instance: Zotero.EditorInstance): Promise<void>;
    updateUser(fromUserID: number, toUserID: number): Promise<void>;
    replaceAllItemKeys: (
      item: Zotero.Item,
      itemKeyMap: Map<string, string>
    ) => void;
    replaceItemKey: (
      item: Zotero.Item,
      fromItemKey: string,
      toItemKey: string
    ) => void;
    getableNote(item: Zotero.Item): Promise<string>;
    ensureEmbeddedImagesAreAvailable(item: Zotero.Item): Promise<boolean>;
    copyEmbeddedImages: (
      fromNote: Zotero.Item,
      toNote: Zotero.Item
    ) => Promise<void>;
    promptToIgnoreMissingImage(): boolean;
    deleteUnusedEmbeddedImages(item: Zotero.Item): Promise<void>;
    hasSchemaVersion(note: Zotero.Item): boolean;
  }
}
