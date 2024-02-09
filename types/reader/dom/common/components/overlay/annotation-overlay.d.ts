/// <reference path="../../../../common/types.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    type DisplayedAnnotation = {
      id?: string;
      sourceID?: string;
      type: AnnotationType;
      color?: string;
      sortIndex?: string;
      text?: string;
      comment?: string;
      readOnly?: boolean;
      key: string;
      range: Range;
    };
    type AnnotationOverlayProps = {
      iframe: HTMLIFrameElement;
      annotations: DisplayedAnnotation[];
      selectedAnnotationIDs: string[];
      onPointerDown: (id: string, event: React.PointerEvent) => void;
      onPointerUp: (id: string, event: React.PointerEvent) => void;
      onDragStart: (id: string, dataTransfer: DataTransfer) => void;
      onResizeStart: (id: string) => void;
      onResizeEnd: (id: string, range: Range, cancelled: boolean) => void;
      disablePointerEvents: boolean;
    };
    type HighlightOrUnderlineProps = {
      annotation: DisplayedAnnotation;
      selected: boolean;
      singleSelection: boolean;
      onPointerDown?: (
        annotation: DisplayedAnnotation,
        event: React.PointerEvent,
      ) => void;
      onPointerUp?: (
        annotation: DisplayedAnnotation,
        event: React.PointerEvent,
      ) => void;
      onDragStart?: (
        annotation: DisplayedAnnotation,
        dataTransfer: DataTransfer,
      ) => void;
      onResizeStart?: (annotation: DisplayedAnnotation) => void;
      onResizeEnd?: (
        annotation: DisplayedAnnotation,
        range: Range,
        cancelled: boolean,
      ) => void;
      pointerEventsSuppressed: boolean;
      widgetContainer: Element | null;
    };
    type NoteProps = {
      annotation: DisplayedAnnotation;
      staggerIndex?: number;
      selected: boolean;
      onPointerDown?: (
        annotation: DisplayedAnnotation,
        event: React.PointerEvent,
      ) => void;
      onPointerUp?: (
        annotation: DisplayedAnnotation,
        event: React.PointerEvent,
      ) => void;
      onDragStart?: (
        annotation: DisplayedAnnotation,
        dataTransfer: DataTransfer,
      ) => void;
      disablePointerEvents: boolean;
    };
    type NotePreviewProps = {
      annotation: DisplayedAnnotation;
    };
    type StaggeredNotesProps = {
      annotations: DisplayedAnnotation[];
      selectedAnnotationIDs: string[];
      onPointerDown: (
        annotation: DisplayedAnnotation,
        event: React.PointerEvent,
      ) => void;
      onPointerUp: (
        annotation: DisplayedAnnotation,
        event: React.PointerEvent,
      ) => void;
      onDragStart: (
        annotation: DisplayedAnnotation,
        dataTransfer: DataTransfer,
      ) => void;
      pointerEventsSuppressed: boolean;
    };
    type SelectionBorderProps = {
      rect: DOMRect;
      preview?: boolean;
    };
    type RangeSelectionBorderProps = {
      range: Range;
    };
    type ResizerProps = {
      annotation: DisplayedAnnotation;
      highlightRects: DOMRect[];
      onResizeStart: (annotation: DisplayedAnnotation) => void;
      onResizeEnd: (
        annotation: DisplayedAnnotation,
        cancelled: boolean,
      ) => void;
      onResize: (annotation: DisplayedAnnotation, range: Range) => void;
    };
    type CommentIconProps = {
      annotation?: { id?: string };
      x: number;
      y: number;
      color: string;
      opacity?: string | number;
      selected?: boolean;
      large?: boolean;
      onPointerDown?: (event: React.PointerEvent) => void;
      onPointerUp?: (event: React.PointerEvent) => void;
      onDragStart?: (event: React.DragEvent) => void;
      onDragEnd?: (event: React.DragEvent) => void;
    };
  }
}
