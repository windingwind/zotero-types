/// <reference path="item.d.ts" />

declare namespace _ZoteroTypes {
  interface Creators {
    fields: ["firstName", "lastName", "fieldMode"];
    totes: number;
    init(): Promise<void>;

    /*
     * Returns creator data in internal format for a given creatorID
     */
    get(creatorID: number): Zotero.Item.Creator;

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
      data: Zotero.Item.CreatorJSON,
      create?: boolean,
    ): Promise<number | null>;

    updateCreator(
      creatorID: number,
      creatorData: Zotero.Item.Creator,
    ): Promise<unknown>;

    /**
     * Delete obsolete creator rows from database and clear internal cache entries
     *
     * @return {Promise}
     */
    purge(): Promise<void>;

    equals(data1: Zotero.Item.Creator, data2: Zotero.Item.Creator): boolean;
    cleanData(
      data: Zotero.Item.Creator,
      options?: { strict: boolean },
    ): Zotero.Item.Creator;
    internalToJSON(fields: Zotero.Item.Creator): Zotero.Item.CreatorJSON;
  }
}
