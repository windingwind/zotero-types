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
    isRetracted(): boolean;
    isTrash(): boolean;
    isHeader(): boolean;
    isPublications(): boolean;
    isGroup(): boolean;
    isFeed(): boolean;
    isSeparator(): boolean;
    isBucket(): boolean;
    isShare(): boolean;
    isContainer(): boolean;
    isWithinGroup(): boolean;
    isWithinEditableGroup(): boolean;

    get editable(): boolean;
    get filesEditable(): boolean;
    get visibilityGroup(): "feed" | "feeds" | "default";
    getName(): string;
    getChildren(): Zotero.Collection | Zotero.Feed | undefined;
    getItems(): Promise<Array<Item | unknown>>; //
    getSearchResults(asTempTable?: false): Promise<number[]>;
    getSearchResults(asTempTable: true): Promise<string>;

    /*
     * Returns the search object for the currently display
     *
     * This accounts for the collection, saved search, quicksearch, tags, etc.
     */
    getSearchObject(): Promise<Zotero.Search>;

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
