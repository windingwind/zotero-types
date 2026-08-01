/// <reference path="libraryTree.d.ts" />
/// <reference path="xpcom/data/item.d.ts" />
/// <reference path="xpcom/collectionTreeRow.d.ts" />

declare namespace _ZoteroTypes {
  namespace ItemTree {
    /**
     * The kind of view a set of collection tree rows adds up to.
     * Library roots, collections, and saved searches all map to 'default'.
     */
    type ViewMode =
      | "default"
      | "trash"
      | "duplicates"
      | "unfiled"
      | "retracted"
      | "recentlyRead"
      | "publications"
      | "bucket"
      | "feed"
      | "feeds";
  }

  interface ItemTree extends LibraryTree {
    [attr: string]: any;

    /**
     * @deprecated Removed in Zotero 10 — reading it returns `undefined`.
     *     Use {@link viewMode} for view checks
     *     (e.g. `itemsView.viewMode == 'trash'`) and
     *     {@link collectionTreeRows} for the selected rows.
     */
    collectionTreeRow?: never;

    /**
     * The kind of view the selected rows add up to, for the behaviors that
     * belong to the view rather than to any one row (trash restoring,
     * duplicate sets, feed dates).
     *
     * Anything that varies between rows -- ref, libraryID, collection vs.
     * saved search -- has to be read from collectionTreeRows instead.
     *
     * Zotero 10+
     */
    get viewMode(): ItemTree.ViewMode;

    /**
     * Selected collection tree rows backing this view, in selection order.
     * Trees not backed by a collection tree selection (e.g. the citation
     * explorer's) return an empty array. (Zotero 10+)
     */
    get collectionTreeRows(): Zotero.CollectionTreeRow[];

    /**
     * Returns an array of items of visible items in current sort order.
     * Library header and spacer rows are filtered out automatically.
     *
     * @param {Boolean} asIDs - Return itemIDs
     * @return {Zotero.Item[]|Integer[]} - An array of Zotero.Item objects or itemIDs
     */
    getSortedItems(asIDs?: false): Zotero.Item[];
    getSortedItems(asIDs: true): number[];

    /**
     * Number of visible rows representing objects, excluding library headers
     * and spacers (Zotero 10+)
     */
    get objectRowCount(): number;

    getRow(index: number): ItemTreeRow;
  }

  /**
   * Item tree rendering the items of the collection tree selection.
   * `ZoteroPane.itemsView` is an instance of this class. (Zotero 10+)
   */
  interface CollectionViewItemTree extends ItemTree {
    isFeedsOrFeed(): boolean;
    get visibilityGroup(): "feed" | "feeds" | "default" | string;
    get viewType(): string;
    get isSortable(): boolean;

    /** Compatibility wrapper around {@link changeCollectionTreeRows} */
    changeCollectionTreeRow(
      collectionTreeRow: Zotero.CollectionTreeRow | null | false,
    ): Promise<void>;
    changeCollectionTreeRows(
      collectionTreeRows: Zotero.CollectionTreeRow[] | false,
    ): Promise<void>;

    /** Collection-aware delete (moved from ItemTree in Zotero 10) */
    deleteSelection(force?: boolean): Promise<void>;
  }

  interface ItemTreeRow extends TreeRow {
    new (
      ref: Zotero.DataObject,
      level: number,
      isOpen: boolean,
      id?: string,
    ): this;

    /**
     * Whether the row represents an object in the view, as opposed to a
     * library header or spacer. Callers that operate on the view's contents
     * (counting rows, collecting items, walking top-level rows) should skip
     * rows where this is false. (Zotero 10+)
     */
    get isObjectRow(): boolean;

    /** 'item' for object rows; 'library-header' / 'spacer' otherwise (Zotero 10+) */
    get type(): "item" | "library-header" | "spacer" | string;

    getField(
      field: _ZoteroTypes.Item.ItemField | number,
      unformatted?: boolean,
    ): string;
    numNotes(): number;
  }
}
