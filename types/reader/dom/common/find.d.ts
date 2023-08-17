/// <reference path="../../common/types.d.ts" />
/// <reference path="components/overlay/annotation-overlay.d.ts" />
/// <reference path="lib/dom-text-search.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    type FindResult = {
      range: Range;
      highlight: DisplayedAnnotation;
    };
    interface FindProcessor {
      getAnnotations(): DisplayedAnnotation[];
      prev(): FindResult | null;
      next(): FindResult | null;
    }

    class DefaultFindProcessor implements FindProcessor {
      readonly findState: FindState;
      private readonly _buf: FindResult[];
      private _pos: number | null;
      private _initialPos: number | null;
      private readonly _onSetFindState?: (state?: FindState) => void;
      private readonly _annotationKeyPrefix?: string;

      constructor(options: {
        searchContext: SearchContext;
        startRange?: Range;
        findState: FindState;
        onSetFindState?: (state?: FindState) => void;
        annotationKeyPrefix?: string;
      });
      prev(loop?: boolean): FindResult | null;
      next(loop?: boolean): FindResult | null;

      position: number | null;
      readonly initialPosition: number | null;
      readonly current: FindResult | null;
      getResults(): FindResult[];
      getAnnotations(): DisplayedAnnotation[];
      getSnippets(): string[];
    }
  }
}
