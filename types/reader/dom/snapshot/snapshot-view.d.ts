/// <reference path="../../common/types.d.ts" />
/// <reference path="../common/dom-view.d.ts" />
/// <reference path="../common/lib/nav-stack.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    interface SnapshotViewState extends DOMViewState {
      scrollYPercent?: number;
    }

    interface SnapshotViewData {
      srcDoc?: string;
    }

    class SnapshotView extends DOMView<SnapshotViewState, SnapshotViewData> {
      private readonly _navStack: NavStack<[number, number]>;
      protected _find: DefaultFindProcessor | null;
      private _searchContext: SearchContext | null;
      private _scale: number;

      protected _getSrcDoc(): string;
      getData(): { srcDoc: string; baseURI?: string };
      protected _onInitialDisplay(
        viewState: Partial<Readonly<SnapshotViewState>>,
      ): void;
      protected _getAnnotationFromRange(
        range: Range,
        type: AnnotationType,
        color?: string,
      ): NewAnnotation<WADMAnnotation> | null;
      private _getSortIndex(range: Range): string;
      toSelector(range: Range): Selector | null;
      toDisplayedRange(selector: Selector): Range | null;
      private _getSearchContext(): SearchContext;

      // Popups:
      // - For each popup (except find popup) 'rect' bounding box has to be provided.
      // 	 The popup is then automatically positioned around this rect.
      // - If popup needs to be updated (i.e. its position), just reopen it.
      // - Popup has to be updated (reopened) each time when the view is scrolled or resized.
      // - annotation, selection and overlay popups are closed by calling this._onSetSomePopup()
      //   with no arguments
      _pushCurrentLocationToNavStack(): void;
      protected _navigateToSelector(
        selector: Selector,
        options?: NavigateOptions,
      ): void;
      protected override _updateViewState(): void;
      protected override _updateViewStats(): void;

      // ***
      // Event handlers
      // ***
      protected _handleInternalLinkClick(link: HTMLAnchorElement): void;
      protected override _handleScroll(): void;

      // ***
      // Setters that get called once there are changes in reader._state
      // ***
      /**
       * Unlike annotation, selection and overlay popups, find popup open state is determined
       * with .open property. All popup properties are preserved even when it's closed
       */
      setFindState(state: FindState): void;

      // ***
      // Public methods to control the view from the outside
      // ***
      findNext(): void;
      findPrevious(): void;
      zoomIn(): void;
      zoomOut(): void;
      zoomReset(): void;
      private _setScale(scale: number): void;
      override navigate(location: NavLocation, options?: NavigateOptions): void;
      navigateBack(): void;
      navigateForward(): void;
      print(): void;
      setSidebarOpen(_sidebarOpen: boolean): void;
    }
  }
}
