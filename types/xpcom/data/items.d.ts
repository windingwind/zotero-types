/// <reference path="item.d.ts" />
/// <reference path="dataObjects.d.ts" />

declare namespace _ZoteroTypes {
  /*
   * Primary interface for accessing Zotero items
   */
  interface Items extends DataObjects<Zotero.Item> {
    [attr: string]: any;
    _ZDO_object: "item";
    _objectCache: { [i: number]: Zotero.Item };
    ObjectClass: Zotero.Item;

    /**
     * This needs to wait until all Zotero components are loaded to initialize,
     * but otherwise it can be just a simple property
     */
    _primaryDataSQLParts: {
      itemID: "O.itemID";
      itemTypeID: "O.itemTypeID";
      dateAdded: "O.dateAdded";
      dateModified: "O.dateModified";
      libraryID: "O.libraryID";
      key: "O.key";
      version: "O.version";
      synced: "O.synced";

      createdByUserID: "createdByUserID";
      lastModifiedByUserID: "lastModifiedByUserID";

      firstCreator: string;
      sortCreator: string;

      deleted: "DI.itemID IS NOT NULL AS deleted";
      inPublications: "PI.itemID IS NOT NULL AS inPublications";

      parentID: string;

      attachmentCharset: "CS.charset AS attachmentCharset";
      attachmentLinkMode: "IA.linkMode AS attachmentLinkMode";
      attachmentContentType: "IA.contentType AS attachmentContentType";
      attachmentPath: "IA.path AS attachmentPath";
      attachmentSyncState: "IA.syncState AS attachmentSyncState";
      attachmentSyncedModificationTime: "IA.storageModTime AS attachmentSyncedModificationTime";
      attachmentSyncedHash: "IA.storageHash AS attachmentSyncedHash";
      attachmentLastProcessedModificationTime: "IA.lastProcessedModificationTime AS attachmentLastProcessedModificationTime";
    };

    _relationsTable: "itemRelations";

    /**
     * @param {Integer} libraryID
     * @return {Promise<Boolean>} - True if library has items in trash, false otherwise
     */
    hasDeleted(libraryID: number): Promise<boolean>;

    get(ids: number | string): Zotero.Item;
    get(ids: number[] | string[]): Zotero.Item[];

    getAsync(ids: number | string): Promise<Zotero.Item>;
    getAsync(ids: number[] | string[]): Promise<Zotero.Item[]>;

    /**
     * Returns all items in a given library
     *
     * @param  {Integer}  libraryID
     * @param  {Boolean}  [onlyTopLevel=false]   If true, don't include child items
     * @param  {Boolean}  [includeDeleted=false] If true, include deleted items
     * @param  {Boolean}  [asIDs=false] 		 If true, resolves only with IDs
     * @return {Promise<Array<Zotero.Item|Integer>>}
     */
    getAll(
      libraryID: number,
      onlyTopLevel?: boolean,
      includeDeleted?: boolean,
      asIDs?: false,
    ): Promise<Zotero.Item[]>;
    getAll(
      libraryID: number,
      onlyTopLevel: boolean,
      includeDeleted: boolean,
      asIDs: true,
    ): Promise<number[]>;

    /**
     * Zotero.Utilities.Internal.getAsyncInputStream-compatible generator that yields item data
     * in web API format as strings
     *
     * @param {Object} params - Request parameters from Zotero.API.parsePath()
     */
    apiDataGenerator(params: object): Promise<string>;

    /**
     * Copy child items from one item to another (e.g., in another library)
     *
     * Requires a transaction
     */
    copyChildItems(fromItem: Zotero.Item, toItem: Zotero.Item): Promise<void>;

    /**
     * Move child items from one item to another
     *
     * Requires a transaction
     *
     * @param {Zotero.Item} fromItem
     * @param {Zotero.Item} toItem
     * @param {Boolean} [includeTrashed=false]
     * @return {Promise}
     */
    moveChildItems(
      fromItem: Zotero.Item,
      toItem: Zotero.Item,
      includeTrashed?: boolean,
    ): Promise<void>;

    merge(item: Zotero.Item, otherItems: Zotero.Item[]): Promise<any>;

    /**
     * Hash each attachment of the provided item. Return a map from hashes to
     * attachment IDs.
     *
     * @param {Zotero.Item} item
     * @param {String} hashType 'bytes' or 'text'
     * @return {Promise<Map<String, String>>}
     */
    _hashItem(
      item: Zotero.Item,
      hashType: "bytes" | "text",
    ): Promise<Map<string, string>>;

    /**
     * Hash an attachment by the most common words in its text.
     * @param {Zotero.Item} attachment
     * @return {Promise<String>}
     */
    _hashAttachmentText(attachment: Zotero.Item): Promise<string>;

    /**
     * Get the n most common words in s in descending order of frequency.
     * If s contains fewer than n unique words, the size of the returned array
     * will be less than n.
     *
     * @param {String} s
     * @param {Number} n
     * @return {String[]}
     */
    _getMostCommonWords(s: string, n: number): string[];

    /**
     * Move fromItem's embedded note, if it has one, to toItem.
     * If toItem already has an embedded note, the note will be added as a new
     * child note item on toItem's parent.
     * Requires a transaction.
     */
    _moveEmbeddedNote(
      fromItem: Zotero.Item,
      toItem: Zotero.Item,
    ): Promise<void>;

    /**
     * Move fromItem's relations to toItem as part of a merge.
     * Requires a transaction.
     *
     * @param {Zotero.Item} fromItem
     * @param {Zotero.Item} toItem
     * @return {Promise}
     */
    _moveRelations(fromItem: Zotero.Item, toItem: Zotero.Item): Promise<void>;

    trash(ids: number | number[]): Promise<void>;
    trashTx(ids: number | number[]): Promise<void>;

    /**
     * @param {Integer} libraryID - Library to delete from
     * @param {Object} [options]
     * @param {Function} [options.onProgress] - fn(progress, progressMax)
     * @param {Integer} [options.days] - Only delete items deleted more than this many days ago
     * @param {Integer} [options.limit] - Number of items to delete
     * @returns deleted items count
     */
    emptyTrash(
      libraryID: number,
      options?: {
        onProgress?: (progress: number, progressMax: number) => void;
        days?: number;
        limit?: number;
      },
    ): Promise<number>;

    addToPublications(items: Zotero.Item[], options?: object): Promise<void>;
    removeFromPublications(items: Zotero.Item[]): Promise<void>;
    purge(): Promise<void>; // Purge unused data values

    /**
     * Return a firstCreator string from internal creators data (from Zotero.Item::getCreators()).
     *
     * Used in Zotero.Item::getField() for unsaved items
     *
     * @param {Integer} itemTypeID
     * @param {Object} creatorsData
     * @return {String}
     */
    getFirstCreatorFromData(
      itemTypeID: number,
      creatorsData: _ZoteroTypes.Item.Creator[],
    ): string;

    /**
     * Get the top-level items of all passed items
     *
     * @param {Zotero.Item[]} items
     * @return {Zotero.Item[]}
     */
    getTopLevel(items: Zotero.Item[]): Zotero.Item[];

    /**
     * Return an array of items with descendants of selected top-level items removed
     *
     * Non-top-level items that aren't descendents of selected items are kept.
     *
     * @param {Zotero.Item[]}
     * @return {Zotero.Item[]}
     */
    keepTopLevel(items: Zotero.Item[]): Zotero.Item[];

    getSortTitle(title: string | number): string;

    /**
     * Find attachment items whose paths begin with the passed `pathPrefix` and don't exist on disk
     *
     * @param {Number} libraryID
     * @param {String} pathPrefix
     * @return {Zotero.Item[]}
     */
    findMissingLinkedFiles(
      libraryID: number,
      pathPrefix: string,
    ): Promise<Zotero.Item[]>;
  }
}

declare namespace Zotero {
  const Items: _ZoteroTypes.Items;
}
