/// <reference path="item.d.ts" />

declare namespace _ZoteroTypes {
  namespace Library {
    interface Params {
      libraryType?: string;
      editable?: boolean;
      filesEditable?: boolean;
      libraryVersion?: number;
      storageVersion?: number;
      lastSync?: Date;
      archived?: boolean;
    }

    abstract class LibraryAbstract {
      abstract _objectType: string;
      abstract readonly _childObjectTypes: ["item", "collection", "search"];

      // Immutable libraries
      abstract readonly fixedLibraries: ["user"];

      // Valid library types
      abstract readonly libraryTypes: string[];

      abstract libraryType: "user" | "group" | "feed";

      // Converts DB column name to (internal) object property
      static _colToProp(c: string): string;

      static readonly _dbColumns: string[];

      // Select all columns in a unique manner, so we can JOIN tables with same column names (e.g. version)
      static readonly _rowSQLSelect: string;

      // The actual select statement for above columns
      static readonly _rowSQL: string;

      static prototype: Zotero.Library;

      constructor(params?: _ZoteroTypes.Library.Params);

      readonly libraryID: number;
      id: number;

      /**
       * Get the library-type-specific id for the library (e.g., userID for user library,
       * groupID for group library)
       *
       * @property
       */
      readonly libraryTypeID: number;

      readonly isGroup: boolean;
      libraryVersion: number;
      readonly syncable: boolean;
      readonly lastSync: Date;
      readonly name: string;
      readonly treeViewID: string;
      readonly treeViewImage: _ZoteroTypes.IconURI;
      readonly hasTrash: boolean;
      readonly allowsLinkedFiles: boolean;
      editable: boolean;
      filesEditable: boolean;
      storageVersion: number;
      archived: boolean;
      storageDownloadNeeded: boolean;
      _isValidProp(prop: string): boolean;
      _loadDataFromRow(row: object): void;
      _reloadFromDB(): Promise<void>;

      /**
       * Load object data in this library
       */
      loadAllDataTypes(): Promise<void>;

      getDataLoaded(objectType: _ZoteroTypes.ObjectType): boolean;
      setDataLoading(objectType: _ZoteroTypes.ObjectType): void;
      getDataLoadedPromise(
        objectType: _ZoteroTypes.ObjectType,
      ): Promise<unknown> | null;
      setDataLoaded(objectType: _ZoteroTypes.ObjectType): void;

      /**
       * Wait for a given data type to load, loading it now if necessary
       */
      waitForDataLoad(objectType: _ZoteroTypes.ObjectType): Promise<void>;

      isChildObjectAllowed(type: _ZoteroTypes.ObjectType): boolean;
      updateLastSyncTime(): void;
      save(options?: object): Promise<false | void>;
      saveTx(options?: object): Promise<false | void>;
      eraseTx(options?: object): Promise<false | void>;
      erase(options?: object): Promise<false | void>;
      hasCollections(): boolean;
      updateCollections(): Promise<void>;
      hasSearches(): boolean;
      updateSearches(): Promise<void>;
      hasItems(): Promise<boolean>;
      hasItem(item: Zotero.Item): boolean;
    }

    type LibraryLike = Zotero.Library | Zotero.Group | Zotero.Feed;
  }
}
declare namespace Zotero {
  class Library extends _ZoteroTypes.Library.LibraryAbstract {
    _objectType: "library";
    _childObjectTypes: ["item", "collection", "search"];
    fixedLibraries: ["user"];
    libraryTypes: ["user"];
    libraryType: "user" | "group" | "feed";

    static readonly _dbColumns: [
      "type",
      "editable",
      "filesEditable",
      "version",
      "storageVersion",
      "lastSync",
      "archived",
    ];
  }
}
