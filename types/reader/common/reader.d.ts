/// <reference path="types.d.ts" />
/// <reference path="../pdf/pdf-view.d.ts" />
/// <reference path="../dom/epub/epub-view.d.ts" />
/// <reference path="../dom/snapshot/snapshot-view.d.ts" />
/// <reference path="annotation-manager.d.ts" />
/// <reference path="../../xpcom/reader.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    interface Filter {
      query: string;
      colors: string[];
      tags: string[];
      authors: string[];
    }
    interface InternalReaderTools {
      pointer: {
        type: "pointer";
      };
      hand: {
        type: "hand";
      };
      highlight: {
        type: "highlight";
        color: string;
      };
      underline: {
        type: "underline";
        color: string;
      };
      note: {
        type: "note";
        color: string;
      };
      image: {
        type: "image";
        color: string;
      };
      text: {
        type: "text";
        color: string;
      };
      ink: {
        type: "ink";
        color: string;
        size: number;
      };
      eraser: {
        type: "eraser";
        size: number;
      };
    }
    interface ViewTypeMap {
      pdf: PDFView;
      epub: EPUBView;
      snapshot: SnapshotView;
    }

    interface InternalReader<T extends keyof ViewTypeMap> {
      _type: T;
      _platform: "zotero";
      _readerRef: React.RefObject<anyObj>;
      _primaryView: ViewTypeMap[T];
      _secondaryView?: ViewTypeMap[T];
      _lastViewPrimary: boolean;
      _splitViewContainer: HTMLDivElement;
      _primaryViewContainer: HTMLDivElement;
      _secondaryViewContainer: HTMLDivElement;
      _portalViewContainer: HTMLDivElement;
      _lastPortalRect: [number, number, number, number];
      _enableAnnotationDeletionFromComment: boolean;
      _annotationSelectionTriggeredFromView: boolean;
      _tools: InternalReaderTools;
      _state: {
        splitType?: "horizontal" | "vertical";
        splitSize?: string;
        primary: boolean;
        freeze: boolean;
        errorMessages: string;
        annotations: Reader.Annotation[];
        selectedAnnotationIDs: string[];
        filter: Filter;
        readOnly: boolean;
        authorName: string;
        fontSize: number;
        fontFamily: string;
        showAnnotations: boolean;
        tool: InternalReaderTools[keyof InternalReaderTools];
        thumbnails: [];
        outline: Array<OutlineItem>;
        pageLabels: anyObj;
        sidebarOpen: boolean;
        sidebarWidth: number;
        sidebarView: "annotations" | "outline" | "thumbnails";
        bottomPlaceholderHeight: number;
        toolbarPlaceholderWidth: number;
        enableAddToNote: boolean;
        primaryViewState: State | DOMViewState;
        primaryViewStats: ViewStats;
        primaryViewFindState: FindState;
        secondaryViewState: State | DOMViewState;
        secondaryViewStats: ViewStats;
        secondaryViewFindState: FindState;
      };
      _focusManager: anyObj;
      _keyboardManager: anyObj;
      _annotationManager: AnnotationManager;

      readonly _lastView: ViewTypeMap[T];
      readonly splitType: "horizontal" | "vertical" | null;
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
      flowMode: FlowMode;
      scrollMode?: 0 | 1 | 2;
      spreadMode: SpreadMode;

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
      toggleFindPopup({
        primary,
        open,
      }?: {
        primary: boolean;
        open: boolean;
      }): void;
      _getString(name: string): string;
      setErrorMessage(errorMessage: string): void;
      copy(): void;
      zoomIn(): void;
      zoomOut(): void;
      zoomReset(): void;
      zoomAuto(): void;
      zoomPageWidth(): void;
      zoomPageHeight(): void;
      navigate(location: Location): Promise<void>;
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
      setSidebarView(view: string): void;
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
}
