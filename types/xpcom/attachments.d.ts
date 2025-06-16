/// <reference path="../platform.d.ts" />
/// <reference path="../zotero.d.ts" />

declare namespace _ZoteroTypes {
  namespace Attachments {
    enum LinkMode {
      importedFile = 0,
      importedUrl,
      linkedFile,
      linkedUrl,
      embeddedImage,
    }

    interface OptionsFromFile {
      file: nsIFile | string;
      parentItemID?: number;
      title?: string;
      collections?: Array<string | number>;
      contentType?: string;
      charset?: string;
      saveOptions?: Zotero.DataObject.SaveOptions;
    }

    type AccessMethod = "doi" | "url" | "oa" | "custom";
    interface UrlResolver {
      pageURL?: string;
      url?: string;
      accessMethod: AccessMethod;
      articleVersion?: unknown;
      referrer?: string;
    }
  }
  interface Attachments {
    [key: string]: unknown;
    LINK_MODE_IMPORTED_FILE: 0;
    LINK_MODE_IMPORTED_URL: 1;
    LINK_MODE_LINKED_FILE: 2;
    LINK_MODE_LINKED_URL: 3;
    LINK_MODE_EMBEDDED_IMAGE: 4;
    BASE_PATH_PLACEHOLDER: "attachments:";

    /**
     * @param {Object} options
     * @param {nsIFile|String} [options.file] - File to add
     * @param {Integer} [options.libraryID]
     * @param {Integer[]|String[]} [options.parentItemID] - Parent item to add item to
     * @param {String} [options.title]
     * @param {Integer[]} [options.collections] - Collection keys or ids to add new item to
     * @param {String} [options.fileBaseName]
     * @param {String} [options.contentType]
     * @param {String} [options.charset]
     * @param {Object} [options.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Promise<Zotero.Item>}
     */
    importFromFile(
      options: Attachments.OptionsFromFile & {
        libraryID?: number;
        fileBaseName?: string;
      },
    ): Promise<Zotero.Item>;

    /**
     * @param {nsIFile|String} options.file - File to add
     * @param {Integer[]|String[]} [options.parentItemID] - Parent item to add item to
     * @param {String} [options.title]
     * @param {Integer[]} [options.collections] - Collection keys or ids to add new item to
     * @param {String} [options.contentType] - Content type
     * @param {String} [options.charset] - Character set
     * @param {Object} [options.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Promise<Zotero.Item>}
     */
    linkFromFile(options: Attachments.OptionsFromFile): Promise<Zotero.Item>;

    /**
     * @param {String} options.path - Relative path to file
     * @param {String} options.title
     * @param {String} options.contentType
     * @param {Integer[]|String[]} [options.parentItemID] - Parent item to add item to
     * @param {Integer[]} [options.collections] - Collection keys or ids to add new item to
     * @param {Object} [options.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Promise<Zotero.Item>}
     */
    linkFromFileWithRelativePath(
      options: Attachments.OptionsFromFile,
    ): Promise<Zotero.Item>;

    /**
     * Saves an image for a parent note or image annotation
     *
     * Emerging formats like WebP and AVIF are supported here,
     * but should be filtered on the calling logic for now
     *
     * @param {Object} params
     * @param {Blob} params.blob - Image to save
     * @param {Integer} params.parentItemID - Note or annotation item to add item to
     * @param {Object} [params.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Promise<Zotero.Item>}
     */
    importEmbeddedImage(params: {
      blob: Blob;
      parentItemID: number;
      saveOptions?: Zotero.DataObject.SaveOptions;
    }): Promise<Zotero.Item>;

    /**
     * Copy an image from one note to another
     *
     * @param {Object} params
     * @param {Zotero.Item} params.attachment - Image attachment to copy
     * @param {Zotero.Item} params.note - Note item to add attachment to
     * @param {Object} [params.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Promise<Zotero.Item>}
     */
    copyEmbeddedImage(params: {
      attachment: Zotero.Item;
      note: Zotero.Item;
      saveOptions?: Zotero.DataObject.SaveOptions;
    }): Promise<Zotero.Item>;

    /**
     * @param {Object} options
     * @param {Integer} options.libraryID
     * @param {String} options.url
     * @param {Integer} [options.parentItemID]
     * @param {Integer[]} [options.collections]
     * @param {String} [options.title]
     * @param {String} [options.fileBaseName]
     * @param {Boolean} [options.renameIfAllowedType=false]
     * @param {String} [options.contentType]
     * @param {String} [options.referrer]
     * @param {CookieSandbox} [options.cookieSandbox]
     * @param {Object} [options.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Promise<Zotero.Item>} - A promise for the created attachment item
     */
    importFromURL(options: {}): Promise<Zotero.Item>;

    /**
     * Create an imported-URL attachment using a file downloaded to a temporary directory
     * in 'storage', moving the directory into place
     *
     * We download files to temporary 'storage' directories rather than the normal temporary
     * directory because people might have their storage directory on another device, which
     * would make the move a copy.
     *
     * @param {Object} options
     * @param {String} options.directory
     * @param {Number} options.libraryID
     * @param {String} options.filename
     * @param {String} options.url
     * @param {Number} [options.parentItemID]
     * @param {String} [options.title]
     * @param {String} options.contentType
     * @param {String[]} [options.collections]
     * @param {Object} [options.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Zotero.Item}
     */
    createURLAttachmentFromTemporaryStorageDirectory(options: {}): Promise<Zotero.Item>;

    /**
     * Create a link attachment from a URL
     *
     * @param {Object} options - 'url', 'parentItemID', 'contentType', 'title', 'collections'
     * @param {Object} [options.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Promise<Zotero.Item>} - A promise for the created attachment item
     */
    linkFromURL(options: {}): Promise<Zotero.Item>;

    /**
     * TODO: what if called on file:// document?
     *
     * @param {Object} options - 'document', 'parentItemID', 'collections'
     * @param {Object} [options.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Promise<Zotero.Item>}
     */
    linkFromDocument(options: {}): Promise<Zotero.Item>;

    /**
     * Save a snapshot from a Document
     *
     * @param {Object} options - 'libraryID', 'document', 'parentItemID', 'forceTitle', 'collections'
     * @param {Object} [options.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Promise<Zotero.Item>} - A promise for the created attachment item
     */
    importFromDocument(options: {}): Promise<Zotero.Item>;

    /**
     * Save a snapshot from HTML page content given by SingleFile
     *
     * @param {Object} options
     * @param {String} options.url
     * @param {Object} options.snapshotContent - HTML content from SingleFile
     * @param {Integer} [options.parentItemID]
     * @param {Integer[]} [options.collections]
     * @param {String} [options.title]
     * @param {Object} [options.saveOptions] - Options to pass to Zotero.Item::save()
     * @return {Promise<Zotero.Item>} - A promise for the created attachment item
     */
    importFromSnapshotContent(options: {}): Promise<Zotero.Item>;

    /**
     * @param {String} url
     * @param {String} path
     * @param {Object} [options]
     * @param {Object} [options.cookieSandbox]
     * @param {String} [options.referrer]
     * @param {Boolean} [options.isPDF] - Delete file if not PDF
     */
    downloadFile(
      url: string,
      path: string,
      options?: { cookieSandbox?: object; referrer?: string },
    ): Promise<boolean>;

    /**
     * @param {String} url
     * @param {String} path
     * @param {Object} [options]
     * @param {Object} [options.cookieSandbox]
     */
    downloadPDFViaBrowser(
      url: string,
      path: string,
      options?: { cookieSandbox?: object },
    ): Promise<boolean>;

    InvalidPDFException: typeof Error & {
      message: "Downloaded PDF was not a PDF";
      stack: string;
    };

    canFindPDFForItem(item: Zotero.Item): boolean;

    /**
     * Get the PDF resolvers that can be used for a given item based on the available fields
     *
     * @param {Zotero.Item} item
     * @param {String[]} [methods=['doi', 'url', 'oa', 'custom']]
     * @param {Boolean} [automatic=false] - Only include custom resolvers with `automatic: true`
     * @return {Object[]} - An array of urlResolvers (see downloadFirstAvailableFile())
     */
    getPDFResolvers(
      item: Zotero.Item,
      methods?: Attachments.AccessMethod[],
      automatic?: boolean,
    ): Attachments.UrlResolver[];

    /**
     * Look for available PDFs for items and add as attachments
     *
     * @param {Zotero.Item[]} items
     * @param {Object} [options]
     * @param {String[]} [options.methods] - See getPDFResolvers()
     * @param {Number} [options.sameDomainRequestDelay=1000] - Minimum number of milliseconds
     *     between requests to the same domain (used in tests)
     * @return {Promise}
     */
    addAvailableFiles(
      items: Zotero.Item[],
      options?: {
        methods?: Attachments.AccessMethod[];
        sameDomainRequestDelay?: number;
      },
    ): Promise<void>;

    /**
     * @deprecated Use addAvailableFiles()
     */
    addAvailablePDFs(
      items: Zotero.Item[],
      options?: {
        methods?: Attachments.AccessMethod[];
        sameDomainRequestDelay?: number;
      },
    ): Promise<void>;

    /**
     * Look for an available PDF for an item and add it as an attachment
     *
     * @param {Zotero.Item} item
     * @param {Object} [options]
     * @param {String[]} [options.methods] - See getPDFResolvers()
     * @return {Zotero.Item|false} - New Zotero.Item, or false if unsuccessful
     */
    addAvailableFile(
      item: Zotero.Item,
      options?: { methods: Attachments.AccessMethod[] },
    ): Promise<Zotero.Item | false>;

    /**
     * @deprecated Use addAvailableFile()
     */
    addAvailablePDF(
      item: Zotero.Item,
      options?: { methods: Attachments.AccessMethod[] },
    ): Promise<Zotero.Item | false>;

    /**
     * Try to add a PDF to an item from a set of URL resolvers
     *
     * @param {Zotero.Item} item
     * @param {(String|Object|Function)[]} urlResolvers - See downloadFirstAvailableFile()
     * @param {Object} [options]
     * @param {Function} [options.onAccessMethodStart] - Function to run when a new access method
     *     is started, taking the access method name as an argument
     * @return {Zotero.Item|false} - New Zotero.Item, or false if unsuccessful
     */
    addPDFFromURLs(
      item: Zotero.Item,
      urlResolvers: Attachments.UrlResolver[],
      options?: { onAccessMethodStart: Function },
    ): Promise<Zotero.Item | false>;

    /**
     * Try to download a file from a set of URL resolvers, keeping the first one that succeeds
     *
     * URLs are only tried once.
     *
     * @param {(String|Object|Function)[]} urlResolvers - An array of URLs, objects, or functions
     *    that return arrays of objects. Objects should contain 'url' and/or 'pageURL' (the latter
     *    being a webpage that might contain a translatable PDF link), 'accessMethod' (which will
     *    be displayed in the save popup), and an optional 'articleVersion' ('submittedVersion',
     *    'acceptedVersion', or 'publishedVersion'). Functions that return promises are waited for,
     *    and functions aren't called unless a file hasn't yet been found from an earlier entry.
     * @param {String} path - Path to save file to
     * @param {Object} [options]
     * @param {Function} [options.onBeforeRequest] - Async function that runs before a request
     * @param {Function} [options.onAfterRequest] - Function that runs after a request
     * @param {Function} [options.onRequestError] - Function that runs when a request fails.
     *     Return true to retry request and false to skip.
     * @return {Object|false} - Object with successful 'url' and 'props' from the associated urlResolver,
     *     or false if no file could be downloaded
     */
    downloadFirstAvailableFile(
      urlResolvers: Array<
        | string
        | Attachments.UrlResolver
        | (() => Promise<Attachments.UrlResolver>)
      >,
      path: string,
      options: {
        onBeforeRequest: Function;
        onAfterRequest: Function;
        onRequestError: Function;
      },
    ): Promise<false | { url: string; props: unknown }>;

    /**
     * Returns a formatted string to use as the basename of an attachment
     * based on the metadata of the specified item and a format string
     *
     * (Optional) |formatString| specifies the format string -- otherwise
     * the 'attachmentRenameFormatString' pref is used
     *
     * Valid substitution markers:
     *
     * %c -- firstCreator
     * %y -- year (extracted from Date field)
     * %t -- title
     *
     * Fields can be truncated to a certain length by appending an integer
     * within curly brackets -- e.g. %t{50} truncates the title to 50 characters
     *
     * @param {Zotero.Item} item
     * @param {String} formatString
     */
    getFileBaseNameFromItem(item: Zotero.Item, formatString?: string): string;

    shouldAutoRenameFile(isLink: boolean): boolean;
    getRenamedFileTypes(): string[];
    getRenamedFileBaseNameIfAllowedType(
      parentItem: Zotero.Item,
      file: string,
    ): Promise<string>;

    /**
     * Create directory for attachment files within storage directory
     *
     * If a directory exists, delete and recreate
     *
     * @param {Number} itemID - Item id
     * @return {Promise<String>} - Path of new directory
     */
    createDirectoryForItem(item: Zotero.Item): Promise<string>;

    getStorageDirectory(item: Zotero.Item): nsIFile;
    getStorageDirectoryByID(itemID: number): nsIFile;
    getStorageDirectoryByLibraryAndKey(libraryID: number, key: string): nsIFile;
    createTemporaryStorageDirectory(): Promise<nsIFile>;

    /**
     * If path is within the attachment base directory, return a relative
     * path prefixed by BASE_PATH_PLACEHOLDER. Otherwise, return unchanged.
     */
    getBaseDirectoryRelativePath(path: string): string;

    /**
     * Get an absolute path from this base-dir relative path, if we can
     *
     * @param {String} path - Absolute path or relative path prefixed by BASE_PATH_PLACEHOLDER
     * @return {String|false} - Absolute path, or FALSE if no path
     */
    resolveRelativePath(path: string): string | false;

    fixPathSlashes(path: string): string;
    hasMultipleFiles(item: Zotero.Item): Promise<boolean>;

    /**
     * Returns the number of files in the attachment directory
     *
     * Only counts if MIME type is text/html
     *
     * @param	{Zotero.Item}	item	Attachment item
     */
    getNumFiles(item: Zotero.Item): Promise<number>;

    /**
     * @param {Zotero.Item} item
     * @param {Boolean} [skipHidden=true] - Don't count hidden files
     * @return {Promise<Integer>} - Promise for the total file size in bytes
     */
    getTotalFileSize(item: Zotero.Item, skipHidden?: boolean): Promise<number>;

    /**
     * Move attachment item, including file, to another library
     */
    moveAttachmentToLibrary(
      attachment: Zotero.Item,
      libraryID: number,
      parentItemID?: number,
    ): Promise<number>;

    /**
     * Copy attachment item, including file, to another library
     *
     * @return {Zotero.Item} - The new attachment
     */
    copyAttachmentToLibrary(
      attachment: Zotero.Item,
      libraryID: number,
      parentItemID?: number,
    ): Promise<Zotero.Item>;

    convertLinkedFileToStoredFile(
      item: Zotero.Item,
      options?: { move: boolean },
    ): Promise<Zotero.Item>;
    _getFileNameFromURL(url: string, contentType: string): string;
    _getExtensionFromURL(url: string, contentType: string): string;

    /**
     * Determines if a given document is an instance of PDFJS
     * @return {Boolean}
     */
    isPDFJS(doc: object): boolean;

    linkModeToName(linkMode: number): string;
    linkModeFromName(linkModeName: string): Attachments.LinkMode;
  }
}

declare namespace Zotero {
  const Attachments: _ZoteroTypes.Attachments;
}
