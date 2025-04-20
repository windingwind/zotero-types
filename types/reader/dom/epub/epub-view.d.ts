/// <reference path="../common/dom-view.d.ts" />
/// <reference path="../common/lib/nav-stack.d.ts" />
/// <reference path="find.d.ts" />
/// <reference path="flow.d.ts" />
/// <reference path="section-view.d.ts" />
/// <reference path="lib/page-mapping.d.ts" />
/// <reference path="epubjs.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    type FlowMode = "paginated" | "scrolled";
    interface EPUBViewState extends DOMViewState {
      cfi?: string;
      cfiElementOffset?: number;
      savedPageMapping?: string;
      flowMode?: FlowMode;
    }
    interface EPUBViewData {
      book?: ePubJS.Book;
    }
    enum SpreadMode {
      Unknown = -1,
      None = 0,
      Odd = 1,
      Even = 2,
    }

    /**
     * Wraps the properties of a Range object in a static structure so that they don't change when the DOM changes.
     * (Range objects automatically normalize their start/end points when the DOM changes, which is not what we want -
     * even if the start or end is removed from the DOM temporarily, we want to keep our ranges unchanged.)
     */
    class PersistentRange {
      startContainer: Node;
      startOffset: number;
      endContainer: Node;
      endOffset: number;

      constructor(range: Omit<AbstractRange, "collapsed">);

      compareBoundaryPoints(
        how: number,
        other: Range | PersistentRange,
      ): number;

      getClientRects(): DOMRectList;

      getBoundingClientRect(): DOMRect;

      toRange(): Range;

      toString(): string;
    }

    /**
     * - All views use iframe to render and isolate the view from the parent window
     * - If need to add additional build steps, a submodule or additional files see pdfjs/
     *   directory in the project root and "scripts" part in packages.json
     * - If view needs styling, it should provide and load its own CSS file like pdfjs/viewer.css,
     *   because SCSS in src/common/stylesheets is only for the main window
     * - Update demo data in demo/epub and demo/snapshot directories:
     *   - Add demo annotations
     */
    class EPUBView extends DOMView<EPUBViewState, EPUBViewData> {
      protected _find: EPUBFindProcessor | null;
      readonly book: ePubJS.Book;
      flow: Flow;
      spreadMode: SpreadMode.None | SpreadMode.Odd;
      readonly pageMapping: PageMapping;
      scale: number;
      private _sectionsContainer: HTMLElement;
      private readonly _sectionViews: SectionView[];
      private readonly _navStack: NavStack<string>;
      private readonly _pageMapping: PageMapping;
      private readonly _rangeCache: Map<string, Range>;
      private _pageProgressionRTL: boolean;
      private _scale: number;
      private _flowMode: FlowMode;
      private _savedPageMapping: string;
      constructor(options: DOMViewOptions<EPUBViewState, EPUBViewData>);
      protected _getSrcDoc(): "<!DOCTYPE html><html><body></body></html>";
      getData(): { book: ePubJS.Book };
      protected _onInitialDisplay(
        viewState: Partial<Readonly<EPUBViewState>>,
      ): Promise<void>;
      private _initPageMapping(
        viewState: Partial<Readonly<EPUBViewState>>,
      ): Promise<void>;
      private _initOutline(): void;
      getCFI(rangeOrNode: Range | Node): ePubJS.EpubCFI | null;
      getRange(cfi: ePubJS.EpubCFI | string): PersistentRange | null;
      override toSelector(range: Range): FragmentSelector | null;
      override toDisplayedRange(selector: Selector): Range | null;
      readonly views: SectionView[];
      private _pushCurrentLocationToNavStack(): void;
      protected _navigateToSelector(
        selector: Selector,
        options?: NavigateOptions,
      ): void;
      protected _getAnnotationFromRange(
        range: Range,
        type: AnnotationType,
        color?: string,
      ): NewAnnotation<WADMAnnotation> | null;

      // ***
      // Event handlers
      // ***
      protected override _handleResize(): void;
      protected override _handleScroll(): void;
      protected _handleInternalLinkClick(link: HTMLAnchorElement): void;
      protected override _handleKeyDown(event: KeyboardEvent): void;
      protected override _updateViewState(): void;
      protected override _updateViewStats(): void; // View stats provide information about the view
      protected override _handleViewUpdate(): void;

      // ***
      // Setters that get called once there are changes in reader._state
      // ***
      /**
       * Unlike annotation, selection and overlay popups, find popup open state is determined
       * with .open property. All popup properties are preserved even when it's closed
       */
      setFindState(state: FindState): void;
      setFlowMode(flowMode: FlowMode): void;
      setFontFamily(fontFamily: string): void;

      // ***
      // Public methods to control the view from the outside
      // ***
      findNext(): Promise<void>;
      findPrevious(): Promise<void>;
      zoomIn(): void;
      zoomOut(): void;
      zoomReset(): void;
      private _setScale(scale: number): void;
      override navigate(location: NavLocation, options?: NavigateOptions): void;

      /**
       * This is like back/forward navigation in browsers. Try Cmd-ArrowLeft and Cmd-ArrowRight in PDF view
       */
      navigateBack(): void;
      navigateForward(): void;
      navigateToFirstPage(): void;
      navigateToLastPage(): void;
      navigateToPreviousPage(): void;
      navigateToNextPage(): void;
      canNavigateToPreviousPage(): boolean;
      canNavigateToNextPage(): boolean;
      canNavigateToPreviousSection(): boolean;
      canNavigateToNextSection(): boolean;
      navigateToPreviousSection(): void;
      navigateToNextSection(): void;

      print(): void;
      setSidebarOpen(_sidebarOpen: boolean): void;
    }
  }
}
