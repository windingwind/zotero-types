/// <reference path="types.d.ts" />
/// <reference path="reader.d.ts" />

declare namespace _ZoteroTypes {
  namespace Reader {
    class AnnotationManager {
      _authorName: string;
      _readOnly: boolean;
      _annotations: Annotation[];
      _onChangeFilter: Function;
      _onSave: Function;
      _onDelete: Function;
      _unsavedAnnotations: Annotation[];
      _filter: Filter;

      constructor(options: {
        readOnly: boolean;
        authorName: string;
        onSave: Function;
        onDelete: Function;
        onChangeFilter: (filter: Filter) => void;
        onRender: (annotations: Annotation[]) => void;
        annotations: Annotation[];
      });

      render(): void;
      setReadOnly(readOnly: boolean): void;
      _debounceSave(): void;

      /**
       * Called when changes come from the client side
       */
      setAnnotations(annotations: Annotation[]): Promise<void>;

      /**
       * Called when deletions come from the client side
       */
      unsetAnnotations(ids: string[]): void;

      addAnnotation(
        annotation: Partial<Annotation> & { color: string; sortIndex: string },
      ): Required<Annotation> | null;
      updateAnnotations(annotations: Annotation[]): void;
      deleteAnnotations(ids: string[]): void;
      _generateObjectKey(): string;
      _save(annotation: Annotation, instant?: boolean): void;
      _getAnnotationByID(id: string): Annotation | undefined;
      setFilter(filter: Filter): Promise<void>;
    }
  }
}
