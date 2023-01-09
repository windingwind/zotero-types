/// <reference path="../zotero.d.ts" />

declare interface _ZoteroURI {
  defaultPrefix: {
    value: "http://zotero.org/";
  };
  getLocalUserURI(): __ZoteroTypes.ZoteroObjectURI;
  getCurrentUserURI(): __ZoteroTypes.ZoteroObjectURI;
  getCurrentUserLibraryURI(): __ZoteroTypes.ZoteroObjectURI;
  getLibraryURI(libraryID: number): __ZoteroTypes.ZoteroObjectURI;
  /**
   * Get path portion of library URI (e.g., users/6 or groups/1)
   */
  getLibraryPath(libraryID: number): string;
  /**
   * Get library from path (e.g., users/6 or groups/1)
   */
  getPathLibrary(path: string): _ZoteroLibrary | false;
  /**
   * Return URI of item, which might be a local URI if user hasn't synced
   */
  getItemURI(item: Zotero.Item): __ZoteroTypes.ZoteroObjectURI;
  /**
   * Get path portion of item URI (e.g., users/6/items/ABCD1234 or groups/1/items/ABCD1234)
   */
  getItemPath(item: Zotero.Item): string;
  getFeedItemURI(feedItem: Zotero.Item): __ZoteroTypes.ZoteroObjectURI;
  getFeedItemPath(feedItem: Zotero.Item): string;
  /**
   * Return URI of collection, which might be a local URI if user hasn't synced
   */
  getCollectionURI(feedItem: Zotero.Collection): __ZoteroTypes.ZoteroObjectURI;
  /**
   * Get path portion of collection URI (e.g., users/6/collections/ABCD1234 or groups/1/collections/ABCD1234)
   */
  getCollectionPath(feedItem: Zotero.Collection): string;
  getFeedURI(feed: _ZoteroDataObject): __ZoteroTypes.ZoteroObjectURI;
  getFeedPath(feed: _ZoteroDataObject): string;
  getGroupsURL(): string;
  getGroupURI(group: Zotero.Collection): __ZoteroTypes.ZoteroObjectURI;
  _getObjectPath: (
    obj: Zotero.Library | Zotero.Collection | Zotero.Item
  ) => string;
  _getObjectURI: (
    obj: Zotero.Library | Zotero.Collection | Zotero.Item
  ) => __ZoteroTypes.ZoteroObjectURI;
  /**
   * Convert an item URI into an item
   */
  getURIItem(itemURI: __ZoteroTypes.ZoteroObjectURI): Promise<Zotero.Item>;
  getURIItemLibraryKey: (
    itemURI: __ZoteroTypes.ZoteroObjectURI
  ) => { libraryID: number; key?: string; objectType?: string } | false;
  /**
   * Convert an item URI into a libraryID and key from the database, without relying on global state
   *
   * Note that while the URI must point to a valid library, the item doesn't need to exist
   */
  getURIItemLibraryKeyFromDB(itemURI: __ZoteroTypes.ZoteroObjectURI): any;
  getURIItemID(itemURI: __ZoteroTypes.ZoteroObjectURI): number | false;
  /**
   * Convert a collection URI into a collection
   */
  getURICollection: (
    collectionURI: __ZoteroTypes.ZoteroObjectURI
  ) => Promise<Zotero.Collection | false>;
  getURICollectionLibraryKey: (
    collectionURI: __ZoteroTypes.ZoteroObjectURI
  ) => { libraryID: number; key?: string; objectType?: string } | false;
  getURICollectionID(collectionURI: __ZoteroTypes.ZoteroObjectURI): number | false;
  getURILibrary(libraryURI: __ZoteroTypes.ZoteroObjectURI): number | false;
  getURIFeed(feedURI: __ZoteroTypes.ZoteroObjectURI): Zotero.Library | false;
  /**
   * Convert an object URI into an object containing libraryID and key
   */
  _getURIObject: (
    objectURI: __ZoteroTypes.ZoteroObjectURI,
    type: string
  ) => { libraryID: number; key?: string; objectType?: string } | false;
  /**
   * Convert an object URI into a Zotero.Library that the object is in
   */
  _getURIObjectLibrary(objectURI: __ZoteroTypes.ZoteroObjectURI): Zotero.Library | false;
  /**
   * Convert an object URI into a libraryID from the database, without relying on global state
   */
  _getURIObjectLibraryID(objectURI: __ZoteroTypes.ZoteroObjectURI): Promise<number | false>;
  /**
   * Convert an object URI into a libraryID and key from the database, without relying on global state
   *
   * Note that while the URI must point to a valid library, the object doesn't need to exist
   */
  _getURIObjectLibraryKeyFromDB: (
    objectURI: __ZoteroTypes.ZoteroObjectURI,
    type: string
  ) => Promise<
    { libraryID: number; key?: string; objectType?: string } | false
  >;
}
