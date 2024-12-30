/// <reference path="../zotero.d.ts" />

declare namespace _ZoteroTypes {
  namespace Utilities {
    /**
     * @class Utility functions not made available to translators
     */
    interface Internal {
      SNAPSHOT_SAVE_TIMEOUT: 30000;

      /**
       * Copy a text string to the clipboard
       */
      copyTextToClipboard(str: string): void;

      /**
       * Adapted from http://developer.mozilla.org/en/docs/nsICryptoHash
       *
       * @param	{String|nsIFile}	strOrFile
       * @param	{Boolean}			[base64=false]	Return as base-64-encoded string rather than hex string
       * @return	{String}
       */
      md5(strOrFile: string | nsIFile, base64?: boolean): string;

      /**
       * @param {OS.File|nsIFile|String} file  File or file path
       * @param {Boolean} [base64=FALSE]  Return as base-64-encoded string
       *                                  rather than hex string
       */
      md5Async(
        file: typeof OS.File | nsIFile | string,
        base64?: boolean,
      ): Promise<string>;

      /**
       * Adapted from http://developer.mozilla.org/en/docs/nsICryptoHash
       *
       * @param {String} str
       * @return	{String}
       */
      sha1(str: string): string;

      /**
       * Decode a binary string into a typed Uint8Array
       *
       * @param {String} data - Binary string to decode
       * @return {Uint8Array} Typed array holding data
       */
      _decodeToUint8Array(data: string): Uint8Array;

      /**
       * Decode a binary string to UTF-8 string
       *
       * @param {String} data - Binary string to decode
       * @return {String} UTF-8 encoded string
       */
      decodeUTF8(data: string): string;

      /**
       * Return the byte length of a UTF-8 string
       *
       * http://stackoverflow.com/a/23329386
       */
      byteLength(str: string): number;

      isOnlyEmoji(str: string): string;

      /**
       * Display a prompt from an error with custom buttons and a callback
       */
      errorPrompt(title: string, e: Error): void;

      saveDocument(doc: Document, destFile: string): Promise<void>;

      /**
       * Takes in a document, creates a JS Sandbox and executes the SingleFile
       * extension to save the page as one single file without JavaScript.
       *
       * @param {Object} document
       * @return {String} Snapshot of the page as a single file
       */
      snapshotDocument(doc: Document): string;

      createSnapshotSandbox(view: Window): unknown;

      /**
       * Launch a process
       * @param {nsIFile|String} cmd Path to command to launch
       * @param {String[]} args Arguments given
       * @return {Promise} Promise resolved to true if command succeeds, or an error otherwise
       */
      exec(cmd: string | nsIFile, args: string[]): Promise<true | Error>;

      /**
       * Get string data from the clipboard
       * @param {String[]} mimeType MIME type of data to get
       * @return {String|null} Clipboard data, or null if none was available
       */
      getClipboard(mimeType: string): string | null;

      /**
       * Determine if one Window is a descendant of another Window
       * @param {DOMWindow} suspected child window
       * @param {DOMWindow} suspected parent window
       * @return {boolean}
       */
      isIframeOf(childWindow: Window, parentWindow: Window): boolean;

      /**
       * Returns a DOMDocument object not attached to any window
       */
      getDOMDocument(): Document;

      /**
       * Update HTML links within XUL
       *
       * @param {HTMLElement} elem - HTML element to modify
       * @param {Object} [options] - Properties:
       *                                 .linkEvent - An object to pass to ZoteroPane.loadURI() to
       *                                 simulate modifier keys for link clicks. For example, to
       *                                 force links to open in new windows, pass with
       *                                 .shiftKey = true. If not provided, the actual event will
       *                                 be used instead.
       *                                 .callback - Function to call after launching URL
       */
      updateHTMLInXUL(
        elem: HTMLElement,
        options?: {
          updateHTMLInXUL?: unknown;
          shiftKey?: boolean;
          callback?: Function;
        },
      ): void;

      /**
       * Parse a Blob (e.g., as received from Zotero.HTTP.request()) into an HTML Document
       */
      blobToHTMLDocument(blob: Blob, url: string): Document;

      blobToText(blob: Blob, charset?: string): Promise<string>;

      /**
       * Converts Zotero.Item to a format expected by translators
       * This is mostly the Zotero web API item JSON format, but with an attachments
       * and notes arrays and optional compatibility mappings for older translators.
       *
       * @param {Zotero.Item} zoteroItem
       * @param {Boolean} legacy Add mappings for legacy (pre-4.0.27) translators
       * @return {Object}
       */
      itemToExportFormat(
        zoteroItem: Zotero.Item,
        legacy?: boolean,
        skipChildItems?: boolean,
      ): _ZoteroTypes.anyObj;

      /**
       * Find valid item fields in Extra field text
       *
       * There are a couple differences from citeproc-js behavior:
       *
       * 1) Key-value pairs can appear at the beginning of any line in Extra, not just the first two.
       * 2) For fields, the first occurrence of a valid field is used, not the last.
       *
       * @param {String} extra
       * @param {Zotero.Item} [item = null]
       * @param {String[]} [additionalFields] - Additional fields to skip other than those already
       *     on the provided item
       * @return {Object} - An object with 1) 'itemType', which may be null, 2) 'fields', a Map of
       *     field name to value, 3) 'creators', in API JSON syntax, and 4) 'extra', the remaining
       *     Extra string after removing the extracted values
       */
      extractExtraFields(
        extra: string,
        item?: Zotero.Item,
        additionalFields?: string[],
      ): {
        itemType?: _ZoteroTypes.Item.ItemType;
        fields: Map<keyof _ZoteroTypes.Item.ItemField, unknown>;
        creators: object;
        extra: string;
      };

      /**
       * @param {String} extra
       * @param {Map} fieldMap
       * @return {String}
       */
      combineExtraFields(
        extra: string,
        fieldMap: Map<keyof _ZoteroTypes.Item.ItemField, unknown>,
      ): string;

      _normalizeExtraKey(key: string): string;

      /**
       * Look for open-access PDFs for a given DOI using Zotero's Unpaywall mirror
       *
       * Note: This uses a private API. Please use Unpaywall directly for non-Zotero projects.
       *
       * @param {String} doi
       * @param {Object} [options]
       * @param {Number} [options.timeout] - Request timeout in milliseconds
       * @return {Object[]} - An array of objects with 'url' and/or 'pageURL' and 'version'
       *     ('submittedVersion', 'acceptedVersion', 'publishedVersion')
       */
      getOpenAccessPDFURLs(
        doi: string,
        options?: { timeout: number },
      ): Array<{
        url?: string;
        pageURL?: string;
        version: string;
      }>;

      /**
       * Run translation on a Document to try to find a PDF URL
       *
       * @param {doc} Document
       * @return {String|false} - PDF URL, or false if none found
       */
      getPDFFromDocument(doc: Document): string | false;

      /**
       * Hyphenate an ISBN based on the registrant table available from
       * https://www.isbn-international.org/range_file_generation
       * See isbn.js
       *
       * @param {String} isbn ISBN-10 or ISBN-13
       * @param {Boolean} dontValidate Do not attempt to validate check digit
       * @return {String} Hyphenated ISBN or empty string if invalid ISBN is supplied
       */
      hyphenateISBN(isbn: string, dontValidate?: boolean): string;

      camelToTitleCase(str: string): string;

      /**
       * Adds a localized colon to a string (which is usually just a colon, but, e.g., in French
       * there's a space before it)
       *
       * @param {String}
       * @return {String}
       */
      stringWithColon(str: string): string;

      resolveLocale(
        locale: _ZoteroTypes.AvailableLocales,
        locales: _ZoteroTypes.AvailableLocales[],
      ): _ZoteroTypes.AvailableLocales;

      /**
       * Get the next available numbered name that matches a base name, for use when duplicating
       *
       * - Given 'Foo' and ['Foo'], returns 'Foo 1'.
       * - Given 'Foo' and ['Foo', 'Foo 1'], returns 'Foo 2'.
       * - Given 'Foo' and ['Foo', 'Foo 1'], returns 'Foo 2'.
       * - Given 'Foo 1', ['Foo', 'Foo 1'], and trim=true, returns 'Foo 2'
       * - Given 'Foo' and ['Foo', 'Foo 2'], returns 'Foo 1'
       */
      getNextName(
        name: string,
        existingNames: string[],
        trim?: boolean,
      ): string;

      /**
       * Create a libraryOrCollection DOM tree to place in <menupopup> element.
       * If has no children, returns a <menuitem> element, otherwise <menu>.
       *
       * @param {Library|Collection} libraryOrCollection
       * @param {Node<menupopup>} elem Parent element
       * @param {Zotero.Library|Zotero.Collection} currentTarget Currently selected item (displays as checked)
       * @param {Function} clickAction function to execute on clicking the menuitem.
       * 		Receives the event and libraryOrCollection for given item.
       * @param {Function} disabledPred If provided, called on each library/collection
       * 		to determine whether disabled
       *
       * @return {Node<menuitem>|Node<menu>} appended node
       */
      createMenuForTarget(
        libraryOrCollection: Zotero.Library | Zotero.Collection,
        elem: XUL.MenuPopup,
        currentTarget: Zotero.Library | Zotero.Collection,
        clickAction: Function,
        disabledPred?: Function,
      ): XUL.MenuItem | XUL.Menu;

      openPreferences(paneID: string, options?: object): Window | null;
      filterStack(str: string): string;

      /**
       * Generate a function that produces a static output
       *
       * Zotero.lazy(fn) returns a function. The first time this function
       * is called, it calls fn() and returns its output. Subsequent
       * calls return the same output as the first without calling fn()
       * again.
       */
      lazy(fn: Function): Function;

      serial(fn: Function): Function;

      spawn(generator: GeneratorFunction, thisObj: object): Function;

      /**
       * Defines property on the object
       * More compact way to do Object.defineProperty
       *
       * @param {Object} obj Target object
       * @param {String} prop Property to be defined
       * @param {Object} desc Property descriptor. If not overridden, "enumerable" is true
       * @param {Object} opts Options:
       *   lazy {Boolean} If true, the _getter_ is intended for late
       *     initialization of the property. The getter is replaced with a simple
       *     property once initialized.
       */
      defineProperty(
        obj: object,
        prop: string,
        desc: object,
        opts?: { lazy: boolean },
      ): void;

      extendClass(superClass: object, newClass: object): void;

      /*
       * Flattens mixed arrays/values in a passed _arguments_ object and returns
       * an array of values -- allows for functions to accept both arrays of
       * values and/or an arbitrary number of individual values
       */
      flattenArguments(args: unknown[]): unknown[];

      /*
       * Sets font size based on prefs -- intended for use on root element
       *  (zotero-pane, note window, etc.)
       */
      setFontSize(rootElement: Element): void;

      getAncestorByTagName(elem: Element, tagName: string): Element | null;

      /**
       * Quits the program, optionally restarting.
       * @param {Boolean} [restart=false]
       */
      quit(restart?: boolean): void;

      /**
       * Assign properties to an object
       *
       * @param {Object} target
       * @param {Object} source
       * @param {String[]} [props] Properties to assign. Assign all otherwise
       */
      assignProps(target: object, source: object, props?: string[]): void;

      /**
       * Get the real target URL from an intermediate URL
       */
      resolveIntermediateURL(str: string): string;

      /**
       * Gets the icon for a JSON-style attachment
       */
      determineAttachmentIcon(
        attachment: object & { linkMode: string; mimeType: string },
      ): string;

      /**
       * A basic templating engine
       *
       * - 'if' statement does case-insensitive string comparison
       * - Spaces around '==' are necessary in 'if' statement
       *
       * Vars example:
       *  {
       * 	  color: '#ff6666',
       * 	  highlight: '<span class="highlight">This is a highlight</span>,
       *    comment: 'This is a comment',
       *    citation: '<span class="citation">(Author, 1900)</citation>',
       *    image: '<img src="…"/>',
       *    tags: (attrs) => ['tag1', 'tag2'].map(tag => tag.name).join(attrs.join || ' ')
       *  }
       *
       * Template example:
       *  {{if color == '#ff6666'}}
       *    <h2>{{highlight}}</h2>
       *  {{elseif color == '#2ea8e5'}}
       *    {{if comment}}<p>{{comment}}:</p>{{endif}}<blockquote>{{highlight}}</blockquote><p>{{citation}}</p>
       *  {{else}}
       *    <p>{{highlight}} {{citation}} {{comment}} {{if tags}} #{{tags join=' #'}}{{endif}}</p>
       *  {{endif}}
       *
       * @param {String} template
       * @param {Object} vars
       * @returns {String} HTML
       */
      generateHTMLFromTemplate(template: string, vars: object): string;

      sendToBack(): void;
      getProcessID: number;
      Base64: {
        encode(input: string): string;
        decode(input: string): string;
      };
      OpenURL: {
        /**
         * Returns a URL to look up an item in the OpenURL resolver
         */
        resolve(item: object): string | false;

        /**
         * Fetch list of resolvers from the Zotero wiki
         *
         * https://www.zotero.org/support/locate/openurl_resolvers
         */
        getResolvers(): Promise<
          Array<{
            continent: string;
            country: string;
            name: string;
            url: string;
            version: "1.0";
          }>
        >;
      };
    }
  }
}
