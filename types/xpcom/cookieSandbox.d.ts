declare namespace _ZoteroTypes {
  /**
   * An isolated cookie context backed by a unique Mozilla userContextId,
   * created with {@link Zotero.HTTP.newCookieContext} (Zotero 10+).
   *
   * All HTTP requests and HiddenBrowsers that share the same context ID will
   * share a separate cookie jar, isolated from the default jar and from other
   * contexts. Call dispose() when finished to remove all cookies in the
   * context.
   *
   * @example
   * ```js
   * let cookieContext = Zotero.HTTP.newCookieContext();
   * await Zotero.HTTP.request('GET', url, { userContextId: cookieContext.id });
   * let cookies = cookieContext.getCookies('example.com');
   * cookieContext.dispose();
   * ```
   */
  interface CookieContext {
    id: number;
    getCookies(host: string): nsICookie[];
    dispose(): void;
  }
}

declare namespace Zotero {
  /**
   * @deprecated Removed in Zotero 10 — use {@link Zotero.HTTP.newCookieContext}
   *     and pass its numeric `id` as the `userContextId` request option.
   */
  interface CookieSandbox {
    new (
      browser: unknown,
      uri: string | URL,
      cookieData: string,
      userAgent: string,
    ): this;
  }
}
