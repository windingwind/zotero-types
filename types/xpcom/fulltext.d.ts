/// <reference path="data/item.d.ts" />

declare namespace _ZoteroTypes {
  interface FullText {
    readonly fulltextCacheFile: ".zotero-ft-cache";

    readonly INDEX_STATE_UNAVAILABLE: 0;
    readonly INDEX_STATE_UNINDEXED: 1;
    readonly INDEX_STATE_PARTIAL: 2;
    readonly INDEX_STATE_INDEXED: 3;
    readonly INDEX_STATE_QUEUED: 4;

    readonly SYNC_STATE_UNSYNCED: 0;
    readonly SYNC_STATE_IN_SYNC: 1;
    readonly SYNC_STATE_TO_PROCESS: 2;
    readonly SYNC_STATE_TO_DOWNLOAD: 3;
    readonly SYNC_STATE_MISSING: 4;

    init(): Promise<void>;
    setPDFConverterPath(path: string): void;
    setPDFInfoPath(path: string): void;
    setPDFDataPath(path: string): void;
    getLibraryVersion(libraryID: number): Promise<number>;
    setLibraryVersion(libraryID: number, version: number): Promise<void>;
    clearLibraryVersion(libraryID: number): Promise<void>;
    getItemVersion(itemID: number): Promise<number>;
    setItemSynced(itemID: number, version: number): Promise<void>;
    getPDFConverterExecAndArgs(): { exec: string; args: string[] };
    isCachedMIMEType(mimeType: string): boolean;
    indexDocument(document: Document, itemID: number): Promise<boolean | void>;
    indexPDF(
      filePath: string,
      itemID: number,
      allPages?: boolean,
    ): Promise<boolean>;
    indexEPUB(
      filePath: string,
      itemID: number,
      allText?: boolean,
    ): Promise<boolean>;

    /**
     * @param {Integer[]|Integer} itemIDs - One or more itemIDs
     * @param {Object} [options]
     * @param {Boolean} [options.complete=false] - Ignore page/character limits
     * @param {Boolean} [options.ignoreErrors=false] - Continue on error instead of throwing
     */
    indexItems(
      itemIDs: number | number[],
      options?: { complete?: boolean; ignoreErrors?: boolean },
    ): Promise<void>;

    queueItem(item: Zotero.Item): Promise<void>;
    getUnsyncedContent(libraryID: number, options?: object): Promise<object[]>;
    getUndownloadedPostData(): Promise<string | null>;
    setItemContent(
      libraryID: number,
      key: string,
      data: object | string,
      version: number,
    ): Promise<void>;

    /** Zotero 10+ (renamed from registerContentProcessor()) */
    registerSyncContentProcessor(): void;
    /** Zotero 10+ (renamed from unregisterContentProcessor()) */
    unregisterSyncContentProcessor(): void;
    /** Zotero 10+ (renamed from stopContentProcessor()) */
    stopSyncContentProcessor(): void;
    /** Zotero 10+ (renamed from processUnprocessedContent()) */
    processSyncedContent(itemIDs: number[]): Promise<void>;
    /** Zotero 10+ */
    processSyncedContentNow(): Promise<void>;
    indexSyncedContent(itemID: number): Promise<void>;

    /** @return {Promise<Integer>} (Zotero 10+) */
    getAttachmentIndexQueueCount(): Promise<number>;
    /**
     * @return {Promise<Integer>} The number of items processed (Zotero 10+)
     */
    processAttachmentIndexQueue(options?: {
      maxTime?: number | null;
      checkIdle?: boolean;
      onProgress?: Function | null;
    }): Promise<number>;
    /** @return {Promise<Integer>} (Zotero 10+) */
    getAttachmentExtractionQueueCount(): Promise<number>;
    /**
     * @return {Promise<Integer>} The number of items processed (Zotero 10+)
     */
    processAttachmentExtractionQueue(options?: {
      maxTime?: number | null;
      checkIdle?: boolean;
    }): Promise<number>;
    /** @return {Promise<Integer>} (Zotero 10+) */
    getNoteIndexQueueCount(): Promise<number>;
    /**
     * @return {Promise<Integer>} The number of notes processed (Zotero 10+)
     */
    processNoteIndexQueue(options?: {
      maxTime?: number | null;
      checkIdle?: boolean;
      onProgress?: Function | null;
    }): Promise<number>;
    /** Zotero 10+ */
    startQueueDrain(): Promise<void>;
    /** Zotero 10+ */
    optimizeContentIndex(): Promise<void>;
    /**
     * @return {Promise<Boolean>} - Whether the index was vacuumed (Zotero 10+)
     */
    vacuumContentIndex(options?: { force?: boolean }): Promise<boolean>;
    /** Zotero 10+ */
    registerQueueDrainObserver(): void;
    /** Zotero 10+ */
    unregisterQueueDrainObserver(): void;

    /**
     * @param {Number} itemID
     * @param {String} note - The note's HTML (Zotero 10+)
     */
    flagNoteStale(itemID: number, note: string): Promise<void>;
    /** Zotero 10+ */
    clearNoteIndex(itemID: number): Promise<void>;

    /** Zotero 10+ */
    canSearchContent(searchText: string): boolean;
    /** Zotero 10+ */
    canSearchNotes(searchText: string): boolean;
    /**
     * @return {Promise<Object|null>} { sql, params }, or null to fall back
     *     to a raw scan (Zotero 10+)
     */
    getNoteContentSQL(
      searchText: string,
    ): Promise<{ sql: string; params: unknown[] } | null>;
    /**
     * @param {String} searchText
     * @param {Integer|null} [libraryID] - Restrict to this library, or null/undefined for all
     * @param {Integer[]|null} [scopeIDs] - Restrict to these items
     * @return {Promise<Integer[]|null>} (Zotero 10+)
     */
    findItemsWithContent(
      searchText: string,
      libraryID?: number | null,
      scopeIDs?: number[] | null,
    ): Promise<number[] | null>;
    /** @return {Object|null} { sql, params } (Zotero 10+) */
    getContentSearchSQL(
      searchText: string,
    ): { sql: string; params: unknown[] } | null;
    findTextInItems(
      items: number[],
      searchText: string,
      mode?: string,
    ): Promise<Array<{ id: number; match: object }>>;

    transferItemIndex(
      fromItem: Zotero.Item,
      toItem: Zotero.Item,
    ): Promise<void>;
    clearItemWords(itemID: number, skipCacheClear?: boolean): Promise<void>;
    getPages(itemID: number): Promise<false | { total: number }>;
    getIndexedState(item: Zotero.Item): Promise<number>;
    isFullyIndexed(item: Zotero.Item): Promise<boolean>;
    getIndexStats(): Promise<{
      indexed: number;
      partial: number;
      notAvailable: number;
      notesIndexed: number;
      remaining: number;
      unindexedQueue: number;
      noteQueue: number;
    }>;
    getItemCacheFile(item: Zotero.Item): nsIFile;
    /** Zotero 10+ (renamed from getItemProcessorCacheFile()) */
    getSyncedContentCacheFile(item: Zotero.Item): nsIFile;
    canIndex(item: Zotero.Item): boolean;
    canReindex(item: Zotero.Item): Promise<boolean>;
    rebuildIndex(unindexedOnly?: boolean): Promise<void>;
    /**
     * @param {String} type - 'chars' or 'pages'
     * @param {Integer} newLimit (Zotero 10+)
     */
    reindexTruncated(type: "chars" | "pages", newLimit: number): Promise<void>;
    /** Zotero 10+ */
    purgeOrphanedContent(): Promise<void>;
    semanticSplitter(text: string, charset?: string): string[];

    /** @deprecated Removed in Zotero 10 */
    clearIndex(skipLinkedURLs?: boolean): never;
    /** @deprecated Removed in Zotero 10 */
    purgeUnusedWords(): never;
    /** @deprecated Removed in Zotero 10 — use getSyncedContentCacheFile() */
    getItemProcessorCacheFile(item: Zotero.Item): never;
    /** @deprecated Removed in Zotero 10 */
    indexFromProcessorCache(itemID: number): never;
    /** @deprecated Removed in Zotero 10 — use registerSyncContentProcessor() */
    registerContentProcessor(): never;
    /** @deprecated Removed in Zotero 10 — use unregisterSyncContentProcessor() */
    unregisterContentProcessor(): never;
    /** @deprecated Removed in Zotero 10 — use stopSyncContentProcessor() */
    stopContentProcessor(): never;
    /** @deprecated Removed in Zotero 10 — use processSyncedContent() */
    processUnprocessedContent(itemIDs: number[]): never;
  }
}
declare namespace Zotero {
  const Fulltext: _ZoteroTypes.FullText;
  const FullText: _ZoteroTypes.FullText;
}
