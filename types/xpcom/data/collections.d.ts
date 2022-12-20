/// <reference path="item.d.ts" />
/// <reference path="collection.d.ts" />

declare class _ZoteroCollections {
    getName: () => string;
    getChildItems: (arg1: boolean, arg2: boolean) => Array<_ZoteroItem>;
    getByLibrary: (
      libraryID: number,
      /**
       * Recursive.
       * @default false
       */
      recursive: boolean
    ) => _ZoteroCollection[];
    getByParent: (
      parentCollectionID: number,
      /**
       * Recursive.
       * @default false
       */
      recursive: boolean
    ) => _ZoteroCollection[];
    getCollectionsContainingItems: (
      itemIDs: number[],
      /**
       * Return as ID(number).
       * @default false
       */
      asIDs?: boolean
    ) => _ZoteroItem[] | number[];
    getLoaded: () => _ZoteroCollection[];
    registerChildCollection: (
      collectionID: number,
      childCollectionID: number
    ) => void;
    unregisterChildCollection: (
      collectionID: number,
      childCollectionID: number
    ) => void;
    registerChildItem: (collectionID: number, itemID: number) => void;
    unregisterChildItem: (collectionID: number, itemID: number) => void;
  }
