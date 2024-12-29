/// <reference path="../zotero.d.ts" />

declare namespace Zotero {
  // chrome/content/zotero/xpcom/editorInstance.js
  interface EditorInstance {
    [attr: string]: any;
    new (): this;
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
    }) => Promise<void>;
    uninit(): Promise<void>;
    focus(): void;
    notify: _ZoteroTypes.Notifier.Notify;
    saveSync(): void;
    insertAnnotations(annotations: any): Promise<void>;
    _postMessage(message: any): void;
    _isReadOnly(): boolean;
    _getFont(): { fontSize: number; fontFamily: string };
    _handleFontChange(): void;
    _handleStyleChange(): void;
    _handleSpellCheckChange(): void;
    _showInLibrary(ids: number | number[]): void;
    importImages(annotations: any): Promise<void>;
    _digestItems(ids: number[]): string | null;
    _messageHandler(e: MessageEvent): Promise<void>;
    _updateCitationItems(citationItemsList: object[]): Promise<void>;
    _feedSubscription(subscription: object): Promise<void>;
    _importImage(src: string, download: boolean): Promise<string>;
    _openPopup: (
      x: number,
      y: number,
      pos: any,
      itemGroups: any,
    ) => Promise<void>;
    _getSpellChecker(): any;
    _ensureNoteCreated(): Promise<void>;
    _save(noteData: object, skipDateModifiedUpdate: boolean): Promise<void>;
    _arrayBufferToBase64: (buffer: BufferSource) => string;
    _dataURLtoBlob(dataurl: string): Blob | null;
    _getDataURL(item: Zotero.Item): Promise<string>;
    _openQuickFormatDialog: (
      nodeID: number,
      citationData: any,
      filterLibraryIDs: any,
      openedEmpty: any,
    ) => Promise<void>;
    getItemFromURIs(uris: string[]): Promise<Zotero.Item>;
    createNoteFromAnnotations: (
      annotations: Zotero.Item[],
      parentID: number,
    ) => Promise<Zotero.Item>;
    _iframeWindow: Window;
    _item: Zotero.Item;
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

  const EditorInstanceUtilities: _ZoteroTypes.EditorInstanceUtilities;
}

declare namespace _ZoteroTypes {
  interface EditorInstanceUtilities {
    serializeAnnotations: (
      annotations: object[],
      skipEmbeddingItemData?: boolean,
    ) => { html: string; citationItems: Zotero.Item[] };
    _transformTextToHTML(text: string): string;
    _formatCitationItemPreview(citationItem: Zotero.Item): string;
    formatCitation(citation: object): string;
  }
}
