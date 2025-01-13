/// <reference path="../data/item.d.ts" />
/// <reference path="../utilities_internal.d.ts" />

declare namespace _ZoteroTypes {
  interface Utilities {
    Internal: Utilities.Internal;

    XRegExp: any;
    Item: anyObj;

    /**
     * Returns a function which will execute `fn` with provided arguments after `delay` milliseconds and not more
     * than once, if called multiple times. See
     * http://stackoverflow.com/questions/24004791/can-someone-explain-the-debounce-function-in-javascript
     * @param fn {Function} function to debounce
     * @param delay {Integer} number of milliseconds to delay the function execution
     * @returns {Function}
     */
    debounce<F extends Function>(fn: F, delay?: number): F;

    /**
     *  Creates and returns a new, throttled version of the
     *  passed function, that, when invoked repeatedly,
     *  will only actually call the original function at most
     *  once per every wait milliseconds
     *
     *  By default, throttle will execute the function as soon
     *  as you call it for the first time, and, if you call it
     *  again any number of times during the wait period, as soon
     *  as that period is over. If you'd like to disable the
     *  leading-edge call, pass {leading: false}, and if you'd
     *  like to disable the execution on the trailing-edge,
     *  pass {trailing: false}. See
     *  https://underscorejs.org/#throttle
     *  https://github.com/jashkenas/underscore/blob/master/underscore.js
     *  (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     *  Underscore may be freely distributed under the MIT license.
     *
     *  @param {Function} func Function to throttle
     *  @param {Integer} wait Wait period in milliseconds
     *  @param {Boolean} [options.leading] Call at the beginning of the wait period
     *  @param {Boolean} [options.trailing] Call at the end of the wait period
     */
    throttle(
      func: Function,
      wait: number,
      options?: { leading: boolean; trailing: boolean },
    ): Function;

    sentenceCase(str: string): string;

    /**
     * Fixes author name capitalization.
     * Currently for all uppercase names only
     *
     * JOHN -> John
     * GUTIÉRREZ-ALBILLA -> Gutiérrez-Albilla
     * O'NEAL -> O'Neal
     *
     * @param {String} string Uppercase author name
     * @return {String} Title-cased author name
     */
    capitalizeName(str: string): string;

    /**
     * Cleans extraneous punctuation off a creator name and parse into first and last name
     *
     * @param {String} author Creator string
     * @param {String} type Creator type string (e.g., "author" or "editor")
     * @param {Boolean} useComma Whether the creator string is in inverted (Last, First) format
     * @return {Object} firstName, lastName, and creatorType
     */
    cleanAuthor(
      author: string,
      type: string,
      useComma?: boolean,
    ): { firstName: string; lastName: string; creatorType: string };

    /**
     * Removes leading and trailing whitespace from a string
     * @type String
     */
    trim(s: string): string;

    /**
     * Cleans whitespace off a string and replaces multiple spaces with one
     * @type String
     */
    trimInternal(s: string): string;

    /**
     * Cleans any non-word non-parenthesis characters off the ends of a string
     * @type String
     */
    superCleanString(x: string): string;

    isHTTPURL(url: string, allowNoScheme?: boolean): boolean;

    /**
     * Cleans a http url string
     * @param {String} url
     * @param {Boolean} tryHttp Attempt prepending 'http://' to the url
     * @returns {String}
     */
    cleanURL(url: string, tryHttp?: boolean): string;

    /**
     * Eliminates HTML tags, replacing &lt;br&gt;s with newlines
     * @type String
     */
    cleanTags(x: string): string;

    /**
     * Extract item identifiers (DOI, ISBN, arXiv, ADS Bibcode, PMID) from a string.
     * @type String
     */
    extractIdentifiers(
      text: string,
    ): (
      | { DOI: string }
      | { ISBN: string }
      | { arXiv: string }
      | { adsBibcode: string }
      | { PMID: string }
    )[];

    /**
     * Strip info:doi prefix and any suffixes from a DOI
     * @type String
     */
    cleanDOI(x: string): null | string;

    /**
     * Clean and validate ISBN.
     * Return isbn if valid, otherwise return false
     * @param {String} isbn
     * @param {Boolean} [dontValidate=false] Do not validate check digit
     * @return {String|Boolean} Valid ISBN or false
     */
    cleanISBN(isbn: string, dontValidate?: boolean): string | false;

    /**
     * Convert ISBN 10 to ISBN 13
     * @param {String} isbn ISBN 10 or ISBN 13 cleanISBN
     * @return {String} ISBN-13
     */
    toISBN13(isbnStr: string): string;

    /**
     * Clean and validate ISSN.
     * Return issn if valid, otherwise return false
     */
    cleanISSN(issnStr: string): string | false;

    /**
     * Convert plain text to HTML by replacing special characters and replacing newlines with BRs or
     * P tags
     * @param {String} str Plain text string
     * @param {Boolean} singleNewlineIsParagraph Whether single newlines should be considered as
     *     paragraphs. If true, each newline is replaced with a P tag. If false, double newlines
     *     are replaced with P tags, while single newlines are replaced with BR tags.
     * @type String
     */
    text2html(str: string, singleNewlineIsParagraph?: boolean): string;

    /**
     * Encode special XML/HTML characters
     * Certain entities can be inserted manually:
     *   <ZOTEROBREAK/> => <br/>
     *   <ZOTEROHELLIP/> => &#8230;
     *
     * @param {String} str
     * @return {String}
     */
    htmlSpecialChars(str: string): string;

    /**
     * Wrap URLs and DOIs in <a href=""> links in plain text
     *
     * Ignore URLs preceded by '>', just in case there are already links
     * @type String
     */
    autoLink(str: string): string;

    /**
     * Parses a text string for HTML/XUL markup and returns an array of parts. Currently only finds
     * HTML links (&lt;a&gt; tags)
     *
     * @return {Array} An array of objects with the following form:<br>
     * <pre>   {
     *         type: 'text'|'link',
     *         text: "text content",
     *         [ attributes: { key1: val [ , key2: val, ...] }
     *    }</pre>
     */
    parseMarkup(str: string): {
      type: "text" | "link";
      text: string;
      attributes?: { [attr: string]: unknown };
    };

    /**
     * Calculates the Levenshtein distance between two strings
     * @type Number
     */
    levenshtein(a: string, b: string): number;

    /**
     * Test if an object is empty
     *
     * @param {Object} obj
     * @type Boolean
     */
    isEmpty(obj: object): boolean;

    /**
     * Compares an array with another and returns an array with
     *	the values from array1 that don't exist in array2
     *
     * @param	{Array}		array1
     * @param	{Array}		array2
     * @param	{Boolean}	useIndex		If true, return an array containing just
     *										the index of array2's elements;
     *										otherwise return the values
     */
    arrayDiff<T>(array1: T[], array2: T[], useIndex?: false): T[];
    arrayDiff(array1: [], array2: [], useIndex: true): number[];

    /**
     * Determine whether two arrays are identical
     *
     * Modified from http://stackoverflow.com/a/14853974
     *
     * @return {Boolean}
     */
    arrayEquals(array1: [], array2: []): boolean;

    /**
     * Return new array with values shuffled
     *
     * From http://stackoverflow.com/a/6274398
     *
     * @param {Array} arr
     * @return {Array}
     */
    arrayShuffle<T>(arr: T[]): T[];

    /**
     * Return new array with duplicate values removed
     *
     * @param	{Array}		array
     * @return	{Array}
     */
    arrayUnique<T>(array: T[]): T[];

    /**
     * Generate a random integer between min and max inclusive
     *
     * @param	{Integer}	min
     * @param	{Integer}	max
     * @return	{Integer}
     */
    rand(min: number, max: number): number;

    /**
     * Parse a page range
     *
     * @param {String} Page range to parse
     * @return {Integer[]} Start and end pages
     */
    getPageRange(pages: string): [start: number, end: number];

    /**
     * Pads a number or other string with a given string on the left
     *
     * @param {String} string String to pad
     * @param {String} pad String to use as padding
     * @length {Integer} length Length of new padded string
     * @type String
     */
    lpad(str: string, pad: string, length: number): string;

    /**
     * Shorten and add an ellipsis to a string if necessary
     *
     * @param {String}	str
     * @param {Integer}	len
     * @param {Boolean} [wordBoundary=false]
     * @param {Boolean} [countChars=false]
     */
    ellipsize(
      str: string,
      len: number,
      wordBoundary?: boolean,
      countChars?: boolean,
    ): string;

    /**
     * Return the proper plural form of a string
     *
     * For now, this is only used for debug output in English.
     *
     * @param {Integer} num
     * @param {String[]|String} forms - If an array, an array of plural forms (e.g., ['object', 'objects']);
     *     currently only the two English forms are supported, for 1 and 0/many. If a single string,
     *     's' is added automatically for 0/many.
     * @return {String}
     */
    pluralize(num: number, forms: string | string[]): string;

    /**
     * Port of PHP's number_format()
     *
     * MIT Licensed
     *
     * From http://kevin.vanzonneveld.net
     * +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
     * +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
     * +     bugfix by: Michael White (http://getsprink.com)
     * +     bugfix by: Benjamin Lupton
     * +     bugfix by: Allan Jensen (http://www.winternet.no)
     * +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
     * +     bugfix by: Howard Yeend
     * *     example 1: number_format(1234.5678, 2, '.', '');
     * *     returns 1: 1234.57
     */
    numberFormat(
      number: number,
      decimals: number,
      dec_point?: string,
      thousands_sep?: string,
    ): string;

    /**
     * Cleans a title, converting it to title case and replacing " :" with ":"
     *
     * @param {String} string
     * @param {Boolean} force Forces title case conversion, even if the capitalizeTitles pref is off
     * @type String
     */
    capitalizeTitle(str: string, force?: boolean): string;

    capitalize(str: string): string;

    /**
     * Replaces accented characters in a string with ASCII equivalents
     *
     * @param {String} str
     * @param {Boolean} [lowercaseOnly]  Limit conversions to lowercase characters
     *                                   (for improved performance on lowercase input)
     * @return {String}
     *
     * From http://lehelk.com/2011/05/06/script-to-remove-diacritics/
     */
    removeDiacritics(str: string, lowercaseOnly?: boolean): string;

    /**
     * Performs a deep copy of a JavaScript object
     * @param {Object} obj
     * @return {Object}
     */
    deepCopy(obj: object): _ZoteroTypes.anyObj;

    /**
     * Find valid creator types for a given item type
     *
     * @param {String} type Item type
     * @return {String[]} Creator types
     */
    getCreatorsForType(type: _ZoteroTypes.Item.ItemType): string[];

    /**
     * Determine whether a given field is valid for a given item type
     *
     * @param {String} field Field name
     * @param {String} type Item type
     * @type Boolean
     */
    fieldIsValidForType(
      field: string,
      type: _ZoteroTypes.Item.ItemType,
    ): boolean;

    /**
     * Gets a creator type name, localized to the current locale
     *
     * @param {String} type Creator type
     * @param {String} Localized creator type
     * @type Boolean
     */
    getLocalizedCreatorType(type: string): string | false;

    /**
     * Escapes metacharacters in a literal so that it may be used in a regular expression
     */
    quotemeta(literal: string): string;

    /**
     * Generate a random string of length 'len' (defaults to 8)
     **/
    randomString(len?: number, chars?: string): string;

    /**
     * Adds a string to a given array at a given offset, converted to UTF-8
     * @param {String} string The string to convert to UTF-8
     * @param {Array|Uint8Array} array The array to which to add the string
     * @param {Integer} [offset] Offset at which to add the string
     */
    stringToUTF8Array(str: string, array: Uint8Array, offset?: number): void;

    /**
     * Gets the byte length of the UTF-8 representation of a given string
     * @param {String} string
     * @return {Integer}
     */
    getStringByteLength(str: string): number;

    semverCompare(a: string, b: string): number;
    allowedKeyChars: "23456789ABCDEFGHIJKLMNPQRSTUVWXYZ";

    /**
     * Generates a valid object key for the server API
     */
    generateObjectKey(): string;

    /**
     * Check if an object key is in a valid format
     */
    isValidObjectKey(key: string): boolean;

    /**
     * Walk the DOM and the contents of JSON data attributes in the HTML representation
     * of a note, calling visitor functions that might modify it and returning
     * the resulting HTML.
     *
     * Elements are visited in depth-first order. First the element itself is visited,
     * then its data attributes, then the URIs in its JSON attributes, then its subtree.
     *
     * @param {String} note Note HTML
     * @param {Object} visitors
     * @param {Function} [visitors.visitContainer]
     * @param {Function} [visitors.visitAnnotation]
     * @param {Function} [visitors.visitCitation]
     * @param {Function} [visitors.visitOtherElement]
     * @param {Function} [visitors.visitDataAttribute]
     * @param {Function} [visitors.visitURI] Return a replacement for the passed URI
     * @return {String} Potentially modified note HTML
     */
    walkNoteDOM(
      note: string,
      visitors: {
        visitContainer?: Function;
        visitAnnotation?: Function;
        visitCitation?: Function;
        visitOtherElement?: Function;
        visitDataAttribute?: Function;
        visitURI?: Function;
      },
    ): string;

    /**
     * Evaluate an XPath
     *
     * @param {element|element[]} node The element(s) to use as the context for the XPath
     * @param {String} xstring The XPath expression
     * @param {Object} [namespaces] An object whose keys represent namespace prefixes, and whose
     *                              values represent their URIs
     * @return {element[]} DOM elements matching XPath
     */
    xpath(
      node: HTMLElement | Document,
      xstring: string,
      namespaces?: any,
    ): HTMLElement[] | [];

    /**
     * Input xpath string, find corresponding HTML elements value/textContent/innerText/text/nodeValue.
     * When node is an array of element, the returned output is obtained by concatenating
     * the string of each element, and the default separator is ', '.
     *
     * @param node The node representing the document and context
     * @param xstring, xpath The XPath expression
     * @param namespaces An object whose keys represent namespace prefixes, and whose values represent their URIs
     * @param delimiter The string with which to join multiple matching nodes
     * @returns DOM elements matching XPath, or null if no elements exist
     */
    xpathText(
      node: HTMLElement | Document,
      xstring: string,
      namespaces?: any,
      delimiter?: undefined | string,
    ): string | null;
  }
}

declare namespace Zotero {
  const Utilities: _ZoteroTypes.Utilities;
}
