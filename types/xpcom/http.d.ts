/// <reference path="./cookieSandbox.d.ts" />

declare namespace _ZoteroTypes {
  /**
   * Functions for performing HTTP requests, both via XMLHTTPRequest and using a hidden browser
   * @namespace
   */
  interface HTTP {
    /**
     * Get a promise for a HTTP request
     *
     * @param {String} method - The method of the request ("GET", "POST", etc.)
     * @param {nsIURI|String} url - URL to request
     * @param {Object} [options] Options for HTTP request:
     * @param {String} [options.body] - The body of a POST request
     * @param {Object | Headers} [options.headers] - HTTP headers to send with the request
     * @param {Boolean} [options.followRedirects = true] - Object of HTTP headers to send with the
     *     request
     * @param {Zotero.CookieSandbox} [options.cookieSandbox] - The sandbox from which cookies should
     *     be taken
     * @param {Boolean} [options.debug] - Log response text and status code
     * @param {Boolean} [options.noCache] - If set, specifies that the request should not be
     *     fulfilled from the cache
     * @param {Boolean} [options.dontCache] - Deprecated
     * @param {Boolean} [options.foreground] - Make a foreground request, showing
     *     certificate/authentication dialogs if necessary
     * @param {Number} [options.logBodyLength=1024] - Length of request body to log
     * @param {Function} [options.requestObserver] - Callback to receive XMLHttpRequest after open()
     * @param {Function} [options.cancellerReceiver] - Callback to receive a function to cancel
     *     the operation
     * @param {String} [options.responseType] - The type of the response. See XHR 2 documentation
     *     for legal values
     * @param {String} [options.responseCharset] - The charset the response should be interpreted as
     * @param {Number[]|false} [options.successCodes] - HTTP status codes that are considered
     *     successful, or FALSE to allow all
     * @param {Zotero.CookieSandbox} [options.cookieSandbox] - Cookie sandbox object
     * @param {Number} [options.timeout = 30000] - Request timeout specified in milliseconds, or 0
     *     for no timeout
     * @param {Number[]} [options.errorDelayIntervals] - Array of milliseconds to wait before
     *     retrying after 5xx error; if unspecified, a default set is used
     * @param {Number} [options.errorDelayMax = 3600000] - Milliseconds to wait before stopping
     *     5xx retries; set to 0 to disable retrying
     * @return {Promise<XMLHttpRequest>} - A promise resolved with the XMLHttpRequest object if the
     *     request succeeds or rejected if the browser is offline or a non-2XX status response
     *     code is received (or a code not in options.successCodes if provided).
     */
    request(
      method: string,
      url: string,
      options?: {
        body?: string | Uint8Array;
        headers?: any;
        followRedirects?: boolean;
        cookieSandbox?: Zotero.CookieSandbox;
        debug?: boolean;
        noCache?: boolean;
        dontCache?: boolean;
        foreground?: boolean;
        logBodyLength?: number;
        requestObserver?: Function;
        cancellerReceiver?: Function;
        responseType?: string;
        responseCharset?: string;
        successCodes?: number[] | false;
        timeout?: number;
        errorDelayIntervals?: number[];
        errorDelayMax?: number;
      },
    ): Promise<XMLHttpRequest>;

    /**
     * Send an HTTP GET request via XMLHTTPRequest
     *
     * @param {nsIURI|String}	url				URL to request
     * @param {Function} 		onDone			Callback to be executed upon request completion
     * @param {String} 		responseCharset	Character set to force on the response
     * @param {Zotero.CookieSandbox} [cookieSandbox] Cookie sandbox object
     * @param {Object} requestHeaders HTTP headers to include with request
     * @return {XMLHttpRequest} The XMLHttpRequest object if the request was sent, or
     *     false if the browser is offline
     * @deprecated Use {@link Zotero.HTTP.request}
     */
    doGet(
      url: string | URL,
      onDone: (xhr: XMLHttpRequest) => void | Promise<void>,
      responseCharset: string,
      cookieSandbox?: Zotero.CookieSandbox,
      requestHeaders?: Record<string, string>,
    ): XMLHttpRequest;

    /**
     * Send an HTTP POST request via XMLHTTPRequest
     *
     * @param {String} url URL to request
     * @param {String} body Request body
     * @param {Function} onDone Callback to be executed upon request completion
     * @param {String} headers Request HTTP headers
     * @param {String} responseCharset Character set to force on the response
     * @param {Zotero.CookieSandbox} [cookieSandbox] Cookie sandbox object
     * @return {XMLHttpRequest} The XMLHttpRequest object if the request was sent, or
     *     false if the browser is offline
     * @deprecated Use {@link Zotero.HTTP.request}
     */
    doPost(
      url: string | URL,
      body: string,
      onDone: (xhr: XMLHttpRequest) => void | Promise<void>,
      headers: Record<string, string>,
      responseCharset: string,
      cookieSandbox?: Zotero.CookieSandbox,
    ): XMLHttpRequest;

    /**
     * Send an HTTP HEAD request via XMLHTTPRequest
     *
     * @param {String} url URL to request
     * @param {Function} onDone Callback to be executed upon request completion
     * @param {Object} requestHeaders HTTP headers to include with request
     * @param {Zotero.CookieSandbox} [cookieSandbox] Cookie sandbox object
     * @return {XMLHttpRequest} The XMLHttpRequest object if the request was sent, or
     *     false if the browser is offline
     * @deprecated Use {@link Zotero.HTTP.request}
     */
    doHead(
      url: string | URL,
      onDone: (xhr: XMLHttpRequest) => void | Promise<void>,
      requestHeaders: Record<string, string>,
      cookieSandbox?: Zotero.CookieSandbox,
    ): XMLHttpRequest;

    /**
     * Send an HTTP OPTIONS request via XMLHTTPRequest
     *
     * @param	{nsIURI}		url
     * @param	{Function}	onDone
     * @return	{XMLHTTPRequest}
     * @deprecated Use {@link Zotero.HTTP.request}
     */
    doOptions(
      url: string | URL,
      onDone: (xhr: XMLHttpRequest) => void | Promise<void>,
    ): XMLHttpRequest;

    /**
     * Make a foreground HTTP request in order to trigger a proxy authentication dialog
     *
     * Other Zotero.HTTP requests are background requests by default, and
     * background requests don't trigger a proxy auth prompt, so we make a
     * foreground request on startup and resolve the promise
     * Zotero.proxyAuthComplete when we're done. Any network requests that want
     * to wait for proxy authentication can wait for that promise.
     */
    triggerProxyAuth(): false | undefined;

    /**
     * Checks if the browser is currently in "Offline" mode
     *
     * @type Boolean
     */
    browserIsOffline(): boolean;

    /**
     * Load one or more documents using XMLHttpRequest
     *
     * This should stay in sync with the equivalent function in the connector
     *
     * @param {String|String[]} urls URL(s) of documents to load
     * @param {Function} processor - Callback to be executed for each document loaded; if function returns
     *     a promise, it's waited for before continuing
     * @param {Object} [options]
     * @param {Zotero.CookieSandbox} [options.cookieSandbox] - Cookie sandbox object
     * @param {Object} [options.headers] - Headers to include in the request
     * @return {Promise<Array>} - A promise for an array of results from the processor runs
     */
    processDocuments<T>(
      urls: string | string[],
      processor: (doc: Document, responseURL: string) => T | Promise<T>,
      options?: {
        cookieSandbox?: Zotero.CookieSandbox;
        headers?: Record<string, string>;
      },
    ): Promise<T[]>;

    /**
     * Wraps an HTMLDocument object returned by XMLHttpRequest DOMParser to make it look more like it belongs
     * to a browser. This is necessary if the document is to be passed to Zotero.Translate.
     * @param {HTMLDocument} doc Document returned by
     * @param {nsIURL|String} url
     */
    wrapDocument(doc: Document, url: string | URL): Document;

    Location: (url: URL) => Location;
    Window: (url: URL) => Window;
  }
}

declare namespace Zotero {
  const HTTP: _ZoteroTypes.HTTP;
}
