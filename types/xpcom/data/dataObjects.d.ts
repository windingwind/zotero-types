/// <reference path="dataObject.d.ts" />

declare namespace _ZoteroTypes {
  interface DataObjects<T extends Zotero.DataObject = Zotero.DataObject> {
    idColumn: string;
    table: string;
    relationsTable: string;
    primaryFields: string[];
    _primaryDataSQLWhere: "WHERE 1";
    primaryDataSQLFrom: string;
    primaryDataSQL: string;

    init(): Promise<void>;
    _loadIDsAndKeys(): Promise<void>;
    isPrimaryField(field: string): boolean;

    /**
     * Retrieves one or more already-loaded items
     *
     * If an item hasn't been loaded, an error is thrown
     *
     * @param {Array|Integer} ids  An individual object id or an array of object ids
     * @return {Zotero.[Object]|Array<Zotero.[Object]>} A Zotero.[Object], if a scalar id was passed;
     *                                          otherwise, an array of Zotero.[Object]
     */
    get(id: number): T;
    get(ids: number[]): T[];

    /**
     * Retrieves (and loads, if necessary) one or more items
     *
     * @param {Array|Integer} ids  An individual object id or an array of object ids
     * @param {Object} [options]
     * @param {Boolean} [options.noCache=false] - Don't add object to cache after loading
     * @return {Promise<Zotero.DataObject|Zotero.DataObject[]>} - A promise for either a data object,
     *     if a scalar id was passed, or an array of data objects, if an array of ids was passed
     */
    getAsync(id: number, options?: { noCache: boolean }): Promise<T>;
    getAsync(ids: number[], options?: { noCache: boolean }): Promise<T[]>;

    /**
     * Get all loaded objects
     *
     * @return {Zotero.DataObject[]}
     */
    getLoaded(): T[];

    /**
     * Return objects in the trash
     *
     * @param {Integer} libraryID - Library to search
     * @param {Boolean} [asIDs] - Return object ids instead of objects
     * @param {Integer} [days]
     * @param {Integer} [limit]
     * @return {Promise<Zotero.DataObject[]|Integer[]>}
     */
    getDeleted(
      libraryID: number,
      asIDs?: boolean,
      days?: number,
      limit?: number,
    ): Promise<Array<number | T>>;

    getAllIDs(libraryID: number): Promise<number[]>;
    getAllKeys(libraryID: number): Promise<string[]>;
    parseLibraryKey(libraryKey: string): { libraryID: number; key: string };

    /**
     * Retrieves an object by its libraryID and key
     *
     * @param	{Integer}		libraryID
     * @param	{String}			key
     * @return	{Zotero.DataObject}			Zotero data object, or FALSE if not found
     */
    getByLibraryAndKey(
      libraryID: number,
      key: string,
      options?: unknown,
    ): T | false;

    /**
     * Asynchronously retrieves an object by its libraryID and key
     *
     * @param {Integer} libraryID
     * @param {String} key
     * @param {Object} [options]
     * @param {Boolean} [options.noCache=false] - Don't add object to cache after loading
     * @return {Promise<Zotero.DataObject>} - Promise for a data object, or FALSE if not found
     */
    getByLibraryAndKeyAsync(
      libraryID: number,
      key: string,
      options?: { noCache: boolean },
    ): Promise<T | false>;

    exists(id: number): boolean;

    /**
     * @return {Object} Object with 'libraryID' and 'key'
     */
    getLibraryAndKeyFromID(
      id: number,
    ): false | { libraryID: number; key: string };

    getIDFromLibraryAndKey(libraryID: number, key: string): number | false;

    /**
     * @returns Array of id of object
     */
    getOlder(libraryID: number, date: Date): Promise<number[]>;
    /**
     * @returns Array of id of object
     */
    getNewer(
      libraryID: number,
      date: Date,
      ignoreFutureDates?: boolean,
    ): Promise<number[]>;

    /**
     * Gets the latest version for each object of a given type in the given library
     *
     * @return {Promise<Object>} - A promise for an object with object keys as keys and versions
     *                             as properties
     */
    getObjectVersions(
      libraryID: number,
      keys?: string[],
    ): Promise<{ [key: string]: number }>;

    /**
     * Bulk-load data type(s) of given objects if not loaded
     *
     * This would generally be used to load necessary data for cross-library search results, since those
     * results might include objects in libraries that haven't yet been loaded.
     *
     * @param {Zotero.DataObject[]} objects
     * @param {String[]} [dataTypes] - Data types to load, defaulting to all types
     * @return {Promise}
     */
    loadDataTypes(objects: T[], dataTypes?: string[]): Promise<void>;

    /**
     * Loads data for a given data type
     * @param {String} dataType
     * @param {Integer} libraryID
     * @param {Integer[]} [ids]
     */
    _loadDataTypeInLibrary(
      dataType: string,
      libraryID: number,
      ids: number[],
    ): Promise<void>;

    loadAll(libraryID: number, ids?: number[]): Promise<void>;

    /**
     * Sort an array of collections or items from top-level to deepest, grouped by level
     *
     * All top-level objects are returned, followed by all second-level objects, followed by
     * third-level, etc. The order within each level is undefined.
     *
     * This is used to sort higher-level objects first in upload JSON, since otherwise the API would
     * reject lower-level objects for having missing parents.
     *
     * @param {Zotero.DataObject[]} objects - An array of objects
     * @return {Zotero.DataObject[]} - A sorted array of objects
     */
    sortByLevel<T>(objects: T[]): T[];

    /**
     * Sort an array of collections or items from top-level to deepest, grouped by parent
     *
     * Child objects are included before any sibling objects. The order within each level is undefined.
     *
     * This is used to sort higher-level objects first in upload JSON, since otherwise the API would
     * reject lower-level objects for having missing parents.
     *
     * @param {Zotero.DataObject[]} objects - An array of data objects
     * @return {Zotero.DataObject[]} - A sorted array of data objects
     */
    sortByParent<T>(objects: T[]): T[];

    /**
     * Flatten API JSON relations object into an array of unique predicate-object pairs
     *
     * @param {Object} relations - Relations object in API JSON format, with predicates as keys
     *                             and arrays of URIs as objects
     * @return {Array[]} - Predicate-object pairs
     */
    flattenRelations(
      relations: ObjectRelations,
    ): Array<[RelationsPredicate, ZoteroObjectURI]>;

    /**
     * Reload loaded data of loaded objects
     *
     * @param {Array|Number} ids - An id or array of ids
     * @param {Array} [dataTypes] - Data types to reload (e.g., 'primaryData'), or all loaded
     *                              types if not provided
     * @param {Boolean} [reloadUnchanged=false] - Reload even data that hasn't changed internally.
     *                                            This should be set to true for data that was
     *                                            changed externally (e.g., globally renamed tags).
     */
    reload(
      ids: number,
      dataTypes: string[],
      reloadUnchanged?: boolean,
    ): Promise<undefined | true>;

    reloadAll(libraryID: number): Promise<void>;
    registerObject(obj: T): void;
    dropDeadObjectsFromCache(): void;

    /**
     * Clear object from internal array
     *
     * @param	int[]	ids		objectIDs
     */
    unload(ids: number[]): void;

    /**
     * Set the version of objects, efficiently
     *
     * @param {Integer[]} ids - Ids of objects to update
     * @param {Boolean} version
     */
    updateVersion(ids: number[], version: number): Promise<void>;

    /**
     * Set the sync state of objects, efficiently
     *
     * @param {Integer[]} ids - Ids of objects to update
     * @param {Boolean} synced
     */
    updateSynced(ids: number[], synced?: boolean): Promise<void>;

    isEditable(obj: T): boolean;
    getPrimaryDataSQLPart(part: string): string;

    /**
     * Delete one or more objects from the database and caches
     *
     * @param {Integer|Integer[]} ids - Object ids
     * @param {Object} [options] - See Zotero.DataObject.prototype.erase
     * @param {Function} [options.onProgress] - f(progress, progressMax)
     * @return {Promise}
     */
    erase(
      ids: number | number[],
      options?: Zotero.DataObject.EraseOptions & {
        onProgress?: (progress: number, progressMax: number) => void;
      },
    ): Promise<void>;

    _loadIDsAndKeys(): Promise<void>;
  }

  type ObjectType = "collection" | "item" | "search";
}

declare namespace Zotero {
  const DataObjects: _ZoteroTypes.DataObjects;
}
