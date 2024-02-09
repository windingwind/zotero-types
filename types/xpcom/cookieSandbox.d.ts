declare namespace Zotero {
  /**
   * Manage cookies in a sandboxed fashion
   *
   * @constructor
   * @param {browser} [browser] Hidden browser object
   * @param {String|nsIURI} uri URI of page to manage cookies for (cookies for domains that are not
   *                     subdomains of this URI are ignored)
   * @param {String} cookieData Cookies with which to initiate the sandbox
   * @param {String} userAgent User agent to use for sandboxed requests
   */
  interface CookieSandbox {
    new (
      browser: unknown,
      uri: string | URL,
      cookieData: string,
      userAgent: string,
    ): this;

    /**
     * Normalizes the host string: lower-case, remove leading period, some more cleanup
     * @param {string} host
     * @returns {string}
     */
    normalizeHost(host: string): string;

    /**
     * Normalizes the path string
     * @param {string} path
     * @returns {string}
     */
    normalizePath(path: string): string;

    /**
     * Generates a semicolon-separated string of cookie values from a list of cookies
     * @param {Object} cookies Object containing key: value cookie pairs
     * @returns {string}
     */
    generateCookieString(cookies: { [key: string]: string }): string;
  }
}
