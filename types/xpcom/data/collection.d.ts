/// <reference path="dataObject.d.ts" />
declare namespace _ZoteroTypes {
  namespace Collection {
    type DataType =
      | "primaryData"
      | "childCollections"
      | "childItems"
      | "relations";
    type DescendentType = "item" | "collection";
    interface Descendent {
      id: number;
      key: string;
      level: number;
      name: string;
      parent: number;
      type: Collection.DescendentType;
    }
  }
}

declare namespace Zotero {
  class Collection extends Zotero.DataObject {
    static prototype: Collection;
    constructor(params?: {
      name?: string;
      libraryID?: number;
      parentID?: number;
      parentKey?: string;
    });
    _childCollections: Set<number>;
    _childItems: Set<number>;
    _objectType: "collection";
    _dataTypes: Array<_ZoteroTypes.Collection.DataType>;
    ChildObjects: _ZoteroTypes.Items;
    name: string;
    version: number;
    synced: boolean;
    parentID: number;
    parentKey: string;
    treeViewID: string;
    treeViewImage: string;

    /*
     * Populate collection data from a database row
     */
    loadFromRow(row: object): void;

    hasChildCollections(includeTrashed?: boolean): boolean;
    hasChildItems(): boolean;

    /**
     * Returns subcollections of this collection
     *
     * @param {Boolean} [asIDs=false] Return as collectionIDs
     * @return {Zotero.Collection[]|Integer[]}
     */
    getChildCollections(
      asIDs?: false,
      includeTrashed?: boolean,
    ): Zotero.Collection[];
    getChildCollections(asIDs: true, includeTrashed?: boolean): number[];

    /**
     * Returns child items of this collection
     *
     * @param	{Boolean}	asIDs			Return as itemIDs
     * @param	{Boolean}	includeDeleted	Include items in Trash
     * @return {Zotero.Item[]|Integer[]} - Array of Zotero.Item instances or itemIDs
     */
    getChildItems(asIDs?: false, includeDeleted?: boolean): Zotero.Item[];
    getChildItems(asIDs: true, includeDeleted?: boolean): number[];

    _saveData(env: unknown): Promise<void>;

    /**
     * @param {Number} itemID
     * @return {Promise}
     */
    addItem(itemID: number, options?: DataObject.SaveOptions): Promise<void>; // do not require save

    /**
     * Add multiple items to the collection in batch
     *
     * Requires a transaction
     * Does not require a separate save()
     *
     * @param {Number[]} itemIDs
     * @return {Promise}
     */
    addItems(
      itemIDs: number[],
      options?: DataObject.SaveOptions,
    ): Promise<void>; // do not require save

    /**
     * Remove a item from the collection. The item is not deleted from the library.
     *
     * Requires a transaction
     * Does not require a separate save()
     *
     * @return {Promise}
     */
    removeItem(
      itemID: number,
      options?: DataObject.SaveOptions & { skipEditCheck?: boolean },
    ): Promise<void>;
    /**
     * Remove multiple items from the collection in batch.
     * The items are not deleted from the library.
     *
     * Does not require a separate save()
     */
    removeItems(
      itemIDs: number[],
      options?: DataObject.SaveOptions & { skipEditCheck?: boolean },
    ): Promise<void>;

    /**
     * Check if an item belongs to the collection
     *
     * @param {Zotero.Item|Number} item - Item or itemID
     */
    hasItem(item: number | Zotero.Item): boolean;

    hasDescendent(
      type: _ZoteroTypes.Collection.DescendentType,
      id: number,
    ): boolean;

    /**
     * Returns an unsaved copy of the collection without id and key
     *
     * Doesn't duplicate subcollections or items, because the collection isn't saved
     */
    clone(libraryID?: number): Zotero.Collection; // not saved

    /**
     * Deletes collection and all descendent collections (and optionally items)
     */
    _eraseData(env: unknown): Promise<void>;

    isCollection(): true;
    serialize(nested?: boolean): {
      primary: {
        collectionID: number;
        libraryID: number;
        key: string;
      };
      fields: {
        name: string;
        parentKey: string;
      };
      childCollections: number[];
      childItems: number[];
      descendents: _ZoteroTypes.Collection.Descendent[];
    };

    /**
     * Populate the object's data from an API JSON data object
     *
     * If this object is identified (has an id or library/key), loadAllData() must have been called.
     */
    fromJSON(json: object, options?: { strict: boolean }): void;
    toJSON(options?: object): {
      key: string;
      name: string;
      version: 68;
      parentCollection: string | false;
      relations: _ZoteroTypes.ObjectRelations;
    };

    /**
     * Returns an array of descendent collections and items
     *
     * @param	{Boolean}	[nested=false]		Return multidimensional array with 'children'
     *											nodes instead of flat array
     * @param	{String}	[type]				'item', 'collection', or NULL for both
     * @param	{Boolean}	[includeDeletedItems=false]		Include items in Trash
     * @param {Number}  [level=1]
     * @return	{Object[]} - An array of objects with 'id', 'key', 'type' ('item' or 'collection'),
     *     'parent', and, if collection, 'name' and the nesting 'level'
     */
    getDescendents(
      nested?: boolean,
      type?: _ZoteroTypes.Collection.DescendentType | null,
      includeDeletedItems?: boolean,
      level?: number,
    ): _ZoteroTypes.Collection.Descendent[];

    /**
     * Return a collection in the specified library equivalent to this collection
     *
     * @return {Promise<Zotero.Collection>}
     */
    getLinkedCollection(
      libraryID: number,
      bidrectional?: boolean,
    ): Promise<Zotero.Collection | false>;
    /**
     * Add a linked-object relation pointing to the given collection
     *
     * Does not require a separate save()
     */
    addLinkedCollection(collection: Zotero.Collection): Promise<boolean>;

    /**
     * Add a collection to the cached child collections list if loaded
     */
    _registerChildCollection(collectionID: number): void;

    /**
     * Remove a collection from the cached child collections list if loaded
     */
    _unregisterChildCollection(collectionID: number): void;

    /**
     * Add an item to the cached child items list if loaded
     */
    _registerChildItem(itemID: number): void;

    /**
     * Remove an item from the cached child items list if loaded
     */
    _unregisterChildItem(itemID: number): void;
  }
}
