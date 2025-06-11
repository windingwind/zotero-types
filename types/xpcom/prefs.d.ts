/// <reference path="../gecko.d.ts" />

declare namespace Zotero {
  namespace Prefs {
    /**
     * Retrieve a preference
     */
    function get(
      pref: string,
      global?: boolean,
    ): boolean | string | number | undefined;

    /**
     * Set a preference
     */
    function set(
      pref: string,
      value: boolean | string | number,
      global?: boolean,
    ): any;

    function clear(pref: string, global?: boolean): void;

    function resetBranch(exclude?: string[], branch?: string): void;

    /**
     * @param {String} name - Preference name; if not global, this is on the extensions.zotero branch
     * @param {Function} handler
     * @param {Boolean} [global]
     * @return {Symbol} - Symbol to pass to unregisterObserver()
     */
    function registerObserver(
      name: string,
      handler: Function,
      global?: boolean,
    ): symbol;

    /**
     * @param {Symbol} symbol - Symbol returned from registerObserver()
     */
    function unregisterObserver(symbol: symbol): void;

    const rootBranch: nsIPrefBranch;
  }
}
