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
  }
}
