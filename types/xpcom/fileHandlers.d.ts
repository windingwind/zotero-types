declare namespace Zotero {
  // TODO: add types
  namespace FileHandlers {}

  namespace OpenPDF {
    /**
     * @deprecated - use Zotero.FileHandlers.open
     */
    function openToPage(
      item: Zotero.Item,
      page: number,
      annotationKey?: string,
    ): Promise<void>;
  }
}
