/// <reference path="../zotero.d.ts" />
/// <reference path="../reader/common/reader.d.ts" />

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
      pageIndex?: number;
      pageLabel?: string;
      position?: {
        pageIndex?: number;
        rects?: Array<number[]>;
        paths?: unknown;
      };
    }

    interface OpenOptions {
      title?: string;
      tabIndex?: number;
      tabID?: string;
      openInBackground?: boolean;
      openInWindow?: boolean;
      allowDuplicate?: boolean;
    }

    /**
     * @deprecated Use `EventHandler` instead.
     * @see EventHandler
     */
    type ReaderEventHandler<
      ParamsType = {},
      AppendType = () => void,
      EventType = "",
    > = (event: {
      reader: _ZoteroTypes.ReaderInstance;
      doc: Document;
      params: ParamsType;
      append: AppendType;
      type: EventType;
    }) => void | Promise<void>;
    type _EventKey = keyof _ZoteroTypes.Reader.ReaderEventMap; // internal type
    type EventParams<T extends _EventKey> = {
      reader: ReaderInstance;
      doc: Document;
      params: _ZoteroTypes.Reader.ReaderEventMap[T];
      append: _ZoteroTypes.Reader.ReaderAppendMap[T];
      type: T;
    };
    type EventHandler<T extends _EventKey> = (
      event: EventParams<T>,
    ) => void | Promise<void>;

    interface ReaderEventMap {
      renderTextSelectionPopup: {
        annotation: _ZoteroTypes.Annotations.AnnotationJson;
      };
      renderSidebarAnnotationHeader: {
        annotation: _ZoteroTypes.Annotations.AnnotationJson;
      };
      renderToolbar: {};
      createColorContextMenu: { x: number; y: number };
      createViewContextMenu: { x: number; y: number };
      createAnnotationContextMenu: {
        ids: string[];
        currentID: string;
        x: number;
        y: number;
      };
      createThumbnailContextMenu: {
        x: number;
        y: number;
        pageIndexes: number[];
      };
      createSelectorContextMenu: { x: number; y: number };
    }

    interface ReaderAppendType {
      appendDOM: (...node: Array<Node | string>) => void;
      appendMenu: (params: {
        slider?: boolean;
        size?: number;
        label: string;
        disabled?: boolean;
        persistent?: boolean;
        onCommand: (width?: number) => void;
      }) => void;
    }

    interface ReaderAppendMap {
      renderTextSelectionPopup: ReaderAppendType["appendDOM"];
      renderSidebarAnnotationHeader: ReaderAppendType["appendDOM"];
      renderToolbar: ReaderAppendType["appendDOM"];
      createColorContextMenu: ReaderAppendType["appendMenu"];
      createViewContextMenu: ReaderAppendType["appendMenu"];
      createAnnotationContextMenu: ReaderAppendType["appendMenu"];
      createThumbnailContextMenu: ReaderAppendType["appendMenu"];
      createSelectorContextMenu: ReaderAppendType["appendMenu"];
    }
  }

  interface ReaderInstance<
    T extends keyof Reader.ViewTypeMap = "pdf" | "epub" | "snapshot",
  > extends Reader.InternalReader<T> {
    pdfStateFileName: string;
    annotationItemIDs: number[];
    itemID?: number;
    state: Reader.State;
    _instanceID: string;
    _window?: Window;
    _iframe?: XUL.Element & _ZoteroTypes.anyObj;
    _iframeWindow?: Window;
    _title: string;
    _isReaderInitialized: boolean;
    _showItemPaneToggle: boolean;
    _initPromise: Promise<any>;
    _internalReader: Reader.InternalReader<T>;
    _item: Zotero.Item;
    _bottomPlaceholderHeight: number;
    _sidebarOpen: boolean;
    _sidebarWidth: number;
    _tabContainer: XUL.Box;
    readonly type: T;
    stateFileName: string;
    tabID: string;
    focus(): void;
    getSecondViewState(): Reader.SecondViewState | undefined;
    migrateMendeleyColors(
      libraryID: number,
      annotations: Array<{ id: string; color: string }>,
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
        | "splitHorizontally",
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
      secondView?: boolean,
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
    new (options: {
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
    new (options: {
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
      options?: Reader.OpenOptions,
    ) => Promise<void | ReaderInstance>;
    open: (
      itemID: number,
      location?: _ZoteroTypes.Reader.Location,
      options?: Reader.OpenOptions,
    ) => Promise<void | ReaderInstance>;

    /**
     * Trigger annotations import
     *
     * @param {Integer} itemID Attachment item id
     * @returns {Promise}
     */
    triggerAnnotationsImportCheck(itemID: number): Promise<void>;

    /**
     * Inject DOM nodes to reader UI parts:
     * - renderTextSelectionPopup
     * - renderSidebarAnnotationHeader
     * - renderToolbar
     *
     * Zotero.Reader.registerEventListener('renderTextSelectionPopup', (event) => {
     * 	let { reader, doc, params, append } = event;
     * 	let container = doc.createElement('div');
     * 	container.append('Loading…');
     * 	append(container);
     * 	setTimeout(() => container.replaceChildren('Translated text: ' + params.annotation.text), 1000);
     * });
     *
     *
     * Add options to context menus:
     * - createColorContextMenu
     * - createViewContextMenu
     * - createAnnotationContextMenu
     * - createThumbnailContextMenu
     * - createSelectorContextMenu
     *
     * Zotero.Reader.registerEventListener('createAnnotationContextMenu', (event) => {
     * 	let { reader, params, append } = event;
     * 	append({
     * 		label: 'Test',
     * 		onCommand(){ reader._iframeWindow.alert('Selected annotations: ' + params.ids.join(', ')); }
     * 	});
     * });
     */
    registerEventListener<T extends Reader._EventKey>(
      type: T,
      handler: Reader.EventHandler<T>,
      pluginID?: string,
    ): void;

    unregisterEventListener<T extends Reader._EventKey>(
      type: T,
      handler: Reader.EventHandler<T>,
    ): void;
  }
}

declare namespace Zotero {
  const Reader: _ZoteroTypes.Reader;
}
