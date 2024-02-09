/// <reference path="pdf-view.d.ts" />
/// <reference path="../common/types.d.ts" />
/// <reference path="../../../internal.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    class Page {
      constructor(layer: PDFView, originalPage: anyObj);
      layer: PDFView;
      originalPage: anyObj;
      pageIndex: number;
      overlays: anyObj[];
      chars: anyObj[];
      selectionColor: "#bad6fb";
      previouslyAffected: boolean;
      originalCanvas: HTMLCanvasElement;
      originalContext: CanvasRenderingContext2D;
      actualContext: CanvasRenderingContext2D;
      readonly transform: number[];

      redrawOriginalPage(): Promise<void>;
      drawNote(ctx: CanvasRenderingContext2D, color: string): void;
      drawCommentIndicators(annotations: Annotation[]): void;

      _renderInk(annotation: Annotation): void;
      _renderImage(annotation: Annotation): void;
      _renderHighlight(annotation: Annotation): void;
      _renderUnderline(annotation: Annotation): void;
      _renderNote(annotation: Annotation): void;

      render(): void;
      renderAnnotationOnCanvas(
        annotation: Annotation,
        canvas: HTMLCanvasElement,
      ): void;
    }
  }
}
