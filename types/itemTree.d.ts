/// <reference path="libraryTree.d.ts" />
/// <reference path="xpcom/data/item.d.ts" />

declare namespace _ZoteroTypes {
  interface ItemTree extends LibraryTree {
    [attr: string]: any;
  }

  interface ItemTreeRow extends TreeRow {
    new (ref: Zotero.DataObject, level: number, isOpen: boolean): this;
    getField(
      field: _ZoteroTypes.Item.ItemField | number,
      unformatted?: boolean,
    ): string;
    numNotes(): number;
  }
}
