/// <reference path="library.d.ts" />
/// <reference path="relations.d.ts" />
/// <reference path="search.d.ts" />
/// <reference path="searches.d.ts" />
/// <reference path="../uri.d.ts" />

declare namespace Zotero {
  namespace DataObject {
    interface SaveOptions {
      /**
       * Don't save add new object to the cache; if set, object is disabled after save
       */
      skipCache?: boolean;

      skipDateModifiedUpdate?: boolean;
      skipClientDateModifiedUpdate?: boolean;

      /**
       * Don't trigger Zotero.Notifier events
       */
      skipNotifier?: boolean;

      /**
       * Don't select object automatically in trees
       */
      skipSelect?: boolean;

      /**
       * Don't automatically set 'synced' to false
       */
      skipSyncedUpdate?: boolean;

      /**
       * Pass along any 'notifierData' values, which become 'extraData' in notifier events
       */
      notifierData?: any;

      tx?: boolean;
    }
    interface EraseOptions {
      /**
       * Move descendant items to trash (Collection only)
       */
      deleteItems?: boolean;
      /**
       * Don't add to sync delete log
       */
      skipDeleteLog?: boolean;
      tx?: boolean;
    }
  }

  /**
   * @property {String} (readOnly) objectType
   * @property {String} (readOnly) libraryKey
   * @property {String|false|undefined} parentKey - False if no parent, or undefined if not
   *                                                applicable (e.g. search objects)
   * @property {Integer|false|undefined} parentID - False if no parent, or undefined if not
   *                                                applicable (e.g. search objects)
   */
  class DataObject {
    readonly objectType: string;
    readonly libraryKey: string;
    readonly id: number;
    readonly libraryID: number;
    readonly library: Zotero.Library;
    readonly key: string;
    deleted: boolean;

    /**
     *  @property {Integer|false|undefined} parentKey - False if no parent, or undefined if not
     *                                                 applicable (e.g. search objects)
     */
    parentKey: string | false | undefined;

    /**
     *  @property {Integer|false|undefined} parentID - False if no parent, or undefined if not
     *                                                 applicable (e.g. search objects)
     */
    parentID: number | false | undefined;

    readonly _canHaveParent: boolean;
    ObjectsClass: this extends Zotero.Item
      ? _ZoteroTypes.Items
      : this extends Zotero.Collection
        ? _ZoteroTypes.Collections
        : this extends Zotero.Search
          ? _ZoteroTypes.Searches
          : _ZoteroTypes.DataObjects;
    itemTypeID: number;

    /**
     * Returns all relations of the object
     * @return {Object} - Object with predicates as keys and arrays of values
     */
    getRelations(): _ZoteroTypes.ObjectRelations;

    /**
     * Returns all relations of the object with a given predicate
     * @return {String[]} - URIs linked to this object with the given predicate
     */
    getRelationsByPredicate(
      predicate: _ZoteroTypes.RelationsPredicate,
    ): _ZoteroTypes.ZoteroObjectURI[];

    /**
     * @return {Boolean} - True if the relation has been queued, false if it already exists
     */
    addRelation(
      predicate: _ZoteroTypes.RelationsPredicate,
      object: _ZoteroTypes.ZoteroObjectURI,
    ): boolean;

    hasRelation(
      predicate: _ZoteroTypes.RelationsPredicate,
      object: _ZoteroTypes.ZoteroObjectURI,
    ): boolean;
    removeRelation(
      predicate: _ZoteroTypes.RelationsPredicate,
      object: _ZoteroTypes.ZoteroObjectURI,
    ): boolean;

    /**
     * Updates the object's relations
     *
     * @param {Object} newRelations Object with predicates as keys and URI[] as values
     * @return {Boolean} True if changed, false if stayed the same
     */
    setRelations(newRelations: _ZoteroTypes.ObjectRelations): boolean;

    /**
     * Add a linked-item relation to a pair of objects
     *
     * A separate save() is not required.
     *
     * @param {Zotero.DataObject} object
     * @return {Promise<Boolean>}
     */
    _addLinkedObject(object: Zotero.DataObject): Promise<boolean>;

    /**
     * Bulk data loading functions
     * These are called by @function Zotero.DataObjects.prototype.loadDataType().
     */
    loadPrimaryData(reload: boolean, failOnMissing?: boolean): Promise<void>;

    /**
     * Reloads loaded, changed data
     *
     * @param {String[]} [dataTypes] - Data types to reload, or all loaded types if not provide
     * @param {Boolean} [reloadUnchanged=false] - Reload even data that hasn't changed internally.
     *                                            This should be set to true for data that was
     *                                            changed externally (e.g., globally renamed tags).
     */
    reload(dataTypes: string[], reloadUnchanged: boolean): Promise<void>;

    /**
     * Checks whether a given data type has been loaded
     *
     * @param {String} [dataType=primaryData] Data type to check
     * @throws {Zotero.DataObjects.UnloadedDataException} If not loaded, unless the
     *   data has not yet been "identified"
     */
    _requireData(dataType: string): void;

    /**
     * Loads data for a given data type
     * @param {String} dataType
     * @param {Boolean} reload
     * @param {Promise}
     */
    loadDataType(dataType: string): Promise<void>;

    loadAllData(): void;
    _markAllDataTypeLoadStates(loaded: boolean): void;
    _hasFieldChanged(field: string): boolean;
    _getChangedField(field: string): unknown;

    /**
     *  Get either the unsaved value of a field or the saved value if unchanged since the last save
     */
    _getLatestField(field: string): unknown; // any type of this._ properties

    /**
     * Save old version of data that's being changed, to pass to the notifier
     * @param {String} field
     * @param {} value - Old value for old-style 'changed' fields, and new value for 'changedData' fields
     */
    _markFieldChange(field: string, value: [] | {}): void;

    hasChanged(): boolean;

    /**
     * Clears log of changed values
     * @param {String} [dataType] data type/field to clear. Defaults to clearing everything
     */
    _clearChanged(dataType?: string): void;

    /**
     * Clears field change log
     * @param {String} field
     */
    _clearFieldChange(field: string): void;

    /**
     * Mark a data type as requiring a reload when the current save finishes. The changed state is cleared
     * before the new data is saved to the database (so that further updates during the save process don't
     * get lost), so we need to separately keep track of what changed.
     */
    _markForReload(dataType: string): void;

    /**
     * @param {String} [op='edit'] - Operation to check; if not provided, check edit privileges for
     *     library
     */
    isEditable(op?: string): boolean;

    /**
     * Save changes to database
     *
     * @param {Object} [options]
     * @param {Boolean} [options.skipCache] - Don't save add new object to the cache; if set, object
     *                                         is disabled after save
     * @param {Boolean} [options.skipDateModifiedUpdate]
     * @param {Boolean} [options.skipClientDateModifiedUpdate]
     * @param {Boolean} [options.skipNotifier] - Don't trigger Zotero.Notifier events
     * @param {Boolean} [options.skipSelect] - Don't select object automatically in trees
     * @param {Boolean} [options.skipSyncedUpdate] - Don't automatically set 'synced' to false
     * @return {Promise<Integer|Boolean>}  Promise for itemID of new item,
     *                                     TRUE on item update, or FALSE if item was unchanged
     */
    save(options?: DataObject.SaveOptions): Promise<boolean | number>;
    saveTx(options?: DataObject.SaveOptions): Promise<boolean | number>;
    _saveData(env: unknown): void;
    _finalizeSave(env: unknown): Promise<void>;
    /**
     * Actions to perform after DB transaction
     */
    _postSave(env: unknown): void;
    _recoverFromSaveError(): Promise<void>;

    /**
     * Update object version, efficiently
     *
     * Used by sync code
     *
     * @param {Integer} version
     * @param {Boolean} [skipDB=false]
     */
    updateVersion(version: number, skipDB?: false): void;

    /**
     * Update object sync status, efficiently
     *
     * Used by sync code
     *
     * @param {Boolean} synced
     * @param {Boolean} [skipDB=false]
     */
    updateSynced(synced: boolean, skipDB?: boolean): Promise<void>;

    eraseTx(options?: DataObject.EraseOptions): Promise<boolean>;
    /**
     * Delete object from database
     *
     * @param {Object} [options]
     * @param {Boolean} [options.deleteItems] - Move descendant items to trash (Collection only)
     * @param {Boolean} [options.skipDeleteLog] - Don't add to sync delete log
     */
    erase(options?: DataObject.EraseOptions): Promise<boolean>;

    _finalizeErase(env: unknown): Promise<void>;
    toResponseJSON(options?: {}): {
      key: string;
      version: number;
      meta: _ZoteroTypes.anyObj;
      data: _ZoteroTypes.anyObj;
    };

    /**
     * Generates data object key
     * @return {String} key
     */
    _generateKey(): string;

    _disabledCheck(): void;
  }
}
