/// <reference path="../zotero.d.ts" />

declare namespace _ZoteroTypes {
  interface EditorInstanceUtilities {
    serializeAnnotations: (
      annotations: object[],
      skipEmbeddingItemData?: boolean,
    ) => { html: string; citationItems: Zotero.Item[] };
    _transformTextToHTML(text: string): string;
    _formatCitationItemPreview(citationItem: Zotero.Item): string;
    formatCitation(citation: object): string;
  }
}
