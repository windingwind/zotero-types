/// <reference path="item.d.ts" />

declare class _ZoteroLibrary {
    libraryID: number;
    id: number;
    libraryType: "user" | "group" | "feed";
    libraryTypeID: number;
    isGroup: boolean;
    libraryVersion: number;
    syncable: boolean;
    lastSync: string;
    name: string;
    treeViewID: string;
    treeViewImage: string;
    hasTrash: boolean;
    allowsLinkedFiles: boolean;
    editable: boolean;
    filesEditable: boolean;
    storageVersion: number;
    archived: boolean;
    storageDownloadNeeded: boolean;
    loadAllDataTypes: () => Promise<any>;
    getDataLoaded: (objectType: string) => boolean;
    setDataLoading: (objectType: string) => void;
    getDataLoadedPromise: (objectType: string) => Promise<any>;
    setDataLoaded: (objectType: string) => void;
    waitForDataLoad: (objectType: string) => Promise<any>;
    isChildObjectAllowed: (type: string) => boolean;
    updateLastSyncTime: () => void;
    save: (options?: any) => Promise<boolean>;
    saveTx: (options?: any) => Promise<boolean>;
    eraseTx: (options?: any) => Promise<boolean>;
    erase: (options?: any) => Promise<boolean>;
    hasCollections: () => boolean;
    updateCollections: () => Promise<any>;
    hasSearches: () => boolean;
    updateSearches: () => Promise<any>;
    hasItems: () => Promise<boolean>;
    hasItem: (item: _ZoteroItem) => boolean;
  }
  