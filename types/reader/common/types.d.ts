declare namespace _ZoteroTypes {
  namespace Reader {
    // We generate and support a very limited subset of the Web Annotation Data Model:
    // https://www.w3.org/TR/annotation-model/#selectors
    // Specifically, EPUB annotations are expressed in terms of FragmentSelectors with epubcfi values,
    // and snapshot annotations are CssSelectors refined by TextQuoteSelectors, or simply TextQuoteSelectors
    // if no good CSS selector base can be found.

    // https://www.w3.org/TR/annotation-model/#fragment-selector
    type FragmentSelector = {
      type: "FragmentSelector";
      conformsTo: FragmentSelectorConformsTo;
      value: string;
      refinedBy?: Selector;
    };

    enum FragmentSelectorConformsTo {
      // Skipping: HTML, PDF, Plain Text, XML, RDF/XML, CSV, Media, SVG
      EPUB3 = "http://www.idpf.org/epub/linking/cfi/epub-cfi.html",
    }

    // https://www.w3.org/TR/annotation-model/#css-selector
    type CssSelector = {
      type: "CssSelector";
      value: string;
      refinedBy?: Selector;
    };

    // Skipping: XPath Selector

    // https://www.w3.org/TR/annotation-model/#text-quote-selector
    type TextQuoteSelector = {
      type: "TextQuoteSelector";
      exact: string;
      prefix?: string;
      suffix?: string;
      refinedBy?: Selector;
    };

    // https://www.w3.org/TR/annotation-model/#text-position-selector
    type TextPositionSelector = {
      type: "TextPositionSelector";
      start: number;
      end: number;
      refinedBy?: Selector;
    };

    // Skipping: Data Position Selector, SVG Selector, Range Selector

    type Selector =
      | FragmentSelector
      | CssSelector
      | TextQuoteSelector
      | TextPositionSelector;

    type ToolType =
      | "highlight"
      | "underline"
      | "note"
      | "image"
      | "text"
      | "ink"
      | "eraser"
      | "pointer";

    type Tool = {
      type: ToolType;
      color?: string;
    };

    type AnnotationType =
      | "highlight"
      | "underline"
      | "note"
      | "image"
      | "text"
      | "ink"
      | "eraser";

    interface Annotation {
      id: string;
      type: AnnotationType;
      color?: string;
      sortIndex: string;
      pageLabel?: string;
      position: Position;
      text?: string;
      comment?: string;
      tags: string[];
      dateCreated: string;
      dateModified: string;
      readOnly?: boolean;
      authorName?: string;
      isAuthorNameAuthoritative?: boolean;
      image?: string;
    }

    interface PDFAnnotation extends Annotation {
      position: PDFPosition;
    }

    interface WADMAnnotation extends Annotation {
      position: Selector;
    }

    type NavLocation = {
      pageNumber?: string;
      annotationID?: string;
      position?: Position;
      href?: string;
    };

    type Position = PDFPosition | Selector;

    type PDFPosition = {
      pageIndex: number;
      rects?: number[][];
      paths?: number[][];
    };

    type NewAnnotationOptionalFields =
      | "id"
      | "tags"
      | "dateCreated"
      | "dateModified"
      | "authorName"
      | "isAuthorNameAuthoritative";

    type NewAnnotation<A extends Annotation = Annotation> = Omit<
      A,
      NewAnnotationOptionalFields
    > &
      Partial<Pick<A, NewAnnotationOptionalFields>>;

    type OutlineItem = {
      title: string;
      // The whole location will be passed to navigate() once user clicks the item
      location: NavLocation;
      items?: OutlineItem[];
      expanded?: boolean;
    };

    type ViewStats = {
      pageIndex?: number;
      pageLabel?: string;
      pagesCount?: number;
      usePhysicalPageNumbers?: boolean;
      canCopy: boolean;
      canZoomOut: boolean;
      canZoomIn: boolean;
      canZoomReset: boolean;
      canNavigateBack?: boolean;
      canNavigateForward?: boolean;
      canNavigateToFirstPage?: boolean;
      canNavigateToLastPage?: boolean;
      canNavigateToPreviousPage?: boolean;
      canNavigateToNextPage?: boolean;
      canNavigateToPreviousSection?: boolean;
      canNavigateToNextSection?: boolean;
      zoomAutoEnabled?: boolean;
      zoomPageWidthEnabled?: boolean;
      zoomPageHeightEnabled?: boolean;
      scrollMode?: number;
      spreadMode?: number;
      flowMode?: string;
      fontFamily?: string;
    };

    type AnnotationPopupParams<A extends Annotation = Annotation> = {
      rect: ArrayRect;
      annotation?: A | null;
    };

    type SelectionPopupParams<A extends Annotation = Annotation> = {
      rect: ArrayRect;
      annotation?: NewAnnotation<A> | null;
    };

    type OverlayPopupParams = {
      type: string;
      url: string;
      rect: ArrayRect;
      ref: Node;
    };

    type ArrayRect = [left: number, top: number, right: number, bottom: number];

    type FindState = {
      popupOpen: boolean;
      active: boolean;
      query: string;
      highlightAll: boolean;
      caseSensitive: boolean;
      entireWord: boolean;
      // For mobile app to focus specific result
      index: number | null;
      result: {
        total: number;
        index: number;
        // Mobile app lists all results in a popup
        snippets: string[];
      } | null;
    };

    type MaybePromise<T> = Promise<T> | T;
  }
}
