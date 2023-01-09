/// <reference path="item.d.ts" />
/// <reference path="collection.d.ts" />

/*
 * Primary interface for accessing Zotero collection
 */
interface _ZoteroCollections extends _ZoteroDataObjects {
  _objectCache: { [i: number]: Zotero.Collection };
  ObjectClass: _ZoteroCollection;
  _ZDO_object: 'collection';
  _primaryDataSQLParts: {
    collectionID: "O.collectionID",
    name: "O.collectionName AS name",
    libraryID: "O.libraryID",
    key: "O.key",
    version: "O.version",
    synced: "O.synced",

    deleted: "DC.collectionID IS NOT NULL AS deleted",

    parentID: "O.parentCollectionID AS parentID",
    parentKey: "CP.key AS parentKey",

    hasChildCollections: "(SELECT COUNT(*) FROM collections WHERE parentCollectionID=O.collectionID) != 0 AS hasChildCollections",
    hasChildItems: "(SELECT COUNT(*) FROM collectionItems WHERE collectionID=O.collectionID) != 0 AS hasChildItems"
  };
  _primaryDataSQLFrom: string;
  _relationsTable: "collectionRelations";

  /**
   * Get collections within a library
   *
   * Either libraryID or parentID must be provided
   *
   * @param {Integer} libraryID
   * @param {Boolean} [recursive=false]
   * @return {Zotero.Collection[]}
   */
  getByLibrary(libraryID: number, recursive?: boolean): _ZoteroCollection[];

  /**
   * Get collections that are subcollection of a given collection
   *
   * @param {Integer} parentCollectionID
   * @param {Boolean} [recursive=false]
   * @return {Zotero.Collection[]}
   */
  getByParent(parentCollectionID: number, recursive?: boolean): _ZoteroCollection[];

  getCollectionsContainingItems(itemIDs: number[], asIDs?: false): Promise<_ZoteroItem[]>;
  getCollectionsContainingItems(itemIDs: number[], asIDs: true): Promise<number[]>;
  _loadChildCollections(libraryID: number, ids: number[]): Promise<void>;
  _loadChildItems(libraryID: number, ids: number[], idSQL: string): Promise<void>;
  registerChildCollection(collectionID: number, childCollectionID: number): void;
  unregisterChildCollection(collectionID: number, childCollectionID: number): void;
  registerChildItem(collectionID: number, itemID: number): void;
  unregisterChildItem(collectionID: number, itemID: number): void;
}
