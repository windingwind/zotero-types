/// <reference path="../../../internal.d.ts" />
/// <reference path="pdfjs.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    interface PDFView {
      _iframe: HTMLIFrameElement;
      _iframeWindow?: Window & {
        PDFViewerApplication: PDFViewerApplication;
        PDFViewerApplicationConstants: anyObj;
        pdfjsLib: pdfjs;
      };
      initializedPromise: Promise<void>;
      focus(): void;
      findNext(): void;
      findPrevious(): void;
      zoomReset(): void;
      zoomIn(): void;
      zoomOut(): void;
      zoomPageWidth(): void;
      zoomPageHeight(): void;
      zoomAuto(): void;
      navigateBack(): void;
      navigateForward(): void;
      navigateToFirstPage(): void;
      navigateToLastPage(): void;
      navigateToNextPage(): void;
      navigateToPreviousPage(): void;
      getSelectedAnnotations(): anyObj[];
    }
  }
}
