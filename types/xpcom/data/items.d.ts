/// <reference path="item.d.ts" />

declare class _ZoteroItems {
    [attr: string]: any;
    get(ids: number | string): _ZoteroItem;
    get(ids: number[] | string[]): _ZoteroItem[];
    getAll: (
      libraryID: number,
      /**
       * Only get top level items.
       * @default false
       */
      onlyTopLevel?: boolean,
      /**
       * Include deleted items.
       * @default false
       */
      includeDeleted?: boolean,
      /**
       * Return as ID(number).
       * @default false
       */
      asIDs?: boolean
    ) => Promise<Array<_ZoteroItem | number>>;
    getAPIData(libraryID, apiPath): string; // item data in web API format
    apiDataGenerator(params: object): Promise<string>;
    copyChildItems(fromItem: _ZoteroItem, toItem: _ZoteroItem): Promise<void>;
    moveChildItems: (
      fromItem: _ZoteroItem,
      toItem: _ZoteroItem,
      /**
       * Include trashed items.
       * @default false
       */
      includeTrashed?: boolean
    ) => Promise<void>;
    merge(item: _ZoteroItem, otherItems: _ZoteroItem[]): Promise<any>;
    trash(ids: number[]): Promise<void>;
    trashTx(ids: number[]): Promise<void>;
    emptyTrash(libraryID: number, options?: object): Promise<number>; // return deleted items count
    addToPublications(items: _ZoteroItem[], options?: object): Promise<void>;
    removeFromPublications(items: _ZoteroItem[]): Promise<void>;
    purge(): Promise<void>; // Purge unused data values
    getFirstCreatorFromJSON(json: JSON): any;
    getFirstCreatorFromData(itemTypeID: number, creatorsData: object): string;
    keepParents(items: _ZoteroItem[]): _ZoteroItem[]; // Returns an array of items with children of selected parents removed
    getSortTitle(title: string | number): string;
  }
  