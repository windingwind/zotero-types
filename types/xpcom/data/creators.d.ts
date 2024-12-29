/// <reference path="item.d.ts" />

declare namespace _ZoteroTypes {
  interface Creators {
    fields: ["firstName", "lastName", "fieldMode"];
    totes: number;
    init(): Promise<void>;

    /*
     * Returns creator data in internal format for a given creatorID
     */
    get(creatorID: number): _ZoteroTypes.Item.Creator;

    getItemsWithCreator(creatorID: number): Promise<number[]>;
    countItemAssociations(creatorID: number): Promise<number>;

    /**
     * Returns the creatorID matching given fields, or creates a new creator and returns its id
     *
     * @requireTransaction
     * @param {Object} data  Creator data in API JSON format
     * @param {Boolean} [create=false]  If no matching creator, create one
     * @return {Promise<Integer>}  creatorID
     */
    getIDFromData(
      data: _ZoteroTypes.Item.CreatorJSON,
      create?: boolean,
    ): Promise<number | null>;

    updateCreator(
      creatorID: number,
      creatorData: _ZoteroTypes.Item.Creator,
    ): Promise<unknown>;

    /**
     * Delete obsolete creator rows from database and clear internal cache entries
     *
     * @return {Promise}
     */
    purge(): Promise<void>;

    equals(
      data1: _ZoteroTypes.Item.Creator,
      data2: _ZoteroTypes.Item.Creator,
    ): boolean;
    cleanData(
      data: _ZoteroTypes.Item.Creator,
      options?: { strict: boolean },
    ): _ZoteroTypes.Item.Creator;
    internalToJSON(
      fields: _ZoteroTypes.Item.Creator,
    ): _ZoteroTypes.Item.CreatorJSON;
  }
}

declare namespace Zotero {
  const Creators: _ZoteroTypes.Creators;
}
