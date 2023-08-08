/// <reference path="../zotero.d.ts" />
// chrome/content/zotero/xpcom/reader.js

declare namespace _ZoteroTypes {
  namespace Reader {
    interface State {
      pageIndex: number;
      scale: number | "auto" | "page-width" | "page-fit";
      top: number;
      left: number;
      scrollMode: number;
      spreadMode: 0 | 1 | 2;
    }

    interface Stats {
      canCopy: number;
      pagesCount: number;
      scrollMode: number;
      spreadMode: number;
      pageIndex: number;
      pageLabel: string;
      canNavigateBack: boolean;
      canNavigateForward: boolean;
      canNavigateToFirstPage: boolean;
      canNavigateToLastPage: boolean;
      canNavigateToNextPage: boolean;
      canNavigateToPreviousPage: boolean;
      canZoomIn: boolean;
      canZoomOut: boolean;
      canZoomReset: boolean;
      zoomAutoEnabled: boolean;
      zoomPageHeightEnabled: boolean;
      zoomPageWidthEnabled: boolean;
    }

    interface FindState {
      popupOpen: boolean;
      active: boolean;
      highlightAll: boolean;
      caseSensitive: boolean;
      entireWord: boolean;
      query: string;
      result?: unknown;
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

    interface SnapshotView { }
    interface PDFView { }
    interface EPUBView { }

    interface InternalReaderTools {
      pointer: {
        type: 'pointer'
      },
      hand: {
        type: 'hand'
      },
      highlight: {
        type: 'highlight',
        color: string,
      },
      underline: {
        type: 'underline',
        color: string,
      },
      note: {
        type: 'note',
        color: string,
      },
      image: {
        type: 'image',
        color: string,
      },
      text: {
        type: 'text',
        color: string,
      },
      ink: {
        type: 'ink',
        color: string,
        size: number
      },
      eraser: {
        type: 'eraser',
        size: number
      }
    }

    interface InternalReaderOutline {
      expanded: boolean;
      title: string;
      location: { href: string };
      items: Array<InternalReaderOutline>
    }

    interface InternalReader {
      _type: 'pdf' | 'epub';
      _platform: 'zotero';
      _readerRef: React.RefObject<anyObj>;
      _primaryView, _secondaryView: PDFView | EPUBView | SnapshotView;
      _lastViewPrimary: boolean;
      _splitViewContainer, _primaryViewContainer, _secondaryViewContainer, _portalViewContainer: HTMLDivElement;
      _lastPortalRect: [number, number, number, number];
      _enableAnnotationDeletionFromComment: boolean;
      _annotationSelectionTriggeredFromView: boolean;
      _tools: InternalReaderTools;
      _state: {
        splitType?: 'horizontal' | 'vertical',
        splitSize?: string,
        primary: boolean,
        freeze: boolean,
        errorMessages: string,
        annotations: anyObj[],
        selectedAnnotationIDs: string[],
        filter: {
          query: string,
          colors: string[],
          tags: string[],
          authors: string[]
        },
        readOnly: boolean,
        authorName: string,
        fontSize: number,
        fontFamily: string,
        showAnnotations: boolean,
        tool: InternalReaderTools[keyof InternalReaderTools],
        thumbnails: [],
        outline: Array<InternalReaderOutline>,
        pageLabels: anyObj,
        sidebarOpen: boolean,
        sidebarWidth: number,
        sidebarView: 'annotations' | 'outline' | 'thumbnails',
        bottomPlaceholderHeight: number,
        toolbarPlaceholderWidth: number,
        enableAddToNote: boolean,
        primaryViewState: State,
        primaryViewStats: Stats,
        primaryViewFindState: FindState,
        secondaryViewState: State,
        secondaryViewStats: Stats,
        secondaryViewFindState: FindState,
      };
      _focusManager: anyObj;
      _keyboardManager: anyObj;
      _annotationManager: anyObj;

      readonly _lastView: PDFView | EPUBView | SnapshotView;
      readonly splitType: 'horizontal' | 'vertical';
      readonly toolType: keyof InternalReaderTools;
      readonly zoomAutoEnabled: boolean;
      readonly zoomPageHeightEnabled: boolean;
      readonly zoomPageWidthEnabled: boolean;
      readonly canCopy: boolean;
      readonly canNavigateBack: boolean;
      readonly canNavigateForward: boolean;
      readonly canNavigateToFirstPage: boolean;
      readonly canNavigateToLastPage: boolean;
      readonly canNavigateToNextPage: boolean;
      readonly canNavigateToPreviousPage: boolean;
      readonly canZoomIn: boolean;
      readonly canZoomOut: boolean;
      readonly canZoomReset: boolean;
      readonly canNavigateToPreviousSection: boolean;
      readonly canNavigateToNextSection: boolean;
      flowMode: 'paginated' | 'scrolled';
      scrollMode: number;
      spreadMode: number;

      disableSplitView(): void;
      toggleHorizontalSplit(enable: boolean): void;
      toggleVerticalSplit(enable: boolean): void;
      showAnnotations(enable: boolean): void;
      setReadOnly(enable: boolean): void;
      toggleHandTool(enable: boolean): void;
      enableAddToNote(enable: boolean): void;
      closeContextMenu(): void;
      findNext(primary: boolean): void;
      findPrevious(primary: boolean): void;
      toggleFindPopup({ primary, open }?: { primary: boolean, open: boolean }): void;
      _getString(name: string): string;
      setErrorMessage(errorMessage: string): void;
      copy(): void;
      zoomIn(): void;
      zoomOut(): void;
      zoomReset(): void;
      zoomAuto(): void;
      zoomPageWidth(): void;
      zoomPageHeight(): void;
      navigateBack(): void;
      navigateForward(): void;
      navigateToFirstPage(): void;
      navigateToLastPage(): void;
      navigateToNextPage(): void;
      navigateToPreviousPage(): void;
      navigateToNextSection(): void;
      navigateToPreviousSection(): void;
      setFontSize(fontSize: number): void;
      setFontFamily(fontFamily: string): void;
      toggleSidebar(open: boolean): void;
      setSidebarWidth(width: number): void;
      setSplitViewSize(size: string): void;
      setBottomPlaceholderHeight(height: number): void;
      setToolbarPlaceholderWidth(width: number): void;
      focusView(primary?: boolean): void;
      focus(): void;
      freeze(): void;
      unfreeze(): void;
      print(): void;
      abortPrint(): void;
      rotatePageLeft(): void;
      rotatePageRight(): void;
      rotatePages(pageIndexes: number[], degrees: number): void;
      deletePages(pageIndexes: number[], degrees: number): void;
    }
  }

  interface ReaderInstance extends Reader.InternalReader {
    pdfStateFileName: string;
    annotationItemIDs: number[];
    itemID?: number;
    state: Reader.State;
    _instanceID: string;
    _window?: Window;
    _iframeWindow?: Window;
    _title: string;
    _isReaderInitialized: boolean;
    _showItemPaneToggle: boolean;
    _initPromise: Promise<any>;
    _internalReader: Reader.InternalReader;
    _item: Zotero.Item;
    _bottomPlaceholderHeight: number;
    _sidebarOpen: boolean;
    _sidebarWidth: number;
    _tabContainer: XUL.Box;
    _type: 'pdf' | 'epub';
    stateFileName: string;
    tabID: string;
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

  interface ReaderTab extends ReaderInstance {
    new(options: {
      itemID: number;
      title: string;
      sidebarWidth: number;
      sidebarOpen: boolean;
      bottomPlaceholderHeight: number;
      index: number;
      tabID: string;
      background: boolean;
    }): this;
    close(): void;
    _toggleNoteSidebar(isToggled?: boolean): void;
    _setTitleValue(title: string): void;
    _addToNote(annotations: unknown): void;
  }

  interface ReaderWindow extends ReaderInstance {
    new(options: {
      sidebarWidth: number;
      sidebarOpen: boolean;
      bottomPlaceholderHeigh?: number;
    }): this;
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
    ) => Promise<void | ReaderInstance>;
    open: (
      itemID: number,
      location?: _ZoteroTypes.Reader.Location,
      options?: Reader.OpenOptions
    ) => Promise<void | ReaderInstance>;

    /**
     * Trigger annotations import
     *
     * @param {Integer} itemID Attachment item id
     * @returns {Promise}
     */
    triggerAnnotationsImportCheck(itemID: number): Promise<void>;
  }
}
