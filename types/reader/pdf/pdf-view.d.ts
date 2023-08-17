/// <reference path="../../../internal.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    interface PDFView {
      _iframe: HTMLIFrameElement;
      _iframeWindow?: Window & {
        PDFViewerApplication: anyObj;
        PDFViewerApplicationConstants: anyObj;
        pdfjsLib: anyObj;
      };
      initializedPromise: Promise<unknown>;
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
