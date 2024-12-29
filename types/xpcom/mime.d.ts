declare namespace Zotero {
  /**
   * The MIME namespace provides various utility functions for determining
   * MIME types based on file data, file extensions, and HTTP metadata.
   */
  namespace MIME {
    /**
     * Checks if the given MIME type is a text type.
     *
     * @param mimeType
     * @returns true if the MIME type is a text type; otherwise false.
     */
    function isTextType(mimeType: string): boolean;

    /**
     * Checks if the given MIME type is considered a web page type.
     *
     * @param mimeType
     * @returns true if the MIME type is a web page type; otherwise false.
     */
    function isWebPageType(mimeType: string): boolean;

    /*
     * Our own wrapper around the MIME service's getPrimaryExtension() that
     * works a little better
     */
    function getPrimaryExtension(mimeType: string, ext: string): string;

    /*
     * Searches string for embedded nulls
     *
     * Returns 'application/octet-stream' or 'text/plain'
     */
    function sniffForBinary(str: string): string;

    /*
     * Searches string for magic numbers
     */
    function sniffForMIMEType(str: string): string | false;

    /*
     * Try to determine the MIME type of a string, using a few different
     * techniques
     *
     * ext is an optional file extension hint if data sniffing is unsuccessful
     */
    function getMIMETypeFromData(str: string, ext?: string): string;

    /**
     * Try to find a MIME type associated with a given file extension.
     *
     * @param ext The file extension without the leading dot.
     * @returns The resolved MIME type or false if not found.
     */
    function getMIMETypeFromExtension(ext: string): string | false;

    /*
     * Try to determine the MIME type of the file, using a few different
     * techniques
     */
    function getMIMETypeFromFile(file: any): Promise<string>;

    /**
     * @param {String} url
     * @param {Zotero.CookieSandbox} [cookieSandbox]
     * @return {Promise<[string, boolean]>} Resolves with [mimeType, hasNativeHandler]
     */
    function getMIMETypeFromURL(
      url: string,
      cookieSandbox?: any,
    ): Promise<[string, boolean]>;

    /*
     * Determine if a MIME type can be handled natively
     * or if it needs to be passed off to a plugin or external helper app
     *
     * ext is an optional extension hint (only needed for text files
     * that should be forced to open externally)
     *
     * Note: it certainly seems there should be a more native way of doing this
     * without replicating all the Mozilla functionality
     *
     * Note: nsIMIMEInfo provides a hasDefaultHandler() method, but it doesn't
     * do what we need
     */
    function hasNativeHandler(mimeType: string, ext?: string): boolean;
  }
}
