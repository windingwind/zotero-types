/// <reference types="./section-view.d.ts" />
/// <reference types="./lib/page-mapping.d.ts" />
/// <reference types="../common/dom-view.d.ts" />
/// <reference types="../../common/lib/debounce.d.ts" />
/// <reference path="epubjs.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    interface Flow {
      readonly startView: SectionView | null;
      readonly startRange: Range | null;
      readonly startCFI: ePubJS.EpubCFI | null;
      readonly startCFIOffsetY: number | null;
      readonly startRangeIsBeforeFirstMapping: boolean;
      readonly endView: SectionView | null;
      readonly visibleViews: SectionView[];
      scrollIntoView(
        target: Range | HTMLElement,
        options?: CustomScrollIntoViewOptions,
      ): void;
      canNavigateToPreviousPage(): boolean;
      canNavigateToNextPage(): boolean;
      navigateToPreviousPage(): void;
      navigateToNextPage(): void;
      navigateToFirstPage(): void;
      navigateToLastPage(): void;
      invalidate: ReturnType<typeof debounce<() => void>>;
      setScale(scale: number): void;
      destroy(): void;
    }

    abstract class AbstractFlow implements Flow {
      protected _cachedStartView: SectionView | null;
      protected _cachedStartRange: Range | null;
      protected _cachedStartCFI: ePubJS.EpubCFI | null;
      protected _cachedStartCFIOffsetY: number | null;
      protected _cachedEndView: SectionView | null;
      protected _sectionViews: SectionView[];
      protected _pageMapping: PageMapping;
      protected _iframe: HTMLIFrameElement;
      protected _iframeWindow: Window & typeof globalThis;
      protected _iframeDocument: Document;
      protected _scale: number;
      protected _onUpdateViewState: () => void;
      protected _onUpdateViewStats: () => void;
      protected _onViewUpdate: () => void;

      constructor(options: {
        sectionViews: SectionView[];
        pageMapping: PageMapping;
        iframe: HTMLIFrameElement;
        scale: number;
        onUpdateViewState: () => void;
        onUpdateViewStats: () => void;
        onViewUpdate: () => void;
      });

      readonly startView: SectionView | null;
      readonly startRange: Range | null;
      readonly startCFI: ePubJS.EpubCFI | null;
      readonly startCFIOffsetY: number | null;
      readonly startRangeIsBeforeFirstMapping: boolean;
      readonly endView: SectionView | null;
      readonly visibleViews: SectionView[];

      abstract scrollIntoView(
        target: Range | HTMLElement,
        options?: CustomScrollIntoViewOptions,
      ): void;
      abstract canNavigateToNextPage(): boolean;
      abstract canNavigateToPreviousPage(): boolean;
      abstract navigateToNextPage(): void;
      abstract navigateToPreviousPage(): void;
      abstract navigateToFirstPage(): void;
      abstract navigateToLastPage(): void;
      abstract destroy(): void;
      invalidate: ReturnType<typeof debounce<() => void>>;
      setScale(scale: number): void;
      protected abstract update(): void;
    }

    class ScrolledFlow extends AbstractFlow {
      static readonly SCROLL_PADDING_UNSCALED = 35;
      scrollIntoView(
        target: Range | HTMLElement,
        options?: CustomScrollIntoViewOptions,
      ): void;
      readonly scrollPadding: number;
      canNavigateToPreviousPage(): boolean;
      canNavigateToNextPage(): boolean;
      navigateToPreviousPage(): void;
      navigateToNextPage(): void;
      navigateToFirstPage(): void;
      navigateToLastPage(): void;
      update(): void;
      destroy(): void;
    }

    class PaginatedFlow extends AbstractFlow {
      private _sectionsContainer: HTMLElement;
      private _touchStartID: number | null;
      private _touchStartX: number;
      scrollIntoView(target: Range | HTMLElement): void;
      canNavigateToPreviousPage(): boolean;
      canNavigateToNextPage(): boolean;
      navigateToPreviousPage(): void;
      navigateToNextPage(): void;
      navigateToFirstPage(): void;
      navigateToLastPage(): void;
      private _handleKeyDown(event: KeyboardEvent): void;
      private _handleTouchStart(event: TouchEvent): void;
      private _handleTouchMove(event: TouchEvent): void;
      private _handleTouchEnd(event: TouchEvent): void;
      update(): void;
      destroy(): void;
    }
  }
}
