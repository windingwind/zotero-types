/// <reference path="dataObject.d.ts" />

declare class _ZoteroItem extends _ZoteroDataObject {
    isRegularItem: () => boolean;
    isAttachment: () => boolean;
    isAnnotation: () => boolean;
    isPDFAttachment: () => boolean;
    isEmbeddedImageAttachment: () => boolean;
    getTags: () => { tag: string; type: number }[];
    addTag: (name: string, type: number) => boolean;
    removeTag: (tag: string) => boolean;
    // Only regular item
    addToCollection: (id: number) => void;
    getNotes: () => number[];
    getCollections: () => number[];
    getAttachments: () => number[];
    getField: (
      name: string,
      unformatted?: boolean,
      includeBaseMapped?: boolean
    ) => any;
    setField: (name: string, value: string | number) => void;
    getCreators: () => {
      firstName?: string;
      lastName: string;
      fieldMode: number;
      creatorTypeID: number;
    }[];
    getCreatorsJSON: () => {
      firstName?: string;
      lastName?: string;
      name?: string;
      creatorType: string;
    }[];
    getBestAttachment: () => Promise<_ZoteroItem>;
    getBestAttachments: () => Promise<_ZoteroItem[]>;
    getBestAttachmentState: () => Promise<object>;
    // Only image annotation & attachment item
    getFilePath: () => string;
    getFilePathAsync: () => Promise<string>;
    // Only notes
    isNote: () => boolean;
    getNote: () => string;
    setNote: (content: string) => void;
    getNoteTitle: () => string;
    // Only Annotation
    getAnnotations: (
      /**
       * Include trashed items.
       * @default true
       */
      includeTrashed?: boolean
    ) => _ZoteroItem[];
    annotationType: string;
    annotationComment: string;
    annotationText: string;
    annotationPosition: string;
    annotationColor: string;
    annotationPageLabel: string;
    attachmentContentType: string;
    dateModified: string;
  }
