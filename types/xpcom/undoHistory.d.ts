declare namespace Zotero {
  class UndoHistory {
    /**
     * Read pref `undoHistory.steps` (default 100). Steps ≤ 0 disables undo entirely.
     */
    static init(): void;
    /**
     * @return true when `_maxSteps > 0`
     */
    static isEnabled(): boolean;
    /**
     * Discard both undo and redo stacks.
     */
    static clear(): void;
    /**
     * Discard both stacks if any entry references an object in the given library.
     */
    static clearForLibrary(libraryID: number): void;
    /**
     * @return true if the undo stack has entries
     */
    static canUndo(): boolean;
    /**
     * @return true if the redo stack has entries
     */
    static canRedo(): boolean;
    /**
     * Pop and apply the top undo entry. Returns false if stale or empty.
     */
    static undo(): Promise<boolean>;
    /**
     * Pop and apply the top redo entry. Returns false if stale or empty.
     */
    static redo(): Promise<boolean>;
    /**
     * Stage an action label on the pending undo entry.
     * Must be called inside a DB transaction. The last call in a transaction wins.
     *
     * @param action Fluent message ID (e.g. 'undo-action-trash')
     * @param actionArgs Optional Fluent message arguments (e.g. { count: 3 })
     */
    static stageAction(
      action: string,
      actionArgs?: Record<string, unknown>,
    ): void;
    /**
     * Stage a change record on the pending undo entry.
     * Must be called inside a DB transaction. Records for the same object
     * are coalesced field-by-field (first-write-wins for old, last-wins for new).
     */
    static stageChange(changeRecord: {
      objectType: string;
      id: number;
      libraryID: number;
      key: string;
      fields: Record<string, { old: unknown; new: unknown }>;
      skipDateModified?: boolean;
    }): void;
    /**
     * Return the action description for the top of the undo stack.
     */
    static getUndoAction(): {
      action: string;
      actionArgs: Record<string, unknown> | null;
    } | null;
    /**
     * Return the action description for the top of the redo stack.
     */
    static getRedoAction(): {
      action: string;
      actionArgs: Record<string, unknown> | null;
    } | null;
    /**
     * Return a XUL controller that delegates to native text-editing
     * controllers when they are active.
     */
    static getController(doc: Document): object;
    /**
     * Return true if a native text editor handles undo (e.g. focused input).
     */
    static hasNativeUndo(doc: Document): boolean;
    /**
     * Return true if a native text editor handles redo (e.g. focused input).
     */
    static hasNativeRedo(doc: Document): boolean;
  }
}
