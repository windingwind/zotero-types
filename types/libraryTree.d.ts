declare namespace _ZoteroTypes {
  interface TreeRow {
    isOpen: boolean;
    level: number;
  }
  interface LibraryTree extends React.Component {
    [attr: string]: any;

    get window(): Window;
    // get selection():TreeSelectionStub;
    get rowCount(): number;
    componentDidCatch(error: unknown, info: unknown): void;
    focus(): void;
    getParentIndex(index: number): number;
    getLevel(index: number): number;

    /**
     * Return a reference to the tree row at a given row
     *
     * @return {TreeRow}
     */
    getRow(index: number): TreeRow;

    /**
     * Return the index of the row with a given ID (e.g., "C123" for collection 123)
     *
     * @param {String} - Row id
     * @return {Integer|false}
     */
    getRowIndexByID(id: string): number | false;

    /**
     * Add a tree row to the main array, update the row count, tell the treebox that the row
     * count changed, and update the row map
     *
     * @param {TreeRow} treeRow
     * @param {Number} [beforeRow] - Row index to insert new row before
     */
    _addRow(
      treeRow: TreeRow,
      beforeRow: number,
      skipRowMapRefresh?: boolean,
    ): void;

    /**
     * Remove a row from the main array and parent row children arrays,
     * delete the row from the map, and optionally update all rows above it in the map
     */
    _removeRow(index: number, skipMapUpdate?: boolean): void;

    _removeRows(rows: number[]): void;
    _refreshRowMap(): void;
    _onSelectionChange(): void;
    _onSelectionChangeDebounced(): void;
    ensureRowIsVisible(index: number): void;
    _updateHeight(): void;
    updateHeight(): void;
    updateFontSize(): void;

    /**
     * On Windows (in Fx26), Firefox uses 'move' for unmodified drags
     * and 'copy'/'link' for drags with system-default modifier keys
     * as long as the actions are allowed by the initial effectAllowed set
     * in onDragStart, regardless of the effectAllowed or dropEffect set
     * in onDragOver. It doesn't seem to be possible to use 'copy' for
     * the default and 'move' for modified, as we need to in the collections
     * tree. To prevent inaccurate cursor feedback, we set effectAllowed to
     * 'copy' in onDragStart, which locks the cursor at 'copy'. ('none' still
     * changes the cursor, but 'move'/'link' do not.) It'd be better to use
     * the unadorned 'move', but we use 'copy' instead because with 'move' text
     * can't be dragged to some external programs (e.g., Chrome, Notepad++),
     * which seems worse than always showing 'copy' feedback.
     * However, since effectAllowed is enforced, leaving it at 'copy'
     * would prevent our modified 'move' in the collections tree from working,
     * so we also have to set effectAllowed here (called from onDragOver) to
     * the same action as the dropEffect. This allows the dropEffect setting
     * (which we use in the tree's canDrop() and drop() to determine the desired
     * action) to be changed, even if the cursor doesn't reflect the new setting.
     */
    setDropEffect(event: unknown, effect: unknown): void;

    selectLibrary(libraryID?: number): Promise<boolean>;
  }
}
