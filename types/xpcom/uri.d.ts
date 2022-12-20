/// <reference path="../zotero.d.ts" />

declare interface _ZoteroURI {
  defaultPrefix: {
    value: "http://zotero.org/";
  };
  getLocalUserURI: () => string;
  getCurrentUserURI: () => string;
  getCurrentUserLibraryURI: () => string;
  getLibraryURI: (libraryID: number) => string;
  /**
   * Get path portion of library URI (e.g., users/6 or groups/1)
   */
  getLibraryPath: (libraryID: number) => string;
  /**
   * Get library from path (e.g., users/6 or groups/1)
   */
  getPathLibrary: (path: string) => _ZoteroLibrary | false;
  /**
   * Return URI of item, which might be a local URI if user hasn't synced
   */
  getItemURI: (item: Zotero.Item) => string;
  /**
   * Get path portion of item URI (e.g., users/6/items/ABCD1234 or groups/1/items/ABCD1234)
   */
  getItemPath: (item: Zotero.Item) => string;
  getFeedItemURI: (feedItem: Zotero.Item) => string;
  getFeedItemPath: (feedItem: Zotero.Item) => string;
  /**
   * Return URI of collection, which might be a local URI if user hasn't synced
   */
  getCollectionURI: (feedItem: Zotero.Collection) => string;
  /**
   * Get path portion of collection URI (e.g., users/6/collections/ABCD1234 or groups/1/collections/ABCD1234)
   */
  getCollectionPath: (feedItem: Zotero.Collection) => string;
  getFeedURI: (feed: _ZoteroDataObject) => string;
  getFeedPath: (feed: _ZoteroDataObject) => string;
  getGroupsURL: () => string;
  getGroupURI: (group: Zotero.Collection) => string;
  _getObjectPath: (
    obj: Zotero.Library | Zotero.Collection | Zotero.Item
  ) => string;
  _getObjectURI: (
    obj: Zotero.Library | Zotero.Collection | Zotero.Item
  ) => string;
  /**
   * Convert an item URI into an item
   */
  getURIItem: (itemURI: string) => Promise<Zotero.Item>;
  getURIItemLibraryKey: (
    itemURI: string
  ) => { libraryID: number; key?: string; objectType?: string } | false;
  /**
   * Convert an item URI into a libraryID and key from the database, without relying on global state
   *
   * Note that while the URI must point to a valid library, the item doesn't need to exist
   */
  getURIItemLibraryKeyFromDB: (itemURI: string) => any;
  getURIItemID: (itemURI: string) => number | false;
  /**
   * Convert a collection URI into a collection
   */
  getURICollection: (
    collectionURI: string
  ) => Promise<Zotero.Collection | false>;
  getURICollectionLibraryKey: (
    collectionURI: string
  ) => { libraryID: number; key?: string; objectType?: string } | false;
  getURICollectionID: (collectionURI: string) => number | false;
  getURILibrary: (libraryURI: string) => number | false;
  getURIFeed: (feedURI: string) => Zotero.Library | false;
  /**
   * Convert an object URI into an object containing libraryID and key
   */
  _getURIObject: (
    objectURI: string,
    type: string
  ) => { libraryID: number; key?: string; objectType?: string } | false;
  /**
   * Convert an object URI into a Zotero.Library that the object is in
   */
  _getURIObjectLibrary: (objectURI: string) => Zotero.Library | false;
  /**
   * Convert an object URI into a libraryID from the database, without relying on global state
   */
  _getURIObjectLibraryID: (objectURI: string) => Promise<number | false>;
  /**
   * Convert an object URI into a libraryID and key from the database, without relying on global state
   *
   * Note that while the URI must point to a valid library, the object doesn't need to exist
   */
  _getURIObjectLibraryKeyFromDB: (
    objectURI: string,
    type: string
  ) => Promise<
    { libraryID: number; key?: string; objectType?: string } | false
  >;
}
