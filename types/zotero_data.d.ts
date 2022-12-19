// chrome/content/zotero/xpcom/data/dataObject.js

declare class _ZoteroDataObject {
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

// chrome/content/zotero/xpcom/data/item.js
// TODO: complete this part

declare class _ZoteroItem extends _ZoteroDataObject {
  isRegularItem: () => boolean;
  isAttachment: () => boolean;
  isAnnotation: () => boolean;
  isPDFAttachment: () => boolean;
  isEmbeddedImageAttachment: () => boolean;
  getTags: () => { tag: string; type: number }[];
  addTag: (name: string, type: number) => boolean;
  removeTag: (tag: string) => boolean;
  // Only regular item
  addToCollection: (id: number) => void;
  getNotes: () => number[];
  getCollections: () => number[];
  getAttachments: () => number[];
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
  getFilePath: () => string;
  getFilePathAsync: () => Promise<string>;
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
  attachmentContentType: string;
  dateModified: string;
}

// chrome/content/zotero/xpcom/data/items.js

declare class _ZoteroItems {
  [attr: string]: any;
  get(ids: number | string): _ZoteroItem;
  get(ids: number[] | string[]): _ZoteroItem[];
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

declare class _ZoteroCollection extends _ZoteroDataObject {
  name: string;
  version: number;
  synced: boolean;
  treeViewID: string;
  treeViewImage: string;
  getName: () => string;
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
  getLoaded: () => _ZoteroCollection[];
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
