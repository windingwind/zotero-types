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
    indexItems(
      itemIDs: number[],
      options?: { complete?: boolean; ignoreErrors?: boolean },
    ): Promise<void>;
    rebuildIndex(unindexedOnly: boolean): Promise<void>;
    clearIndex(skipLinkedURLs?: boolean): Promise<void>;
    purgeUnusedWords(): Promise<void>;
    canIndex(item: Zotero.Item): boolean;
    canReindex(item: Zotero.Item): Promise<boolean>;
    getIndexedState(item: Zotero.Item): Promise<number>;
    isFullyIndexed(item: Zotero.Item): Promise<boolean>;
    getIndexStats(): Promise<{
      indexed: number;
      partial: number;
      unindexed: number;
      words: number;
    }>;
    getItemCacheFile(item: Zotero.Item): nsIFile;
    getItemProcessorCacheFile(item: Zotero.Item): nsIFile;
    transferItemIndex(
      fromItem: Zotero.Item,
      toItem: Zotero.Item,
    ): Promise<void>;
    getPages(itemID: number): Promise<false | { total: number }>;
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
    indexItems(
      itemIDs: number | number[],
      options?: { complete?: boolean; ignoreErrors?: boolean },
    ): Promise<void>;
    indexFromProcessorCache(itemID: number): Promise<boolean>;
    clearItemWords(itemID: number, force?: boolean): Promise<void>;
    semanticSplitter(text: string, charset?: string): string[];
  }
}
declare namespace Zotero {
  const Fulltext: _ZoteroTypes.FullText;
  const FullText: _ZoteroTypes.FullText;
}
