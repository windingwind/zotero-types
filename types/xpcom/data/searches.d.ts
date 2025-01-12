/// <reference path="dataObjects.d.ts" />

declare namespace _ZoteroTypes {
  interface Searches extends DataObjects<Zotero.Search> {
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

declare namespace Zotero {
  const Searches: _ZoteroTypes.Searches;
}
