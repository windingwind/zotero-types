declare namespace _ZoteroTypes {
  namespace UndoHistory {
    /**
     * Fluent message ID for an undo entry's action label. Zotero ships the
     * `undo-action-*` strings below; plugins can use their own Fluent IDs
     * after registering them with `Zotero.ftl.addResourceIds()`.
     */
    type UndoAction =
      | "undo-action-edit-metadata"
      | "undo-action-edit-field"
      | "undo-action-normalize-attachment-titles"
      | "undo-action-trash"
      | "undo-action-restore-items"
      | "undo-action-trash-collection"
      | "undo-action-trash-search"
      | "undo-action-restore-collection"
      | "undo-action-restore-objects"
      | "undo-action-add-to-collection"
      | "undo-action-remove-from-collection"
      | "undo-action-move-to-collection"
      | "undo-action-rename-collection"
      | "undo-action-move-collection"
      | "undo-action-add-tag"
      | "undo-action-change-tag"
      | "undo-action-split-tag"
      | "undo-action-remove-tag"
      | "undo-action-remove-tags-from-item"
      | "undo-action-remove-all-tags"
      | "undo-action-edit-note"
      | "undo-action-add-creator"
      | "undo-action-remove-creator"
      | "undo-action-edit-creator"
      | "undo-action-reorder-creator"
      | "undo-action-change-type"
      | "undo-action-change-parent-item"
      | "undo-action-convert-to-standalone"
      | "undo-action-add-related"
      | "undo-action-remove-related"
      | "undo-action-merge-items"
      | (string & {});

    interface ChangeRecord {
      objectType: string;
      id: number;
      libraryID: number;
      key: string;
      fields: Record<string, { old: unknown; new: unknown }>;
      skipDateModified?: boolean;
    }
  }
}

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
      action: _ZoteroTypes.UndoHistory.UndoAction,
      actionArgs?: Record<string, unknown>,
    ): void;
    /**
     * Stage a change record on the pending undo entry.
     * Must be called inside a DB transaction. Records for the same object
     * are coalesced field-by-field (first-write-wins for old, last-wins for new).
     */
    static stageChange(
      changeRecord: _ZoteroTypes.UndoHistory.ChangeRecord,
    ): void;
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
     * Return a XUL controller supporting 'cmd_undo'/'cmd_redo' that
     * delegates to native text-editing controllers when they are active.
     */
    static getController(doc: Document): {
      supportsCommand(cmd: string): boolean;
      isCommandEnabled(cmd: string): boolean;
      doCommand(cmd: string): void;
      onEvent(evt: string): void;
    };
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
