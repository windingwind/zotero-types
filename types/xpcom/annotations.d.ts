/// <reference path="../zotero.d.ts" />

declare namespace _ZoteroTypes {
  namespace Annotations {
    type AnnotationType =
      | "highlight"
      | "image"
      | "ink"
      | "note"
      | "underline"
      | "text";
    interface AnnotationJson {
      id: string;
      text: string;
      libraryID: number;
      key: string;
      type: Annotations.AnnotationType;
      isExternal?: boolean;
      authorName?: string;
      lastModifiedByUser?: string;
      isAuthorNameAuthoritative?: boolean;
      readOnly: boolean;
      image?: string;
      comment?: string;
      pageLabel: string;
      color: string;
      sortIndex: string;
      position: { pageIndex: number; rects: number[][] } & anyObj;
      tags?: { name: string; color: string };
      dateModified: string;
      relations?: Record<RelationsPredicate, ZoteroObjectURI>;
    }
  }

  interface Annotations {
    [key: string]: unknown;
    ANNOTATION_POSITION_MAX_SIZE: 65000;
    ANNOTATION_TYPE_HIGHLIGHT: 1;
    ANNOTATION_TYPE_NOTE: 2;
    ANNOTATION_TYPE_IMAGE: 3;
    ANNOTATION_TYPE_INK: 4;
    ANNOTATION_TYPE_UNDERLINE: 5;
    ANNOTATION_TYPE_TEXT: 6;
    DEFAULT_COLOR: "#ffd400";
    readonly PROPS: [
      "type",
      "authorName",
      "text",
      "comment",
      "color",
      "pageLabel",
      "sortIndex",
      "position",
    ];

    getCacheImagePath(
      annotation: object & { libraryID: number; key: string },
    ): string;
    hasCacheImage(
      item: object & { libraryID: number; key: string },
    ): Promise<boolean>;
    saveCacheImage(
      annotation: object & { libraryID: number; key: string },
      blob: Blob,
    ): Promise<string>;
    removeCacheImage(
      annotation: object & { libraryID: number; key: string },
    ): Promise<void>;

    /**
     * Remove cache files that are no longer in use
     */
    removeOrphanedCacheFiles(): Promise<void>;

    /**
     * Remove all cache files for a given library
     */
    removeLibraryCacheFiles(libraryID: number): Promise<void>;

    _getLibraryCacheDirectory(libraryID: number): string;
    toJSON(item: Zotero.Item): Promise<Annotations.AnnotationJson>;

    /**
     * @param {Zotero.Item} attachment - Saved parent attachment item
     * @param {Object} json
     * @return {Promise<Zotero.Item>} - Promise for an annotation item
     */
    saveFromJSON(
      attachment: Zotero.Item,
      json: Annotations.AnnotationJson,
      saveOptions?: Zotero.DataObject.SaveOptions,
    ): Promise<Zotero.Item>;

    /**
     * Split annotation if position exceed the limit
     *
     * @param {Object} annotation
     * @returns {Array<Object>} annotations
     */
    splitAnnotationJSON(
      annotation: Zotero.Item | Annotations.AnnotationJson,
    ): Annotations.AnnotationJson[];

    /**
     * Split annotations
     *
     * @param {Zotero.Item[]} items
     * @returns {Promise<void>}
     */
    splitAnnotations(items: Zotero.Item[]): Promise<void>;
  }
}

declare namespace Zotero {
  const Annotations: _ZoteroTypes.Annotations;
}
