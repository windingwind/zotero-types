// Type definitions for Zotero
// Project: https://github.com/windingwind/zotero-types#readme
// Definitions by: windingwind <https://github.com/windingwind>
// Definitions: 

/// <reference types="node" />

// https://github.com/retorquere/zotero-better-bibtex/blob/master/typings/global.d.ts

declare interface DirectoryIterator {
  forEach(handler: any): Promise<void>;
  close(): void;
  next: () => any;
}
declare interface DirectoryIteratorConstructable {
  new (path: string): DirectoryIterator; // eslint-disable-line @typescript-eslint/prefer-function-type
}

export namespace OS {
  namespace File {
    type Entry = {
      isDir: boolean;
      size: number;
      path: string;
      unixMode?: number;
    };
    type FileInfo = {
      isDir: boolean;
      size: number;
      unixMode?: number;
      lastModificationDate: Date;
    };
  }
}
export const OS: {
  // https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/OSFile.jsm/OS.File_for_the_main_thread
  File: {
    exists: (path: string) => boolean | Promise<boolean>;
    read: (
      path: string | BufferSource,
      options?: { encoding?: string }
    ) =>
      | string
      | Promise<string>
      | Uint8Array
      | Promise<Uint8Array>
      | Promise<BufferSource>;
    move: (from: string, to: string) => void | Promise<void>;
    remove: (
      path: string,
      options?: { ignoreAbsent: boolean }
    ) => Promise<void>;
    writeAtomic: (
      path: string,
      data: Uint8Array | string,
      options?: { tmpPath?: string; encoding?: string }
    ) => void | Promise<void>;
    makeDir: (
      path: string,
      options?: { ignoreExisting?: boolean }
    ) => void | Promise<void>;
    stat: (path: string) => OS.File.FileInfo | Promise<OS.File.FileInfo>;
    copy: (
      src: string,
      tgt: string,
      options?: { noOverwrite?: boolean }
    ) => void;
    removeDir: (
      path: string,
      options?: { ignoreAbsent?: boolean; ignorePermissions?: boolean }
    ) => void;

    DirectoryIterator: DirectoryIteratorConstructable;
  };

  // https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/OSFile.jsm/OS.Path
  Path: {
    join: (...args: string[]) => string;
    dirname: (path: string) => string;
    basename: (path: string) => string;
    normalize: (path: string) => string;
    split: (path: string) => {
      absolute: boolean;
      components: string[];
      winDrive?: string;
    };
    toFileURI: (path: string) => string;
  };
};

export const NetUtil: { [attr: string]: any };

// https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
export const Zotero: {
  [attr: string]: any;
  debug: (message, level?, maxDepth?, stack?) => void;
  log: (
    message,
    type?,
    sourceName?,
    sourceLine?,
    lineNumber?,
    columnNumber?
  ) => void;
  Prefs: {
    get: (
      pref: string,
      global?: boolean | undefined
    ) => boolean | string | number | undefined;
    set: (
      pref: string,
      value: boolean | string | number,
      global?: boolean | undefined
    ) => any;
  };
  Notifier: {
    registerObserver: (
      ref: { notify: Function },
      types?: string[],
      id?: string,
      priority?: null
    ) => string;
    unregisterObserver: (id: String) => void;
  };
  DataObject: _ZoteroDataObjectConstructable;
  Item: _ZoteroItemConstructable;
  Items: _ZoteroItems;
  Collection: _ZoteroCollectionConstructable;
  Collections: _ZoteroCollection;
  Library: _ZoteroLibraryConstructable;
  Libraries: _ZoteroLibraries;
  Reader: _ZoteroReader;
  EditorInstance: _ZoteroEditorInstanceConstructable;
  EditorInstanceUtilities: _ZoteroEditorInstanceUtilities;
  Notes: _ZoteroNotes;
};

export const ZoteroPane_Local: {
  [attr: string]: any;
  getSelectedCollection: () => _ZoteroCollection;
  newNote: (popup?, parentKey?, text?, citeURI?) => Promise<number>;
};

export const Zotero_File_Interface: {
  exportItemsToClipboard: (items: _ZoteroItem[], translatorID: string) => void;
};

export class Zotero_File_Exporter {
  items: _ZoteroItem[];
  save: () => Promise<any>;
}

export const Components: any;
export const Services: any;

export const ZoteroContextPane: {
  [attr: string]: any;
  getActiveEditor: () => _ZoteroEditorInstance;
};

// chrome/content/zotero/xpcom/data/dataObject.js

declare interface _ZoteroDataObject {
  objectType: string;
  id: number;
  libraryID: number;
  library: _ZoteroLibrary;
  key: string;
  libraryKey: string;
  parentKey: string;
  parentID: number;
  itemTypeID: number;
  parentItem: _ZoteroItem;
  getRelations: () => object;
  getRelationsByPredicate: (predicate: string) => string[];
  addRelation: (predicate: string, object: object) => boolean;
  hasRelation: (predicate: string, object: object) => boolean;
  removeRelation: (predicate: string, object: object) => boolean;
  setRelations: (newRelations: object) => boolean;
  hasChanged: () => boolean;
  isEditable: (_op?: string | undefined) => boolean;
  save: (options?: any) => Promise<boolean>;
  saveTx: (options?: any) => Promise<boolean>;
  eraseTx: (options?: any) => Promise<boolean>;
  erase: (options?: any) => Promise<boolean>;
  _version: number;
  _synced: boolean;
}

declare interface _ZoteroDataObjectConstructable {
  new (): _ZoteroDataObject;
}

// chrome/content/zotero/xpcom/data/item.js
// TODO: complete this part

declare interface _ZoteroItem extends _ZoteroDataObject {
  isRegularItem: () => boolean;
  isAttachment: () => boolean;
  isAnnotation: () => boolean;
  isPDFAttachment: () => boolean;
  getTags: () => { tag: string; type: number }[];
  addTag: (name: string, type: number) => boolean;
  removeTag: (tag: string) => boolean;
  // Only regular item
  addToCollection: (id: number) => void;
  getNotes: () => _ZoteroItem[];
  getCollections: () => number[];
  getAttachments: () => _ZoteroItem[];
  getField: (
    name: string,
    unformatted?: boolean,
    includeBaseMapped?: boolean
  ) => any;
  setField: (name: string, value: string | number) => void;
  getCreators: () => {
    firstName?: string;
    lastName: string;
    fieldMode: number;
    creatorTypeID: number;
  }[];
  getCreatorsJSON: () => {
    firstName?: string;
    lastName?: string;
    name?: string;
    creatorType: string;
  }[];
  getBestAttachment: () => Promise<_ZoteroItem>;
  getBestAttachments: () => Promise<_ZoteroItem[]>;
  getBestAttachmentState: () => Promise<object>;
  // Only image annotation & attachment item
  getFilePathAsync: () => string;
  // Only notes
  isNote: () => boolean;
  getNote: () => string;
  setNote: (content: string) => void;
  getNoteTitle: () => string;
  // Only Annotation
  getAnnotations: (
    /**
     * Include trashed items.
     * @default true
     */
    includeTrashed?: boolean
  ) => _ZoteroItem[];
  annotationType: string;
  annotationComment: string;
  annotationText: string;
  annotationPosition: string;
  annotationColor: string;
  annotationPageLabel: string;
}

declare interface _ZoteroItemConstructable {
  new (itemTypeOrID?: string): _ZoteroItem;
}

// chrome/content/zotero/xpcom/data/items.js

declare class _ZoteroItems {
  [attr: string]: any;
  get: (
    ids: number | number[] | string | string[]
  ) => _ZoteroItem | _ZoteroItem[];
  getAll: (
    libraryID: number,
    /**
     * Only get top level items.
     * @default false
     */
    onlyTopLevel?: boolean,
    /**
     * Include deleted items.
     * @default false
     */
    includeDeleted?: boolean,
    /**
     * Return as ID(number).
     * @default false
     */
    asIDs?: boolean
  ) => Promise<Array<_ZoteroItem | number>>;
  getAPIData: (libraryID, apiPath) => string; // item data in web API format
  apiDataGenerator: (params: object) => Promise<string>;
  copyChildItems: (fromItem: _ZoteroItem, toItem: _ZoteroItem) => Promise<void>;
  moveChildItems: (
    fromItem: _ZoteroItem,
    toItem: _ZoteroItem,
    /**
     * Include trashed items.
     * @default false
     */
    includeTrashed?: boolean
  ) => Promise<void>;
  merge: (item: _ZoteroItem, otherItems: _ZoteroItem[]) => Promise<any>;
  trash: (ids: number[]) => Promise<void>;
  trashTx: (ids: number[]) => Promise<void>;
  emptyTrash: (libraryID: number, options?: object) => Promise<number>; // return deleted items count
  addToPublications: (items: _ZoteroItem[], options?: object) => Promise<void>;
  removeFromPublications: (items: _ZoteroItem[]) => Promise<void>;
  purge: () => Promise<void>; // Purge unused data values
  getFirstCreatorFromJSON: (json: JSON) => any;
  getFirstCreatorFromData: (itemTypeID: number, creatorsData: object) => string;
  keepParents: (items: _ZoteroItem[]) => _ZoteroItem[]; // Returns an array of items with children of selected parents removed
  getSortTitle: (title: string | number) => string;
}

// chrome/content/zotero/xpcom/data/collection.js

declare interface _ZoteroCollection extends _ZoteroDataObject {
  name: string;
  version: number;
  synced: boolean;
  treeViewID: string;
  treeViewImage: string;
  loadFromRow: (row: object[]) => void;
  hasChildCollections: (
    /**
     * Include trashed items.
     * @default false
     */
    includeTrashed?: boolean
  ) => boolean;
  hasChildItems: () => boolean;
  getChildCollections: (
    /**
     * Return as ID(number).
     * @default false
     */
    asIDs?: boolean
  ) => _ZoteroCollection[] | number[];
  getChildItems: (
    /**
     * Return as ID(number).
     * @default false
     */
    asIDs?: boolean,
    /**
     * Include deleted items.
     * @default false
     */
    includeDeleted?: boolean
  ) => _ZoteroItem[] | number[];
  addItem: (itemID: number, options?: object) => Promise<any>; // do not require save
  addItems: (itemIDs: number[], options?: object) => Promise<any>; // do not require save
  removeItem: (itemID: number, options?: object) => Promise<any>;
  removeItems: (itemIDs: number[], options?: object) => Promise<any>;
  hasItem: (item: number | _ZoteroItem) => boolean;
  hasDescendent: (type: string, id: number) => boolean;
  diff: (collection: _ZoteroCollection, includeMatches: boolean) => Array<any>;
  clone: (libraryID: number) => _ZoteroCollection; // not saved
  isCollection: () => true;
  serialize: (
    /**
     * Nested.
     * @default false
     */
    nested: boolean
  ) => {
    primary: {
      collectionID: number;
      libraryID: number;
      key: string;
    };
    fields: {
      name: string;
      parentKey: string;
    };
    childCollections: _ZoteroCollection[];
    childItems: _ZoteroItem[];
    descendents: object[];
  };
  fromJSON: (json: JSON, options?: object) => void;
  toJSON: (options?: object) => JSON;
  getDescendents: (
    nested: boolean,
    type: string,
    /**
     * Include deleted items.
     * @default false
     */
    includeDeletedItems?: boolean,
    /**
     * Level.
     * @default 1
     */
    level?: number
  ) => object[];
  getLinkedCollection: (
    libraryID: number,
    bidrectional: boolean
  ) => Promise<_ZoteroCollection>;
  addLinkedCollection: (collection: _ZoteroCollection) => Promise<any>;
}

declare interface _ZoteroCollectionConstructable {
  new (params?: object): _ZoteroCollection;
}

// chrome/content/zotero/xpcom/data/collections.js

declare class _ZoteroCollections {
  getName: () => string;
  getChildItems: (arg1: boolean, arg2: boolean) => Array<_ZoteroItem>;
  getByLibrary: (
    libraryID: number,
    /**
     * Recursive.
     * @default false
     */
    recursive: boolean
  ) => _ZoteroCollection[];
  getByParent: (
    parentCollectionID: number,
    /**
     * Recursive.
     * @default false
     */
    recursive: boolean
  ) => _ZoteroCollection[];
  getCollectionsContainingItems: (
    itemIDs: number[],
    /**
     * Return as ID(number).
     * @default false
     */
    asIDs?: boolean
  ) => _ZoteroItem[] | number[];
  registerChildCollection: (
    collectionID: number,
    childCollectionID: number
  ) => void;
  unregisterChildCollection: (
    collectionID: number,
    childCollectionID: number
  ) => void;
  registerChildItem: (collectionID: number, itemID: number) => void;
  unregisterChildItem: (collectionID: number, itemID: number) => void;
}

// chrome/content/zotero/xpcom/data/library.js

declare interface _ZoteroLibrary {
  libraryID: number;
  id: number;
  libraryType: "user" | "group";
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

declare interface _ZoteroLibraryConstructable {
  new (params?: object): _ZoteroLibrary;
}

// chrome/content/zotero/xpcom/data/libraries.js

declare class _ZoteroLibraries {
  [attr: string]: any;
  userLibraryID: number;
  userLibrary: _ZoteroLibrary;
  register: (library: _ZoteroLibrary) => void;
  unregister: (libraryID: number) => void;
  init: () => void;
  exists: (libraryID: number) => boolean;
  getAll: () => _ZoteroLibrary[];
  get: (libraryID: number) => _ZoteroLibrary;
}

// chrome/content/zotero/xpcom/editorInstance.js

declare interface _ZoteroEditorInstance {
  [attr: string]: any;
  init: (options: {
    onNavigate?: Function;
    item?: _ZoteroItem;
    reloaded?: boolean;
    viewMode?: string;
    readOnly?: boolean;
    disableUI?: boolean;
    onReturn?: Function;
    iframeWindow?: XUL.Element;
    popup?: any;
    state?: any;
    placeholder?: any;
  }) => Promise<void>;
  uninit: () => Promise<void>;
  focus: () => void;
  notify: (event, type, ids, extraData) => Promise<void>;
  saveSync: () => void;
  insertAnnotations: (annotations: any) => Promise<void>;
  _postMessage: (message: any) => void;
  _isReadOnly: () => boolean;
  _getFont: () => { fontSize: number; fontFamily: string };
  _handleFontChange: () => void;
  _handleStyleChange: () => void;
  _handleSpellCheckChange: () => void;
  _showInLibrary: (ids: number | number[]) => void;
  importImages: (annotations: any) => Promise<void>;
  _digestItems: (ids: number[]) => string | null;
  _messageHandler: (e: MessageEvent) => Promise<void>;
  _updateCitationItems: (citationItemsList: object[]) => Promise<void>;
  _feedSubscription: (subscription: object) => Promise<void>;
  _importImage: (src: string, download: boolean) => Promise<string>;
  _openPopup: (
    x: number,
    y: number,
    pos: any,
    itemGroups: any
  ) => Promise<void>;
  _getSpellChecker: () => any;
  _ensureNoteCreated: () => Promise<void>;
  _save: (noteData: object, skipDateModifiedUpdate: boolean) => Promise<void>;
  _arrayBufferToBase64: (buffer: Buffer) => string;
  _dataURLtoBlob: (dataurl: string) => Blob | null;
  _getDataURL: (item: _ZoteroItem) => Promise<string>;
  _openQuickFormatDialog: (
    nodeID: number,
    citationData: any,
    filterLibraryIDs: any,
    openedEmpty: any
  ) => Promise<void>;
  getItemFromURIs: (uris: string[]) => Promise<_ZoteroItem>;
  createNoteFromAnnotations: (
    annotations: _ZoteroItem[],
    parentID: number
  ) => Promise<_ZoteroItem>;
  _iframeWindow: Window;
  _item: _ZoteroItem;
  _initPromise: Promise<any>;
  _viewMode: string;
  _reloaded: boolean;
  _readOnly: boolean;
  _filesReadOnly: boolean;
  _disableUI: boolean;
  _onReturn: Function;
  _popup: any;
  _state: any;
  _disableSaving: boolean;
  _subscriptions: [];
  _quickFormatWindow: any;
  _citationItemsList: any;
  _prefObserverIDs: any[];
}

declare interface _ZoteroEditorInstanceConstructable {
  new (): _ZoteroEditorInstance;
}

declare class _ZoteroEditorInstanceUtilities {
  serializeAnnotations: (
    annotations: object[],
    skipEmbeddingItemData: boolean
  ) => { html: string; citationItems: _ZoteroItem[] };
  _transformTextToHTML: (text: string) => string;
  _formatCitationItemPreview: (citationItem: _ZoteroItem) => string;
  formatCitation: (citation: object) => string;
}

// chrome/content/zotero/xpcom/data/notes.js

declare class _ZoteroNotes {
  [attr: string]: any;
  AUTO_SYNC_DELAY: number;
  MAX_TITLE_LENGTH: number;
  defaultNote: string;
  notePrefix: string;
  noteSuffix: string;
  _editorInstances: _ZoteroEditorInstance[];
  _downloadInProgressPromise: Promise<any>;
  registerEditorInstance: (instance: _ZoteroEditorInstance) => void;
  unregisterEditorInstance: (instance: _ZoteroEditorInstance) => Promise<void>;
  updateUser: (fromUserID: number, toUserID: number) => Promise<void>;
  replaceAllItemKeys: (
    item: _ZoteroItem,
    itemKeyMap: Map<string, string>
  ) => void;
  replaceItemKey: (
    item: _ZoteroItem,
    fromItemKey: string,
    toItemKey: string
  ) => void;
  getExportableNote: (item: _ZoteroItem) => Promise<string>;
  ensureEmbeddedImagesAreAvailable: (item: _ZoteroItem) => Promise<boolean>;
  copyEmbeddedImages: (fromItemKey: string, toItemKey: string) => Promise<void>;
  promptToIgnoreMissingImage: () => boolean;
  deleteUnusedEmbeddedImages: (item: _ZoteroItem) => Promise<void>;
  hasSchemaVersion: (note: _ZoteroItem) => boolean;
}

// chrome/content/zotero/zoteroPane.js

export const ZoteroPane: {
  [attr: string]: any;
  collectionsView: any;
  itemsView: {
    onSelect: {
      addListener: (Function) => any;
    };
  };
  progressWindow: any;
  canEdit: () => boolean;
  displayCannotEditLibraryMessage: () => void;
  getSelectedCollection: (arg: boolean) => _ZoteroCollection;
  getSelectedItems: () => Array<_ZoteroItem>;
};

// chrome/content/zotero/xpcom/reader.js

declare interface _ZoteroReaderState {
  pageIndex: number;
  scale: string;
  rotation: number;
  top: number;
  left: number;
  sidebarView: number;
  sidebarWidth: number;
  scrollMode: number;
  spreadMode: number;
}

declare interface _ZoteroReaderLocation {
  annotationKey: String;
  pageIndex: number;
}

declare class _ZoteroReaderInstance {
  [attr: string]: any;
  constructor();
  pdfStateFileName: string;
  annotationItemIDs: number[];
  itemID: number;
  state: _ZoteroReaderState;
  _instanceID: string;
  _window: Window;
  _iframeWindow: Window;
  _title: string;
  _isReaderInitialized: boolean;
  _showItemPaneToggle: boolean;
  _initPromise: Promise<any>;
  focus: () => void;
  open: (options: {
    itemID: number;
    state: _ZoteroReaderState;
    location: _ZoteroReaderLocation;
  }) => Promise<boolean>;
  updateTitle: () => void;
  setAnnotations: (items: _ZoteroItem[]) => void;
  unsetAnnotations(keys: number[] | string[]);
  navigate: (location: _ZoteroReaderLocation) => Promise<void>;
  enableAddToNote: (enable: boolean) => void;
  setSidebarWidth: (width: number) => void;
  setSidebarOpen: (open: boolean) => void;
  focusLastToolbarButton: () => void;
  tabToolbar: (reverse: any) => void;
  focusFirst: () => void;
  setBottomPlaceholderHeight: (height: number) => Promise<void>;
  setToolbarPlaceholderWidth: (height: number) => Promise<void>;
  isHandToolActive: () => boolean;
  isZoomAutoActive: () => boolean;
  isZoomPageWidthActive: () => boolean;
  isZoomPageHeightActive: () => boolean;
  allowNavigateFirstPage: () => boolean;
  allowNavigateLastPage: () => boolean;
  allowNavigateBack: () => boolean;
  allowNavigateForward: () => boolean;
  promptToTransferAnnotations: () => boolean;
  promptToDeletePages: (num: number) => boolean;
  reload: () => void;
  menuCmd: (
    cmd: "transferFromPDF" | "export" | "showInLibrary"
  ) => Promise<void>;
  _initIframeWindow: () => boolean;
  _setState: (state: _ZoteroReaderState) => Promise<void>;
  _getState: () => Promise<_ZoteroReaderState>;
  _isReadOnly: () => boolean;
  _dataURLtoBlob: (dataurl: string) => Blob;
  _getColorIcon: (color: string, selected: boolean) => string;
  _openTagsPopup: (item: _ZoteroItem, selector: string) => void;
  _openPagePopup: (data: any) => void;
  _openAnnotationPopup: (data: any) => void;
  _openColorPopup: (data: any) => void;
  _openThumbnailPopup: (data: any) => void;
  _openSelectorPopup: (data: any) => void;
  _postMessage: (message: object, transfer?: any) => Promise<void>;
  _handleMessage: (event: MessageEvent) => Promise<void>;
  _waitForReader: () => Promise<void>;
  _getAnnotation: (item: _ZoteroItem) => JSON | null;
}

declare class _ZoteroReaderTab extends _ZoteroReaderInstance {
  constructor(options: {
    itemID: number;
    title: string;
    sidebarWidth: number;
    sidebarOpen: boolean;
    bottomPlaceholderHeight: number;
    index: number;
    tabID: string;
    background: boolean;
  });
  close: () => void;
  _toggleNoteSidebar: (isToggled?: boolean) => void;
  _setTitleValue: (title: string) => void;
  _addToNote: (annotations: any) => void;
}

declare class _ZoteroReaderWindow extends _ZoteroReaderInstance {
  constructor(options: {
    sidebarWidth: number;
    sidebarOpen: boolean;
    bottomPlaceholderHeigh: number;
  });
  init: () => void;
  close: () => void;
  _setTitleValue: (title: string) => void;
  _handleKeyPress: (event: KeyboardEvent) => void;
  _onViewMenuOpen: () => void;
  _onGoMenuOpen: () => void;
}

declare class _ZoteroReader {
  [attr: string]: any;
  constructor();
  _readers: Array<_ZoteroReaderInstance>;
  _sidebarWidth: number;
  _sidebarOpen: boolean;
  _bottomPlaceholderHeight: number;
  _notifierID: string;
  onChangeSidebarWidth: (width: number) => void;
  onChangeSidebarOpen: (open: boolean) => void;
  getSidebarWidth: () => number;
  init: () => Promise<void>;
  _loadSidebarState: () => void;
  _setSidebarState: () => void;
  getSidebarOpen: () => boolean;
  setSidebarWidth: (width: number) => void;
  setSidebarOpen: (open: boolean) => void;
  setBottomPlaceholderHeight: (height: number) => void;
  notify: (event, type, ids, extraData) => void;
  getByTabID: (tabID: string) => _ZoteroReaderInstance;
  getWindowStates: () => { type: "reader"; itemID: number; title: string }[];
  openURI: (
    itemURI: string,
    location: _ZoteroReaderLocation,
    options: any
  ) => Promise<void>;
  open: (
    itemID: number,
    location: _ZoteroReaderLocation,
    options?: {
      title?: string;
      tabIndex?: number;
      tabID?: string;
      openInBackground?: boolean;
      openInWindow?: boolean;
      allowDuplicate?: boolean;
    }
  ) => Promise<void>;
  triggerAnnotationsImportCheck: (itemID: number) => Promise<void>;
}

// chrome/content/zotero/tabs.js

declare interface TabInstance {
  id: string;
  type: string;
  title: string;
  data?: any;
  selected?: boolean;
}

export const Zotero_Tabs: {
  selectedID: string;
  selectedType: string;
  selectedIndex: number;
  deck: Element;
  _tabs: TabInstance[];

  _getTab: (tabId: string) => { tab: TabInstance; tabIndex: number };
  _update: () => void;
  getTabIDByItemID: (itemID: number) => string;
  init: () => void;
  getState: () => TabInstance[];
  restoreState: (tabs: TabInstance[]) => void;
  add: (options: {
    id: string;
    type: string;
    data: any;
    title: string;
    index: number;
    select: boolean;
    onClose: Function;
  }) => { id: string; container: XUL.Element };
  rename: (id: string, title: string) => void;
  updateLibraryTabIcon: () => void;
  close: (ids: string | string[]) => void;
  closeAll: () => void;
  undoClose: () => void;
  move: (id: string, newIndex: number) => void;
  select: (id: string, reopening: boolean, options?: any) => void;
  unload: (id: string) => void;
  unloadUnusedTabs: () => void;
  selectPrev: () => void;
  selectNext: () => void;
  selectLast: () => void;
  jump: (index: number) => void;
  _openMenu: (x: number, y: number, id: string) => void;
  _updateTabBar: () => void;
  _showTabBar: () => void;
  _hideTabBar: () => void;
};

export namespace XUL {
  class Element extends HTMLElement {
    public disabled?: boolean;
    public value?: string;
    public width?: number;
    public height?: number;
  }

  class Label extends Element {
    public value: string;
  }

  class Textbox extends XUL.Element {
    public value?: string;
    public readonly?: boolean;
  }

  class Checkbox extends XUL.Element {
    public checked?: boolean;
  }

  class Menuitem extends XUL.Element {
    public value: string;
    public label: string;
  }

  class ProgressMeter extends XUL.Element {}

  class Menupopup extends XUL.Element {}

  class Menulist extends XUL.Element {
    public selectedItem?: Menuitem;
    public value?: string;
    public itemCount?: number;
    public selectedIndex?: number;
    public getItemAtIndex?: (i: number) => XUL.Menuitem;
  }

  class ItemElement extends XUL.Element {
    public item?: _ZoteroItem;
  }

  class Box extends XUL.Element {
    public maxHeight?: number;
    public minHeight?: number;
    public maxWidth?: number;
    public minWidth?: number;
  }

  class Button extends XUL.Element {
    public checked?: boolean;
    public type?: string;
    public tooltiptext?: string;
  }
}

declare class ClassList {
  public add(classname: string): void;
  public remove(classname: string): void;
  public contains(classname: string): boolean;
}

export class XULEvent extends Event {
  public target: XUL.Element;
}
