/// <reference path="../../../../internal.d.ts" />
/// <reference path="../../common/types.d.ts" />
/// <reference path="find.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    type DOMViewOptions<State extends DOMViewState, Data> = {
      portal?: boolean;
      container: Element;
      tool: Tool;
      selectedAnnotationIDs: string[];
      annotations: WADMAnnotation[];
      showAnnotations: boolean;
      annotationPopup: AnnotationPopupParams<WADMAnnotation> | null;
      selectionPopup: SelectionPopupParams<WADMAnnotation> | null;
      overlayPopup: OverlayPopupParams | null;
      findState: FindState;
      viewState?: State;
      fontFamily?: string;
      onSetOutline: (outline: OutlineItem[]) => void;
      onChangeViewState: (state: State, primary?: boolean) => void;
      onChangeViewStats: (stats: ViewStats) => void;
      onSetDataTransferAnnotations: (
        dataTransfer: DataTransfer,
        annotation:
          | NewAnnotation<WADMAnnotation>
          | NewAnnotation<WADMAnnotation>[],
        fromText?: boolean,
      ) => void;
      onAddAnnotation: (
        annotation: NewAnnotation<WADMAnnotation>,
        select?: boolean,
      ) => void;
      onUpdateAnnotations: (annotations: Annotation[]) => void;
      onOpenLink: (url: string) => void;
      onSelectAnnotations: (
        ids: string[],
        triggeringEvent?: KeyboardEvent | MouseEvent,
      ) => void;
      onSetSelectionPopup: (
        params?: SelectionPopupParams<WADMAnnotation> | null,
      ) => void;
      onSetAnnotationPopup: (
        params?: AnnotationPopupParams<WADMAnnotation> | null,
      ) => void;
      onSetOverlayPopup: (params?: OverlayPopupParams) => void;
      onSetFindState: (state?: FindState) => void;
      onOpenViewContextMenu: (params: { x: number; y: number }) => void;
      onOpenAnnotationContextMenu: (params: {
        ids: string[];
        x: number;
        y: number;
        view: boolean;
      }) => void;
      onFocus: () => void;
      onTabOut: (isShiftTab?: boolean) => void;
      onKeyUp: (event: KeyboardEvent) => void;
      onKeyDown: (event: KeyboardEvent) => void;
      data: Data & {
        buf?: Uint8Array;
        baseURI?: string;
      };
    };

    interface DOMViewState {
      scale?: number;
    }

    interface CustomScrollIntoViewOptions
      extends Omit<ScrollIntoViewOptions, "inline"> {
      block?: "center" | "start";
      ifNeeded?: boolean;
      offsetY?: number;
    }

    interface NavigateOptions extends CustomScrollIntoViewOptions {
      skipNavStack?: boolean;
    }

    abstract class DOMView<State extends DOMViewState, Data> {
      initializedPromise: Promise<void>;
      protected readonly _container: Element;
      protected readonly _iframe: HTMLIFrameElement;
      protected _iframeWindow: Window & typeof globalThis;
      protected _iframeDocument: Document;
      protected _tool: Tool;
      protected _selectedAnnotationIDs: string[];
      protected _annotations: WADMAnnotation[];
      protected _annotationsByID: Map<string, WADMAnnotation>;
      protected _showAnnotations: boolean;
      protected _annotationPopup: AnnotationPopupParams<WADMAnnotation> | null;
      protected _selectionPopup: SelectionPopupParams<WADMAnnotation> | null;
      protected _overlayPopup: OverlayPopupParams | null;
      protected _findState: FindState | null;
      protected abstract _find: FindProcessor | null;
      protected readonly _options: DOMViewOptions<State, Data>;
      protected _overlayPopupDelayer: anyObj;
      protected _disableAnnotationPointerEvents: boolean;
      protected _highlightedPosition: Selector | null;
      protected _pointerMovedWhileDown: boolean;
      protected _gotPointerUp: boolean;
      protected _handledPointerIDs: Set<number>;
      protected _previewAnnotation: NewAnnotation<WADMAnnotation> | null;
      protected _draggingNoteAnnotation: WADMAnnotation | null;
      protected _resizing: boolean;
      protected constructor(options: DOMViewOptions<State, Data>);

      protected _initialize(): Promise<void>;
      protected _getCSP(): string;
      protected abstract _getSrcDoc(): string;
      abstract getData(): Data;
      protected abstract _onInitialDisplay(
        viewState: Partial<Readonly<State>>,
      ): MaybePromise<void>;

      // ***
      // Utilities for annotations - abstractions over the specific types of selectors used by the two views
      // ***
      abstract toSelector(range: Range): Selector | null;
      abstract toDisplayedRange(selector: Selector): Range | null;
      protected abstract _navigateToSelector(
        selector: Selector,
        options?: NavigateOptions,
      ): void;

      // ***
      // Abstractions over document structure
      // ***
      protected abstract _getAnnotationFromRange(
        range: Range,
        type: AnnotationType,
        color?: string,
      ): NewAnnotation<WADMAnnotation> | null;
      protected abstract _updateViewState(): void;
      protected abstract _updateViewStats(): void;

      // ***
      // Utilities - called in appropriate event handlers
      // ***
      protected _isExternalLink(link: HTMLAnchorElement): boolean;
      protected _getViewportBoundingRect(range: Range): DOMRect;
      protected _getAnnotationFromTextSelection(
        type: AnnotationType,
        color?: string,
      ): NewAnnotation<WADMAnnotation> | null;
      protected _tryUseTool(): void;
      protected _tryUseToolDebounced: typeof this._tryUseTool;
      protected _handleViewUpdate(): void;
      protected _repositionPopups(): void;
      protected _renderAnnotations(): void;
      protected _openSelectionPopup(selection: Selection): void;
      protected _openAnnotationPopup(annotation: WADMAnnotation): void;
      protected _openExternalLinkOverlayPopup(
        linkNode: HTMLAnchorElement,
      ): void;

      /**
       * For use in the console during development.
       */
      protected _normalizeAnnotations(): void;

      // ***
      // Event handlers
      // ***
      protected _handleIFrameLoad(): Promise<void>;
      protected _handlePointerOver(event: PointerEvent): void;
      protected _handleDragEnter(event: DragEvent): void;
      protected _handleDragOver(event: DragEvent): void;
      protected _handleDrop(): void;
      protected _getNoteTargetRange(
        event: PointerEvent | DragEvent,
      ): Range | null;
      protected _handleClick(event: MouseEvent): void;
      protected abstract _handleInternalLinkClick(
        link: HTMLAnchorElement,
      ): void;
      protected _handleKeyDown(event: KeyboardEvent): void;
      private _handleDragStart(event: DragEvent): void;
      private _handleDragEnd(_event: DragEvent): void;
      private _handleContextMenu(event: MouseEvent): void;
      private _handleSelectionChange(): void;
      private _handleAnnotationPointerDown(
        id: string,
        event: React.PointerEvent,
      ): void;
      private _handleAnnotationPointerUp(
        id: string,
        event: React.PointerEvent,
      ): void;
      private _getAnnotationsAtPoint(
        clientX: number,
        clientY: number,
      ): string[];
      private _handleAnnotationDragStart(
        id: string,
        dataTransfer: DataTransfer,
      ): void;
      private _handleAnnotationResizeStart(_id: string): void;
      private _handleAnnotationResizeEnd(
        id: string,
        range: Range,
        cancelled: boolean,
      ): void;
      protected _handleCopy(event: ClipboardEvent): void;
      protected _handlePointerDown(event: PointerEvent): void;
      protected _handlePointerMove(event: PointerEvent): void;
      protected _handlePointerUp(event: PointerEvent): void;
      protected _handleResize(): void;
      protected _handleScroll(): void;
      private _handleFocus(): void;

      // ***
      // Setters that get called once there are changes in reader._state
      // ***
      setTool(tool: Tool): void;
      setAnnotations(annotations: WADMAnnotation[]): void;
      setShowAnnotations(show: boolean): void;
      setSelectedAnnotationIDs(ids: string[]): void;
      setAnnotationPopup(popup: AnnotationPopupParams<WADMAnnotation>): void;
      setSelectionPopup(popup: SelectionPopupParams<WADMAnnotation>): void;
      setOverlayPopup(popup: OverlayPopupParams): void;

      // ***
      // Public methods to control the view from the outside
      // ***
      focus(): void;
      navigate(location: NavLocation, options?: NavigateOptions): void;
    }
  }
}
