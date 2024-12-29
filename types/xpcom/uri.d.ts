/// <reference path="../zotero.d.ts" />

declare namespace _ZoteroTypes {
  interface URI {
    defaultPrefix: {
      value: "http://zotero.org/";
    };
    getLocalUserURI(): _ZoteroTypes.ZoteroObjectURI;
    getCurrentUserURI(): _ZoteroTypes.ZoteroObjectURI;
    getCurrentUserLibraryURI(): _ZoteroTypes.ZoteroObjectURI;
    getLibraryURI(libraryID: number): _ZoteroTypes.ZoteroObjectURI;
    /**
     * Get path portion of library URI (e.g., users/6 or groups/1)
     */
    getLibraryPath(libraryID: number): string;
    /**
     * Get library from path (e.g., users/6 or groups/1)
     */
    getPathLibrary(path: string): Zotero.Library | false;
    /**
     * Return URI of item, which might be a local URI if user hasn't synced
     */
    getItemURI(item: Zotero.Item): _ZoteroTypes.ZoteroObjectURI;
    /**
     * Get path portion of item URI (e.g., users/6/items/ABCD1234 or groups/1/items/ABCD1234)
     */
    getItemPath(item: Zotero.Item): string;
    getFeedItemURI(feedItem: Zotero.Item): _ZoteroTypes.ZoteroObjectURI;
    getFeedItemPath(feedItem: Zotero.Item): string;
    /**
     * Return URI of collection, which might be a local URI if user hasn't synced
     */
    getCollectionURI(feedItem: Zotero.Collection): _ZoteroTypes.ZoteroObjectURI;
    /**
     * Get path portion of collection URI (e.g., users/6/collections/ABCD1234 or groups/1/collections/ABCD1234)
     */
    getCollectionPath(feedItem: Zotero.Collection): string;
    getFeedURI(feed: Zotero.DataObject): _ZoteroTypes.ZoteroObjectURI;
    getFeedPath(feed: Zotero.DataObject): string;
    getGroupsURL(): string;
    getGroupURI(group: Zotero.Collection): _ZoteroTypes.ZoteroObjectURI;
    _getObjectPath: (
      obj: Zotero.Library | Zotero.Collection | Zotero.Item,
    ) => string;
    _getObjectURI: (
      obj: Zotero.Library | Zotero.Collection | Zotero.Item,
    ) => _ZoteroTypes.ZoteroObjectURI;
    /**
     * Convert an item URI into an item
     */
    getURIItem(itemURI: _ZoteroTypes.ZoteroObjectURI): Promise<Zotero.Item>;
    getURIItemLibraryKey: (
      itemURI: _ZoteroTypes.ZoteroObjectURI,
    ) => { libraryID: number; key?: string; objectType?: string } | false;
    /**
     * Convert an item URI into a libraryID and key from the database, without relying on global state
     *
     * Note that while the URI must point to a valid library, the item doesn't need to exist
     */
    getURIItemLibraryKeyFromDB(itemURI: _ZoteroTypes.ZoteroObjectURI): any;
    getURIItemID(itemURI: _ZoteroTypes.ZoteroObjectURI): number | false;
    /**
     * Convert a collection URI into a collection
     */
    getURICollection: (
      collectionURI: _ZoteroTypes.ZoteroObjectURI,
    ) => Promise<Zotero.Collection | false>;
    getURICollectionLibraryKey: (
      collectionURI: _ZoteroTypes.ZoteroObjectURI,
    ) => { libraryID: number; key?: string; objectType?: string } | false;
    getURICollectionID(
      collectionURI: _ZoteroTypes.ZoteroObjectURI,
    ): number | false;
    getURILibrary(libraryURI: _ZoteroTypes.ZoteroObjectURI): number | false;
    getURIFeed(feedURI: _ZoteroTypes.ZoteroObjectURI): Zotero.Library | false;
    /**
     * Convert an object URI into an object containing libraryID and key
     */
    _getURIObject: (
      objectURI: _ZoteroTypes.ZoteroObjectURI,
      type: string,
    ) => { libraryID: number; key?: string; objectType?: string } | false;
    /**
     * Convert an object URI into a Zotero.Library that the object is in
     */
    _getURIObjectLibrary(
      objectURI: _ZoteroTypes.ZoteroObjectURI,
    ): Zotero.Library | false;
    /**
     * Convert an object URI into a libraryID from the database, without relying on global state
     */
    _getURIObjectLibraryID(
      objectURI: _ZoteroTypes.ZoteroObjectURI,
    ): Promise<number | false>;
    /**
     * Convert an object URI into a libraryID and key from the database, without relying on global state
     *
     * Note that while the URI must point to a valid library, the object doesn't need to exist
     */
    _getURIObjectLibraryKeyFromDB: (
      objectURI: _ZoteroTypes.ZoteroObjectURI,
      type: string,
    ) => Promise<
      { libraryID: number; key?: string; objectType?: string } | false
    >;
  }
}

declare namespace Zotero {
  const URI: _ZoteroTypes.URI;
}
