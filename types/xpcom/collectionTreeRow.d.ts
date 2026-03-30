/// <reference path="../zotero.d.ts" />

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
