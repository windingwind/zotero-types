/// <reference path="../zotero.d.ts" />

declare namespace Zotero {
  interface CollectionTreeRow extends _ZoteroTypes.TreeRow {
    new (
      collectionTreeView: _ZoteroTypes.CollectionTree,
      type: _ZoteroTypes.CollectionTreeRow.Type,
      ref: unknown,
      level: number,
      isOpen: boolean,
    ): this;
    view: _ZoteroTypes.CollectionTree;
    type: _ZoteroTypes.CollectionTreeRow.Type;
    onUnload?: () => Promise<void>;
    ref: DataObject | _ZoteroTypes.anyObj;
    get id(): string;

    isLibrary(includeGlobal?: boolean): boolean;
    isCollection(): boolean;
    isSearch(): boolean;
    isDuplicates(): boolean;
    isUnfiled(): boolean;
    /** Zotero 10+ */
    isRecentlyRead(): boolean;
    isRetracted(): boolean;
    isTrash(): boolean;
    isHeader(): boolean;
    isPublications(): boolean;
    isGroup(): boolean;
    isFeed(): boolean;
    /** Zotero 10+ */
    isFeeds(): boolean;
    /** Zotero 10+ */
    isFeedsOrFeed(): boolean;
    isSeparator(): boolean;
    isBucket(): boolean;
    isShare(): boolean;
    isContainer(): boolean;
    isWithinGroup(): boolean;
    isWithinEditableGroup(): boolean;
    /** Zotero 10+ */
    isSortable(): boolean;

    get editable(): boolean;
    get filesEditable(): boolean;
    get visibilityGroup(): "feed" | "feeds" | "default";
    getName(): string;
    getChildren(): Zotero.Collection | Zotero.Feed | undefined;

    /**
     * Trashed collections in this row's library (Trash rows only, Zotero 10+)
     */
    getTrashedCollections(): Promise<Zotero.Collection[]>;

    /**
     * @param {Object} [options]
     * @param {Boolean} [options.unfiltered=false] - If true, ignore quicksearch, tag, and
     *     advanced search filters
     */
    getItems(options?: {
      unfiltered?: boolean;
    }): Promise<Array<Item | unknown>>; //

    /**
     * @param {Boolean} [asTempTable=false]
     * @param {Object} [options]
     * @param {Boolean} [options.unfiltered=false] - If true, ignore quicksearch, tag, and
     *     advanced search filters and bypass the cache
     */
    getSearchResults(
      asTempTable?: false,
      options?: { unfiltered?: boolean },
    ): Promise<number[]>;
    getSearchResults(
      asTempTable: true,
      options?: { unfiltered?: boolean },
    ): Promise<string>;

    /*
     * Returns the search object for the currently display
     *
     * This accounts for the collection, saved search, quicksearch, tags, etc.
     *
     * @param {Object} [options]
     * @param {Boolean} [options.unfiltered=false] - If true, ignore quicksearch, tag, and
     *     advanced search filters and bypass the cache
     */
    getSearchObject(options?: { unfiltered?: boolean }): Promise<Zotero.Search>;

    /**
     * @deprecated Use getTags() instead
     */
    getChildTags(): Promise<_ZoteroTypes.Tags.TagJson[]>;

    /**
     * Returns all the tags used by items in the current view
     *
     * @return {Promise<Object[]>}
     */
    getTags(
      types: number[],
      tagIDs: number[],
    ): Promise<_ZoteroTypes.Tags.TagJson[]>;

    searchText?: string;
    setSearch(searchText: string): void;
    setTags(tags: Set<string>): void; //

    /*
     * Returns TRUE if saved search, quicksearch or tag filter
     */
    isSearchMode(): boolean;
  }

  const CollectionTreeCache: _ZoteroTypes.CollectionTreeCache;
}

declare namespace _ZoteroTypes {
  namespace CollectionTreeRow {
    type Type =
      | "library"
      | "group"
      | "feed"
      | "collection"
      | "search"
      | "duplicates"
      | "unfiled"
      | "retracted"
      | "publications"
      | "trash"
      | "feeds"
      | "header"
      | "separator"
      | "bucket"
      | "share";
  }

  interface CollectionTreeCache {
    lastTreeRow?: Zotero.CollectionTreeRow;
    lastSearch?: Zotero.Search;
    lastTempTable?: string;
    lastResults?: number[];
    error: boolean;
    clear(): void;
  }
}
