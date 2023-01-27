/// <reference path="../zotero.d.ts" />
// chrome/content/zotero/xpcom/reader.js

declare namespace _ZoteroTypes {
  namespace Reader {
    interface State {
      pageIndex: number;
      scale: number;
      // rotation?: number;
      top: number;
      left: number;
      // sidebarView?: number;
      // sidebarWidth?: number;
      scrollMode: number;
      spreadMode: number;
    }
    interface SecondViewState {
      splitSize: string;
      splitType: string;
      pageIndex: number;
      scale: number;
      top: number;
      left: number;
    }

    interface Location {
      annotationKey?: string;
      id?: string;
      pageIndex: number;
      pageLabel?: string;
      position: { rects: unknown; paths: unknown };
    }

    interface OpenOptions {
      title?: string;
      tabIndex?: number;
      tabID?: string;
      openInBackground?: boolean;
      openInWindow?: boolean;
      allowDuplicate?: boolean;
    }
  }

  class ReaderInstance {
    [attr: string]: any;
    pdfStateFileName: string;
    annotationItemIDs: number[];
    itemID: number;
    state: Reader.State;
    _instanceID: string;
    _window: Window;
    _iframeWindow: Window;
    _title: string;
    _isReaderInitialized: boolean;
    _showItemPaneToggle: boolean;
    _initPromise: Promise<any>;
    focus(): void;
    getSecondViewState(): Reader.SecondViewState | undefined;
    migrateMendeleyColors(
      libraryID: number,
      annotations: Array<{ id: string; color: string }>
    ): Promise<boolean>;
    open(options: {
      itemID: number;
      state: Reader.State;
      location?: Reader.Location;
      secondViewState?: Reader.SecondViewState;
    }): Promise<boolean>;
    uninit(): void;
    updateTitle(): void;
    setAnnotations(items: Zotero.Item[]): void;
    unsetAnnotations(keys: readonly number[] | string[]): void;
    navigate(location: Reader.Location): Promise<void>;
    enableAddToNote(enable: boolean): void;
    setSidebarWidth(width: number): void;
    setSidebarOpen(open: boolean): void;
    focusLastToolbarButton(): void;
    tabToolbar(reverse: boolean): void;
    focusFirst(): void;
    setBottomPlaceholderHeight(height: number): Promise<void>;
    setToolbarPlaceholderWidth(height: number): Promise<void>;
    isHandToolActive(): boolean;
    isZoomAutoActive(): boolean;
    isZoomPageWidthActive(): boolean;
    isZoomPageHeightActive(): boolean;
    isSplitVerticallyActive(): boolean;
    isSplitHorizontallyActive(): boolean;
    allowNavigateFirstPage(): boolean;
    allowNavigateLastPage(): boolean;
    allowNavigateBack(): boolean;
    allowNavigateForward(): boolean;
    promptToTransferAnnotations(): boolean;
    promptToDeletePages(num: number): boolean;
    reload(data: { rotatedPageIndexes: number[] }): Promise<void>;
    menuCmd(
      cmd:
        | "transferFromPDF"
        | "export"
        | "showInLibrary"
        | "rotateLeft"
        | "rotateRight"
        | "rotate180"
        | "splitVertically"
        | "splitHorizontally"
    ): Promise<void>;
    _initIframeWindow(): boolean;
    _setState(state: Reader.State): Promise<void>;
    _getState(): Promise<Reader.State | null>;
    _isReadOnly(): boolean;
    _dataURLtoBlob(dataurl: string): Blob;
    _getColorIcon(color: string, selected: boolean): string;
    _rotateCurrentPage(degrees: number): Promise<void>;
    _splitVertically(): void;
    _splitHorizontally(): void;
    _openTagsPopup(item: Zotero.Item, selector: string): void;
    _openPagePopup(data: unknown, secondView?: boolean): void;
    _openAnnotationPopup(data: unknown): void;
    _openColorPopup(data: unknown): void;
    _openThumbnailPopup(data: unknown): void;
    _openSelectorPopup(data: unknown): void;
    _postMessage(
      message: object,
      transfer?: unknown[],
      secondView?: boolean
    ): Promise<void>;
    _handleMessage(event: MessageEvent): Promise<void>;
    _updateSecondViewState(): void;
    _waitForReader(): Promise<void>;

    /**
     * Return item JSON in the pdf-reader ready format
     *
     * @param {Zotero.Item} item
     * @returns {Object|null}
     */
    _getAnnotation(item: Zotero.Item): _ZoteroTypes.anyObj | null;
  }

  class ReaderTab extends ReaderInstance {
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
    close(): void;
    _toggleNoteSidebar(isToggled?: boolean): void;
    _setTitleValue(title: string): void;
    _addToNote(annotations: unknown): void;
  }

  class ReaderWindow extends ReaderInstance {
    constructor(options: {
      sidebarWidth: number;
      sidebarOpen: boolean;
      bottomPlaceholderHeigh?: number;
    });
    init(): void;
    close(): void;
    _setTitleValue(title: string): void;
    _handleKeyPress(event: KeyboardEvent): void;
    _onViewMenuOpen(): void;
    _onGoMenuOpen(): void;
  }
  class Reader {
    [attr: string]: any;
    constructor();
    _readers: _ZoteroTypes.ReaderInstance[];
    _sidebarWidth: number;
    _sidebarOpen: boolean;
    _bottomPlaceholderHeight: number;
    _notifierID: string;
    onChangeSidebarWidth(width: number): void;
    onChangeSidebarOpen(open: boolean): void;
    getSidebarWidth(): number;
    init(): Promise<void>;
    _loadSidebarState(): void;
    _setSidebarState(): void;
    getSidebarOpen(): boolean;
    setSidebarWidth(width: number): void;
    setSidebarOpen(open: boolean): void;
    setBottomPlaceholderHeight(height: number): void;
    notify: _ZoteroTypes.Notifier.Notify;
    getByTabID(tabID: string): _ZoteroTypes.ReaderInstance;
    getWindowStates(): {
      type: "reader";
      itemID: number;
      title: string;
      secondViewState: Reader.SecondViewState;
    }[];
    openURI: (
      itemURI: _ZoteroTypes.ZoteroObjectURI,
      location?: _ZoteroTypes.Reader.Location,
      options?: Reader.OpenOptions
    ) => Promise<void>;
    open: (
      itemID: number,
      location?: _ZoteroTypes.Reader.Location,
      options?: Reader.OpenOptions
    ) => Promise<void>;

    /**
     * Trigger annotations import
     *
     * @param {Integer} itemID Attachment item id
     * @returns {Promise}
     */
    triggerAnnotationsImportCheck(itemID: number): Promise<void>;
  }
}
