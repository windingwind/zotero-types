/// <reference path="libraryTree.d.ts" />
/// <reference path="xpcom/collectionTreeRow.d.ts" />

declare namespace _ZoteroTypes {
  interface CollectionTree extends LibraryTree {
    [attr: string]: any;
    /**
     * Return a reference to the tree row at a given row
     *
     * @return {TreeRow}
     */
    getRow(index: number): Zotero.CollectionTreeRow;

    /**
     * @deprecated Removed in Zotero 10 — throws when called.
     *     Use {@link getSelectedLibraryIDs} instead.
     */
    getSelectedLibraryID(): never;

    /**
     * Return the libraryID of every selected row, in tree order
     *
     * @return {Integer[]}
     */
    getSelectedLibraryIDs(): number[];

    /**
     * @deprecated Removed in Zotero 10 — throws when called.
     *     Use {@link getSelectedCollections} instead.
     */
    getSelectedCollection(asID?: boolean): never;

    /** Selected collections, safe for any selection (Zotero 10+) */
    getSelectedCollections(asID?: false): Zotero.Collection[];
    getSelectedCollections(asID: true): number[];

    /**
     * @deprecated Removed in Zotero 10 — throws when called.
     *     Use {@link getSelectedSearches} instead.
     */
    getSelectedSearch(asID?: boolean): never;

    /** Selected saved searches, safe for any selection (Zotero 10+) */
    getSelectedSearches(asID?: false): Zotero.Search[];
    getSelectedSearches(asID: true): number[];

    /**
     * @deprecated Removed in Zotero 10 — throws when called.
     *     Filter {@link LibraryTree.getSelectedRows} by `isGroup()` instead.
     */
    getSelectedGroup(asID?: boolean): never;
  }
}
