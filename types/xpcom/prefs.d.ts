declare namespace _ZoteroTypes {
  interface Prefs {
    /**
     * Retrieve a preference
     */
    get(pref: string, global?: boolean): boolean | string | number | undefined;

    /**
     * Set a preference
     */
    set(pref: string, value: boolean | string | number, global?: boolean): any;

    clear(pref: string, global?: boolean): void;

    resetBranch(exclude?: string[], branch?: string): void;

    /**
     * @param {String} name - Preference name; if not global, this is on the extensions.zotero branch
     * @param {Function} handler
     * @param {Boolean} [global]
     * @return {Symbol} - Symbol to pass to unregisterObserver()
     */
    registerObserver(name: string, handler: Function, global?: boolean): symbol;

    /**
     * @param {Symbol} symbol - Symbol returned from registerObserver()
     */
    unregisterObserver(symbol: symbol): void;
  }
}
