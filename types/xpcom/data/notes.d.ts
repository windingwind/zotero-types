/// <reference path="../editorInstance.d.ts" />

declare namespace _ZoteroTypes {
  // chrome/content/zotero/xpcom/data/notes.js
  interface Notes {
    [attr: string]: any;
    AUTO_SYNC_DELAY: 15;
    MAX_TITLE_LENGTH: 120;
    defaultNote: '<div class="zotero-note znv1"></div>';
    notePrefix: '<div class="zotero-note znv1">';
    noteSuffix: "</div>";
    _editorInstances: Zotero.EditorInstance[];
    _downloadInProgressPromise: Promise<void> | null;
    registerEditorInstance(instance: Zotero.EditorInstance): void;
    unregisterEditorInstance(instance: Zotero.EditorInstance): Promise<void>;

    /**
     * Replace local URIs for citations and highlights
     * in all notes. Cut-off note saving for the opened
     * notes and then trigger notification to refresh
     *
     * @param {Number} fromUserID
     * @param {Number} toUserID
     * @returns {Promise<void>}
     */
    updateUser(fromUserID: number, toUserID: number): Promise<void>;

    /**
     * Update item key URLs in the item's note, replacing all instances of each
     * key in itemKeyMap with the associated value.
     * Passed item should have an embedded note or be a note item.
     *
     * @param {Zotero.Item} item
     * @param {Map<String, String>} itemKeyMap
     */
    replaceAllItemKeys(
      item: Zotero.Item,
      itemKeyMap: Map<string, string>,
    ): void;

    /**
     * Convenience function to call replaceAllItemKeys with a single key-value pair.
     *
     * @param {Zotero.Item} item
     * @param {String} fromItemKey
     * @param {String} toItemKey
     */
    replaceItemKey(
      item: Zotero.Item,
      fromItemKey: string,
      toItemKey: string,
    ): void;

    getExportableNote(item: Zotero.Item): Promise<string>;

    /**
     * Download embedded images if they don't exist locally
     *
     * @param {Zotero.Item} item
     * @returns {Promise<boolean>}
     */
    ensureEmbeddedImagesAreAvailable(item: Zotero.Item): Promise<boolean>;

    /**
     * Copy embedded images from one note to another and update
     * item keys in note HTML.
     *
     * Must be called after copying a note
     *
     * @param {Zotero.Item} fromNote
     * @param {Zotero.Item} toNote
     * @returns {Promise}
     */
    copyEmbeddedImages(
      fromNote: Zotero.Item,
      toNote: Zotero.Item,
    ): Promise<void>;

    promptToIgnoreMissingImage(): boolean;
    deleteUnusedEmbeddedImages(item: Zotero.Item): Promise<void>;
    hasSchemaVersion(note: string): boolean;

    /**
     * Upgrade v1 notes:
     * - Pull itemData from citations, highlights, images into metadata container
     * - For `data-annotation` keep only the following fields:
     *    - uri
     *    - text
     *    - color
     *    - pageLabel
     *    - position
     *    - citationItem
     * - Increase schema version number
     *
     * @param {Zotero.Item} item
     * @returns {Promise<boolean>}
     */
    upgradeSchemaV1(item: Zotero.Item): Promise<boolean>;
  }
}

declare namespace Zotero {
  const Notes: _ZoteroTypes.Notes;
}
