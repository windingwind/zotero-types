/// <reference types="../common/lib/dom-text-search.d.ts" />
/// <reference types="../epub/lib/sanitize-and-render.d.ts" />
/// <reference path="epubjs.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    class SectionView {
      readonly section: ePubJS.Section;
      readonly container: HTMLElement;
      body: HTMLElement;
      private readonly _window: Window & typeof globalThis;
      private readonly _document: Document;
      private readonly _styleScoper: StyleScoper;
      private _searchContext: SearchContext | null;
      constructor(options: {
        section: ePubJS.Section;
        container: HTMLElement;
        window: Window & typeof globalThis;
        document: Document;
        styleScoper: StyleScoper;
      });
      render(requestFn: Function): Promise<void>;
      getFirstVisibleRange(
        isHorizontal: boolean,
        textNodesOnly: boolean,
      ): Range | null;
      get searchContext(): SearchContext;
    }
  }
}
