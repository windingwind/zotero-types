/// <reference path="elements/index.d.ts" />

// chrome/content/zotero/zoteroPane.js

declare namespace _ZoteroTypes {
  class ZoteroPane {
    [attr: string]: any;
    document: Document & { body: null; head: null };
    collectionsView: CollectionTree | false;
    itemsView: ItemTree | false;
    itemPane: ItemPane | false;
    progressWindow: Zotero.ProgressWindow | false;

    newCollection(parentKey: string): Promise<undefined | Zotero.Collection>;
    openAdvancedSearchWindow(): void;
    updateTagFilter(): Promise<undefined>;
    toggleTagSelector(): void;
    tagSelectorShown(): undefined | boolean;
    getSelectedLibraryID(): number;
    getSelectedGroup(): Zotero.Collection;
    getSelectedGroup(asID: boolean): Zotero.Collection | number;
    getSelectedSavedSearch(): Zotero.Collection;
    getSelectedSavedSearch(asID: boolean): Zotero.Collection | number;
    getSelectedCollection(asID?: false): Zotero.Collection | undefined;
    getSelectedCollection(asID: true): number | undefined;
    selectItem(itemID: number, inLibraryRoot?: boolean): undefined | boolean;
    selectItems: (
      itemIDs: Array<number>,
      inLibraryRoot?: boolean,
    ) => Promise<undefined | boolean>;
    copySelectedItemsToClipboard(asCitations: boolean): void;
    refreshFeed(): undefined | Promise<any>;
    emptyTrash(): Promise<void>;
    mergeSelectedItems(): void;
    deleteSelectedCollection(deleteItems: boolean): void | Promise<void>;
    duplicateSelectedItem(): Promise<Zotero.Item>;
    duplicateAndConvertSelectedItem(): Promise<Zotero.Item | boolean>;
    restoreSelectedItems(): Promise<void>;
    updateNoteButtonMenu(): Promise<void>;
    getCollectionTreeRow(): undefined | CollectionTree;
    showOriginalItem(): void;
    search(runAdvanced: boolean): Promise<void>;
    sync(): void;
    showSetUpSyncReminder(): void;
    showAutoSyncReminder(): void;
    displayCannotEditLibraryMessage(): void;
    displayCannotEditLibraryFilesMessage(): void;
    displayCannotAddToMyPublicationsMessage(): void;
    displayCannotAddShortcutMessage(path?: string): void;
    recognizeSelected(): void;
    unrecognizeSelected(): Promise<void>;
    createParentItemsFromSelected(): Promise<void | false>;
    addNoteFromAnnotationsForAttachment: (
      attachment: Zotero.Item,
      opt?: { skipSelect?: boolean },
    ) => Promise<Zotero.Item>;
    createStandaloneNoteFromAnnotationsFromSelected(): Promise<void>;
    createEmptyParent(item: Zotero.Item): Promise<void>;
    exportPDF(itemID: number): Promise<void>;
    exportSelectedFiles(): Promise<void>;
    renameSelectedAttachmentsFromParents(): Promise<boolean>;
    convertLinkedFilesToStoredFiles(): Promise<void>;
    relinkAttachment(itemID: number): Promise<void>;
    updateReadLabel(): void;
    reportErrors(): void;
    displayStartupError(): void;
    hideRetractionBanner(): void;
    getState(): { type: "pane"; tabs: _ZoteroTypes.TabInstance[] };
    updateWindow(): void;
    openAboutDialog(): void;
    setItemPaneMessage(content: XUL.Element | string): void;
    addSelectedItemsToCollection: (
      collection: Zotero.Collection | null,
      createNew?: boolean,
    ) => Promise<void>;
    attachmentsWithExtractableAnnotations: (
      item: Zotero.Item,
    ) => Array<Zotero.Item>;
    isAttachmentWithExtractableAnnotations(item: Zotero.Item): boolean;
    openNoteWindow(itemID: number, col?: number, parentKey?: string): void;
    viewPDF(
      itemID: number,
      location: _ZoteroTypes.Reader.Location,
    ): Promise<void>;
    showAttachmentInFilesystem: (
      itemID: number,
      noLocateOnMissing?: boolean,
    ) => Promise<void>;
    getSortField(): false | string;
    getSortDirection(): false | 1 | -1;

    /**
     * Set the tags scope to the items in the current view
     * Passed to the items tree to trigger on changes
     */
    setTagScope(): void;

    /**
     * @return {Promise<Boolean>} - Promise that resolves to true if an item was selected,
     *                              or false if not (used for tests, though there could possibly
     *                              be a better test for whether the item pane changed)
     */
    itemSelected(): Promise<boolean>;

    /**
     * Update the <command> elements that control the shortcut keys and the enabled state of the
     * "Copy Citation"/"Copy Bibliography"/"Copy as"/"Copy Note" menu options. When disabled, the shortcuts are
     * still caught in handleKeyPress so that we can show an alert about not having references selected.
     */
    updateQuickCopyCommands(selectedItems: Array<Zotero.Item>): void;

    /**
     * Return whether every selected item can be deleted from the current
     * collection context (library, trash, collection, etc.).
     *
     * @return {Boolean}
     */
    canDeleteSelectedItems(): boolean;

    /**
     * Check whether every selected item can be restored from trash
     *
     * @return {Boolean}
     */
    canRestoreSelectedItems(): boolean;

    /*
     * Remove, trash, or delete item(s), depending on context
     *
     * @param  {Boolean}  [force=false]     Trash or delete even if in a collection or search,
     *                                      or trash without prompt in library
     * @param  {Boolean}  [fromMenu=false]  If triggered from context menu, which always prompts for deletes
     */
    deleteSelectedItems(force?: boolean, fromMenu?: boolean): void;

    /**
     * Currently only works on searches
     */
    duplicateSelectedCollection(): Promise<void>;

    /**
     * Configure the UI and show the sync reminder panel for a given type of reminder
     *
     * @param {String} reminderType - Possible values: 'setUp' or 'autoSync'
     * @param {Object} [options]
     * @param {String} [options.learnMoreURL] - Show "Learn More" link to this URL
     */
    showSyncReminder: (
      reminderType: string,
      options?: { learnMoreURL: string },
    ) => void;

    /**
     * Hide the currently displayed sync reminder and update its associated
     * lastDisplayed time.
     */
    hideSyncReminder(): void;

    /**
     * Adds or removes a function to be called when Zotero is reloaded by switching into or out of
     * the connector
     */
    addReloadListener(func: Function): void;

    /**
     * Adds or removes a function to be called just before Zotero is reloaded by switching into or
     * out of the connector
     */
    addBeforeReloadListener(func: Function): void;

    /**
     * Moves around the toolbar when the user moves around the pane
     */
    updateToolbarPosition(): void;

    /**
     * Unserializes zotero-persist elements from preferences
     */
    unserializePersist(): void;

    /**
     * Serializes zotero-persist elements to preferences
     */
    serializePersist(): void;

    /**
     * Sets the layout to either a three-vertical-pane layout and a layout where itemsPane is above itemPane
     */
    updateLayout(): void;

    /**
     * Attempt to find a file in the LABD matching the passed attachment
     * by searching successive subdirectories. Prompt the user if a match is
     * found and offer to relink one or all matching files in the directory.
     * The user can also choose to relink manually, which opens a file picker.
     *
     * If the synced path is 'C:\Users\user\Documents\Dissertation\Files\Paper.pdf',
     * the LABD is '/Users/user/Documents', and the (not yet known) correct local
     * path is '/Users/user/Documents/Dissertation/Files/Paper.pdf', check:
     *
     * 1. /Users/user/Documents/Users/user/Documents/Dissertation/Files/Paper.pdf
     * 2. /Users/user/Documents/user/Documents/Dissertation/Files/Paper.pdf
     * 3. /Users/user/Documents/Documents/Dissertation/Files/Paper.pdf
     * 4. /Users/user/Documents/Dissertation/Files/Paper.pdf
     *
     * If line 4 had not been the correct local path (in other words, if no file
     * existed at that path), we would have continued on to check
     * '/Users/user/Documents/Dissertation/Paper.pdf'. If that did not match,
     * with no more segments in the synced path to drop, we would have given up.
     *
     * Once we find the file, check for other linked files beginning with
     * C:\Users\user\Documents\Dissertation\Files and see if they exist relative
     * to /Users/user/Documents/Dissertation/Files, and prompt to relink them
     * all if so.
     *
     * @param {Zotero.Item} item
     * @return {Promise<Boolean>} True if relinked successfully or canceled
     */
    checkForLinkedFilesToRelink(item: Zotero.Item): Promise<boolean>;

    /**
     * Add a single child note with the annotations from all selected items, including from all
     * child attachments of a selected regular item
     *
     * Selected items must all have the same top-level item
     */
    addNoteFromAnnotationsFromSelected(): Promise<void>;

    /**
     * Create separate child notes for each selected item, including all child attachments of
     * selected regular items
     *
     * No longer exposed via UI
     */
    addNotesFromAnnotationsFromSelected(): Promise<void>;

    /**
     * Prompt the user to relink one or all of the attachment files found in
     * the LABD.
     *
     * @param {Zotero.Item} item
     * @param {String} path Path to the file matching `item`
     * @param {Number} numOthers If zero, "Relink All" option is not offered
     * @return {'one' | 'all' | 'manual' | 'cancel'}
     */
    showLinkedFileFoundAutomaticallyDialog: (
      item: Zotero.Item,
      path: string,
      numOthers: number,
    ) => "one" | "all" | "manual" | "cancel";

    /**
     * Return an array of Item objects for selected items
     * If asIDs is true, return an array of itemIDs instead
     * @param {boolean} [asIDs = false]
     */
    getSelectedItems(asIDs?: false): Array<Zotero.Item>;
    getSelectedItems(asIDs: true): Array<number>;

    /**
     * Returns an array of Zotero.Item objects of visible items in current sort order
     *
     * If asIDs is true, return an array of itemIDs instead
     */
    getSortedItems(asIDs?: false): Array<Zotero.Item>;
    getSortedItems(asIDs: true): Array<number>;

    /**
     * Loads a URL following the standard modifier key behavior
     *  (e.g. meta-click == new background tab, meta-shift-click == new front tab,
     *  shift-click == new window, no modifier == frontmost tab
     */
    loadURI(uris: string | Array<string>): void;

    /**
     * @return {Promise<Integer|null|false>} - The id of the new note in non-popup mode, null in
     *     popup mode (where a note isn't created immediately), or false if library isn't editable
     */
    newNote: (
      popup?: boolean,
      parentKey?: string,
      text?: string,
      citeURI?: string,
    ) => Promise<number>;

    /**
     * Creates a child note for the selected item or the selected item's parent
     *
     * @return {Promise}
     */
    newChildNote(popup?: boolean): void;

    /**
     * @param	{Document} doc
     * @param	{String|Integer} [itemType='webpage']	Item type id or name
     * @param	{Boolean} [saveSnapshot] Force saving or non-saving of a snapshot,
     * regardless of automaticSnapshots pref
     * @return {Promise<Zotero.Item>|false}
     */
    addItemFromDocument: (
      doc: Document,
      itemType?: _ZoteroTypes.Item.ItemType,
      saveSnapshot?: boolean,
      row?: Zotero.Collection,
    ) => Promise<Zotero.Item> | false;

    /**
     * @param	{String|Integer} [itemType='webpage']	Item type id or name
     * @param	{Boolean} [saveSnapshot] Force saving or non-saving of a snapshot,
     * regardless of automaticSnapshots pref
     * @return {Zotero.Item|false} - The saved item, or false if item can't be saved
     */
    addItemFromURL: (
      url: string,
      itemType?: _ZoteroTypes.Item.ItemType,
      saveSnapshot?: boolean,
      row?: Zotero.Collection,
    ) => Promise<Zotero.Item> | false;

    /**
     * Test if the user can edit the currently selected view
     *
     * @param {Integer}	[row]
     *
     * @return  {Boolean}		TRUE if user can edit, FALSE if not
     */
    canEdit(row?: number): boolean;

    /**
     * Test if the user can edit the parent library of the selected view
     *
     * @param	{Integer}	[row]
     * @return	{Boolean}		TRUE if user can edit, FALSE if not
     */
    canEditLibrary(row?: number): boolean;

    /**
     * Test if the user can edit the currently selected library/collection
     *
     * @param	{Integer}	[row]
     *
     * @return	{Boolean}		TRUE if user can edit, FALSE if not
     */
    canEditFiles(row?: number): boolean;
  }
}
