/**
 * Tweaks to the Gecko types to make them compatible with the current version of Zotero.
 */

/// <reference path="./gecko/index.d.ts" />

declare namespace ChromeUtils {
  function _import(aResourceURI: string, targetObj?: any): any;
  export { _import as import };
}

interface nsIXPCComponents_Utils {
  /**
   * @deprecated Use `ChromeUtils.import` instead. See also
   * @param aResourceURI
   * @param targetObj
   */
  import(aResourceURI: string, targetObj?: any): any;
}
