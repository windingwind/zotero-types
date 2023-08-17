/// <reference types="../section-view.d.ts" />
/// <reference types="../epub-view.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    class PageMapping {
      static readonly VERSION = 5;
      private _isPhysical: boolean;
      readonly length: number;
      readonly isPhysical: boolean;

      generate(views: SectionView[]): void;
      private _addPhysicalPages(views: Iterable<SectionView>): void;
      private _addEPUBLocations(views: Iterable<SectionView>): void;
      getPageIndex(range: Range): number | null;
      getPageLabel(range: Range): string | null;
      getRange(pageLabel: string): Range | null;
      save(view: EPUBView): string;
      load(saved: string, view: EPUBView): boolean;
    }
  }
}
