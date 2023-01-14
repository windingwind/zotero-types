/// <reference path="../zotero.d.ts" />
// chrome/content/zotero/xpcom/reader.js

declare namespace _ZoteroTypes {
  interface ReaderState {
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

  interface ReaderLocation {
    annotationKey?: string;
    id?: string;
    pageIndex: number;
    pageLabel?: string;
    position: { rects: any, paths: any };
  }

  class ReaderInstance {
    [attr: string]: any;
    pdfStateFileName: string;
    annotationItemIDs: number[];
    itemID: number;
    state: ReaderState;
    _instanceID: string;
    _window: Window;
    _iframeWindow: Window;
    _title: string;
    _isReaderInitialized: boolean;
    _showItemPaneToggle: boolean;
    _initPromise: Promise<any>;
    focus(): void;
    open: (options: {
      itemID: number;
      state: ReaderState;
      location: ReaderLocation;
    }) => Promise<boolean>;
    updateTitle(): void;
    setAnnotations(items: Zotero.Item[]): void;
    unsetAnnotations(keys: number[] | string[]): void;
    navigate(location: ReaderLocation): Promise<void>;
    enableAddToNote(enable: boolean): void;
    setSidebarWidth(width: number): void;
    setSidebarOpen(open: boolean): void;
    focusLastToolbarButton(): void;
    tabToolbar(reverse: any): void;
    focusFirst(): void;
    setBottomPlaceholderHeight(height: number): Promise<void>;
    setToolbarPlaceholderWidth(height: number): Promise<void>;
    isHandToolActive(): boolean;
    isZoomAutoActive(): boolean;
    isZoomPageWidthActive(): boolean;
    isZoomPageHeightActive(): boolean;
    allowNavigateFirstPage(): boolean;
    allowNavigateLastPage(): boolean;
    allowNavigateBack(): boolean;
    allowNavigateForward(): boolean;
    promptToTransferAnnotations(): boolean;
    promptToDeletePages(num: number): boolean;
    reload(): void;
    menuCmd(cmd: "transferFromPDF" | "" | "showInLibrary"): Promise<void>;
    _initIframeWindow(): boolean;
    _setState(state: ReaderState): Promise<void>;
    _getState(): Promise<ReaderState>;
    _isReadOnly(): boolean;
    _dataURLtoBlob(dataurl: string): Blob;
    _getColorIcon(color: string, selected: boolean): string;
    _openTagsPopup(item: Zotero.Item, selector: string): void;
    _openPagePopup(data: any): void;
    _openAnnotationPopup(data: any): void;
    _openColorPopup(data: any): void;
    _openThumbnailPopup(data: any): void;
    _openSelectorPopup(data: any): void;
    _postMessage(message: object, transfer?: any): Promise<void>;
    _handleMessage(event: MessageEvent): Promise<void>;
    _waitForReader(): Promise<void>;
    _getAnnotation(item: Zotero.Item): JSON | null;
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
    _addToNote(annotations: any): void;
  }

  class ReaderWindow extends ReaderInstance {
    constructor(options: {
      sidebarWidth: number;
      sidebarOpen: boolean;
      bottomPlaceholderHeigh: number;
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
    notify(event: Notifier.Event, type: Notifier.Type, ids: string[], extraData: anyObj): void;
    getByTabID(tabID: string): _ZoteroTypes.ReaderInstance;
    getWindowStates(): { type: "reader"; itemID: number; title: string }[];
    openURI: (
      itemURI: string,
      location: _ZoteroTypes.ReaderLocation,
      options: any
    ) => Promise<void>;
    open: (
      itemID: number,
      location: _ZoteroTypes.ReaderLocation,
      options?: {
        title?: string;
        tabIndex?: number;
        tabID?: string;
        openInBackground?: boolean;
        openInWindow?: boolean;
        allowDuplicate?: boolean;
      }
    ) => Promise<void>;
    triggerAnnotationsImportCheck(itemID: number): Promise<void>;
  }
}