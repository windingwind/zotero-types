/// <reference path="dataObject.d.ts" />

declare class _ZoteroCollection extends _ZoteroDataObject {
    name: string;
    version: number;
    synced: boolean;
    treeViewID: string;
    treeViewImage: string;
    getName: () => string;
    loadFromRow: (row: object[]) => void;
    hasChildCollections: (
      /**
       * Include trashed items.
       * @default false
       */
      includeTrashed?: boolean
    ) => boolean;
    hasChildItems: () => boolean;
    getChildCollections: (
      /**
       * Return as ID(number).
       * @default false
       */
      asIDs?: boolean
    ) => _ZoteroCollection[] | number[];
    getChildItems: (
      /**
       * Return as ID(number).
       * @default false
       */
      asIDs?: boolean,
      /**
       * Include deleted items.
       * @default false
       */
      includeDeleted?: boolean
    ) => _ZoteroItem[] | number[];
    addItem: (itemID: number, options?: object) => Promise<any>; // do not require save
    addItems: (itemIDs: number[], options?: object) => Promise<any>; // do not require save
    removeItem: (itemID: number, options?: object) => Promise<any>;
    removeItems: (itemIDs: number[], options?: object) => Promise<any>;
    hasItem: (item: number | _ZoteroItem) => boolean;
    hasDescendent: (type: string, id: number) => boolean;
    diff: (collection: _ZoteroCollection, includeMatches: boolean) => Array<any>;
    clone: (libraryID: number) => _ZoteroCollection; // not saved
    isCollection: () => true;
    serialize: (
      /**
       * Nested.
       * @default false
       */
      nested: boolean
    ) => {
      primary: {
        collectionID: number;
        libraryID: number;
        key: string;
      };
      fields: {
        name: string;
        parentKey: string;
      };
      childCollections: _ZoteroCollection[];
      childItems: _ZoteroItem[];
      descendents: object[];
    };
    fromJSON: (json: JSON, options?: object) => void;
    toJSON: (options?: object) => JSON;
    getDescendents: (
      nested: boolean,
      type: string,
      /**
       * Include deleted items.
       * @default false
       */
      includeDeletedItems?: boolean,
      /**
       * Level.
       * @default 1
       */
      level?: number
    ) => object[];
    getLinkedCollection: (
      libraryID: number,
      bidrectional: boolean
    ) => Promise<_ZoteroCollection>;
    addLinkedCollection: (collection: _ZoteroCollection) => Promise<any>;
  }
  