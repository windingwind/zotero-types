/// <reference path="epub-view.d.ts" />
/// <reference path="section-view.d.ts" />
/// <reference path="../common/find.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    class EPUBFindProcessor implements FindProcessor {
      readonly view: EPUBView;
      readonly findState: FindState;
      private _processors: DefaultFindProcessor[];
      private _selectedProcessor: DefaultFindProcessor | null;
      private _totalResults: number;
      private readonly _onSetFindState?: (state?: FindState) => void;
      constructor(options: {
        view: EPUBView;
        startRange: Range;
        findState: FindState;
        onSetFindState?: (state?: FindState) => void;
      });
      prev(): FindResult | null;
      next(): FindResult | null;
      getAnnotations(): DisplayedAnnotation[];
      handleViewUpdate(): void;
      private _processViews(
        views: SectionView[],
        startRange?: Range,
        maxResults?: number,
      ): void;
      private _getOrCreateProcessor(
        view: SectionView,
        startRange?: Range,
      ): DefaultFindProcessor;
      private _setFindState(): void;
    }
  }
}
