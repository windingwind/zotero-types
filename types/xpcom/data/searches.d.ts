/// <reference path="dataObjects.d.ts" />

declare namespace _ZoteroTypes {
  interface Searches extends DataObjects {
    readonly ObjectClass: Zotero.Search;
    readonly primaryFields: [
      "savedSearchID",
      "name",
      "libraryID",
      "key",
      "version",
      "synced",
      "deleted",
    ];
  }
}
