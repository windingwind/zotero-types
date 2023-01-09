/// <reference path="../zotero.d.ts" />

declare namespace Zotero {
  // chrome/content/zotero/xpcom/editorInstance.js
  interface EditorInstance {
    [attr: string]: any;
    new(): this;
    init: (options: {
      onNavigate?: Function;
      item?: Zotero.Item;
      reloaded?: boolean;
      viewMode?: string;
      readOnly?: boolean;
      disableUI?: boolean;
      onReturn?: Function;
      iframeWindow?: Window;
      popup?: any;
      state?: any;
      placeholder?: any;
    }) => globalThis.Promise<void>;
    uninit(): globalThis.Promise<void>;
    focus(): void;
    notify(event, type, ids, extraData): globalThis.Promise<void>;
    saveSync(): void;
    insertAnnotations(annotations: any): globalThis.Promise<void>;
    _postMessage(message: any): void;
    _isReadOnly(): boolean;
    _getFont(): { fontSize: number; fontFamily: string };
    _handleFontChange(): void;
    _handleStyleChange(): void;
    _handleSpellCheckChange(): void;
    _showInLibrary(ids: number | number[]): void;
    importImages(annotations: any): globalThis.Promise<void>;
    _digestItems(ids: number[]): string | null;
    _messageHandler(e: MessageEvent): globalThis.Promise<void>;
    _updateCitationItems(citationItemsList: object[]): globalThis.Promise<void>;
    _feedSubscription(subscription: object): globalThis.Promise<void>;
    _importImage(src: string, download: boolean): globalThis.Promise<string>;
    _openPopup: (
      x: number,
      y: number,
      pos: any,
      itemGroups: any
    ) => globalThis.Promise<void>;
    _getSpellChecker(): any;
    _ensureNoteCreated(): globalThis.Promise<void>;
    _save(noteData: object, skipDateModifiedUpdate: boolean): globalThis.Promise<void>;
    _arrayBufferToBase64: (buffer: BufferSource) => string;
    _dataURLtoBlob(dataurl: string): Blob | null;
    _getDataURL(item: Zotero.Item): globalThis.Promise<string>;
    _openQuickFormatDialog: (
      nodeID: number,
      citationData: any,
      filterLibraryIDs: any,
      openedEmpty: any
    ) => globalThis.Promise<void>;
    getItemFromURIs(uris: string[]): globalThis.Promise<Zotero.Item>;
    createNoteFromAnnotations: (
      annotations: Zotero.Item[],
      parentID: number
    ) => globalThis.Promise<Zotero.Item>;
    _iframeWindow: Window;
    _item: Zotero.Item;
    _initPromise: globalThis.Promise<any>;
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
}

declare namespace _ZoteroTypes {
  interface EditorInstanceUtilities {
    serializeAnnotations: (
      annotations: object[],
      skipEmbeddingItemData?: boolean
    ) => { html: string; citationItems: Zotero.Item[] };
    _transformTextToHTML(text: string): string;
    _formatCitationItemPreview(citationItem: Zotero.Item): string;
    formatCitation(citation: object): string;
  }
}
