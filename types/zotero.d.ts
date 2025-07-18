/// <reference path="zoteroTabs.d.ts" />
/// <reference path="zoteroPane.d.ts" />
/// <reference path="zoteroContextPane.d.ts" />
/// <reference path="itemTree.d.ts" />
/// <reference path="collectionTree.d.ts" />
/// <reference path="promise.d.ts" />
/// <reference path="xpcom/index.d.ts" />
/// <reference path="elements/index.d.ts" />
/// <reference path="reader/index.d.ts" />

declare namespace Zotero {
  /**
   * Debug logging function
   *
   * Uses prefs e.z.debug.log and e.z.debug.level (restart required)
   *
   * @param {} message
   * @param {Integer} [level=3]
   * @param {Integer} [maxDepth]
   * @param {Boolean|Integer} [stack] Whether to display the calling stack.
   *   If true, stack is displayed starting from the caller. If an integer,
   *   that many stack levels will be omitted starting from the caller.
   */
  function debug(
    message: any,
    level?: number,
    maxDepth?: number,
    stack?: number | boolean,
  ): void;

  /**
   * Log a message to the Mozilla JS error console
   *
   * |type| is a string with one of the flag types in nsIScriptError:
   *    'error', 'warning', 'exception', 'strict'
   */
  function log(
    message: any,
    type?: "error" | "warning" | "exception" | "strict",
    sourceName?: string,
    sourceLine?: string | number,
    lineNumber?: number,
    columnNumber?: number,
  ): void;

  /**
   * Log a JS error to the Mozilla error console and debug output
   * @param {Exception} err
   */
  function logError(err: Error): void;

  function warn(err: Error): void;

  /**
   * Display an alert in a given window
   *
   * @param {Window}
   * @param {String} title
   * @param {String} msg
   */
  function alert(window: Window, title: string, msg: string): void;

  function getMainWindow(): _ZoteroTypes.MainWindow;
  function getMainWindows(): _ZoteroTypes.MainWindow[];
  function getZoteroPanes(): _ZoteroTypes.ZoteroPane[];
  function getActiveZoteroPane(): _ZoteroTypes.ZoteroPane;
  function getStorageDirectory(): nsIFile;
  const setFontSize: typeof Utilities.Internal.setFontSize;
  const flattenArguments: typeof Utilities.Internal.flattenArguments;
  const getAncestorByTagName: typeof Utilities.Internal.getAncestorByTagName;
  const startupErrorHandler: () => void | undefined;
  const appName: string;
  const clientName: string;
  const resourcesDir: string;
  const locale: keyof _ZoteroTypes.AvailableLocales;
  const dir: "ltr" | "rtl";
  const platform: string;
  const platformMajorVersion: number;
  const version: string;
  const isMac: boolean;
  const isWin: boolean;
  const isLinux: boolean;
  const initialized: boolean;
  const skipLoading: boolean;
  const hiDPISuffix: string;
  const hiDPI: boolean;

  const initializationPromise: Promise<void>;
  const unlockPromise: Promise<void>;
  const uiReadyPromise: Promise<void>;
  const proxyAuthComplete: Promise<void>;

  /**
   * @property {Boolean} crashed - True if the application needs to be restarted
   */
  const crashed: boolean;

  /**
   * @property	{Boolean}	closing		True if the application is closing.
   */
  const closing: boolean;

  /**
   * @property	{Boolean}	locked		Whether all Zotero panes are locked
   *										with an overlay
   */
  const locked: boolean;

  /**
   * Initialize the extension
   *
   * @return {Promise<Boolean>}
   */
  function init(options?: object): Promise<boolean>;

  /**
   * Shuts down Zotero, calls a callback (that may return a promise),
   * then reinitializes Zotero. Returns a promise that is resolved
   * when this process completes.
   */
  function reinit(cbk: Function, options?: object): void | Promise<void>;

  /**
   * Triggers events when initialization finishes
   */
  function initComplete(): void;

  function uiIsReady(): void;
  function shutdown(): Promise<void>;
  function getProfileDirectory(): nsIFile;
  function getZoteroDirectory(): nsIFile;
  function getZoteroDatabase(): nsIFile;
  function getStylesDirectory(): nsIFile;
  function getTranslatorsDirectory(): nsIFile;
  function getTempDirectory(): nsIFile;
  function removeTempDirectory(): Promise<boolean>;

  function openMainWindow(): void;
  function openCheckForUpdatesWindow(): void;

  /**
   * Launch a file, the best way we can
   */
  function launchFile(file: string): void;

  /**
   * Launch a file with the given application
   */
  function launchFileWithApplication(
    filePath: string,
    applicationPath: string,
  ): void;

  /**
   * Launch a URL externally, the best way we can
   */
  function launchURL(url: string): void;

  /**
   * Opens a URL in the basic viewer, and optionally run a callback on load
   *
   * @param {String} uri
   * @param {Object} [options]
   * @param {Function} [options.onLoad] - Function to run once URI is loaded; passed the loaded document
   * @param {Object} [options.cookieSandbox] - Attach a cookie sandbox to the browser
   * @param {Boolean} [options.allowJavaScript] - Set to false to disable JavaScript
   */
  function openInViewer(
    uri: string,
    options?: {
      onLoad?: (doc: Document) => void;
      cookieSandbox?: Zotero.CookieSandbox;
      allowJavaScript?: boolean;
    },
  ): void;

  /**
   * Display an error message saying that an error has occurred and Zotero needs to be restarted.
   *
   * If |popup| is TRUE, display in popup progress window; otherwise, display as items pane message
   */
  function crash(popup?: boolean): void;

  function getErrors(asStrings?: false): unknown[];
  function getErrors(asStrings: true): string[];

  function isWin64EmulatedOnArm(): boolean;

  /**
   * Get versions, platform, etc.
   */
  function getSystemInfo(): Promise<string>;

  function getOSVersion(): Promise<string>;

  /**
   * @return {Promise<String[]>} - Promise for an array of extension names and versions
   */
  function getInstalledExtensions(): Promise<string[]>;

  const getString: typeof Intl.getString;

  function defineProperty(
    obj: object,
    prop: string,
    desc: object,
    opts?: { lazy: boolean },
  ): void;
  function extendClass(superClass: object, newClass: object): void;

  function getLocaleCollation(): Intl.Collator;
  function localeCompare(a: string, b: string): number;
  function randomString(len?: number, chars?: string): string;
  const lazy: typeof Utilities.Internal.lazy;
  const serial: typeof Utilities.Internal.serial;
  /**
   * @deprecated Removed in fx140 (Zotero 8.0)
   */
  const spawn: typeof Utilities.Internal.spawn;

  /**
   * Emulates the behavior of window.setTimeout
   *
   * @param {Function} func			The function to be called
   * @param {Integer} ms				The number of milliseconds to wait before calling func
   * @return {Integer} - ID of timer to be passed to clearTimeout()
   */
  function setTimeout(func: Function, ms: number): number;

  function clearTimeout(id: number): void;

  /**
   * Show Zotero pane overlay and progress bar in all windows
   *
   * @param {String} msg
   * @param {Boolean} [determinate=false]
   * @param {Boolean} [modalOnly=false] - Don't use popup if Zotero pane isn't showing
   * @return	{void}
   */
  function showZoteroPaneProgressMeter(
    msg: string,
    determinate?: boolean,
    modalOnly?: boolean,
  ): void;

  /**
   * @param	{Number}	percentage		Percentage complete as integer or float
   */
  function updateZoteroPaneProgressMeter(percentage: number): void;

  /**
   * Hide Zotero pane overlay in all windows
   */
  function hideZoteroPaneOverlays(): void;

  /**
   * Adds a listener to be called when Zotero shuts down (even if Firefox is not shut down)
   */
  function addShutdownListener(listener: Function): void;

  function updateQuickSearchBox(doc: Document): void;

  /**
   * Clear entries that no longer exist from various tables
   */
  function purgeDataObjects(): Promise<void>;

  function reloadDataObjects(): Promise<void>;

  /**
   * Brings Zotero Standalone to the foreground
   */
  function activateStandalone(): void;

  const Locale: {
    readonly availableLocales: _ZoteroTypes.AvailableLocales;
    defaultScriptDirection(
      locale: _ZoteroTypes.AvailableLocales,
    ): "ltr" | "rtl";
  };

  const Intl: {
    strings: {
      [key: string]: string;
    };

    collation: {
      compareString: (_: number, a: string, b: string) => number;
    };

    /**
     * @param {String} name
     * @param {String[]} [params=[]] - Strings to substitute for placeholders
     * @param {Number} [num] - Number (also appearing in `params`) to use when determining which plural
     *     form of the string to use; localized strings should include all forms in the order specified
     *     in https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals,
     *     separated by semicolons
     */
    getString: (
      name: string,
      params?: string | string[],
      num?: number,
    ) => string;
  };
}

// Below are not implemented types
declare namespace Zotero {
  let API: any;
  let Cite: any;
  let Debug: any;
  let Integration: any;
  let ItemFields: any;
  let PDFWorker: any;
  let QuickCopy: any;
  let Schema: any;
  let SearchConditions: any;
  let Styles: any;
  let Sync: any;
  let Translate: any;
  let Translators: any;
}

declare namespace _ZoteroTypes {
  /**
   * @example
   * var Zotero: _ZoteroConstructable = Components.classes[
   *  "@zotero.org/Zotero;1"
   * ].getService(Components.interfaces.nsISupports).wrappedJSObject;
   */
  type _ZoteroConstructable = typeof Zotero;
  type Zotero = _ZoteroConstructable;

  interface AvailableLocales {
    ar: "عربي";
    "bg-BG": "Български";
    br: "brezhoneg";
    "ca-AD": "Català";
    "cs-CZ": "Čeština";
    "da-DK": "Dansk";
    de: "Deutsch";
    "el-GR": "Ελληνικά";
    "en-AU": "English (Australian)";
    "en-CA": "English (Canada)";
    "en-US": "English";
    "en-GB": "English (UK)";
    "en-NZ": "English (New Zealand)";
    "es-ES": "Español";
    "et-EE": "Eesti keel";
    "eu-ES": "Euskara";
    fa: "فارسی";
    "fi-FI": "suomi";
    "fr-FR": "Français";
    "gl-ES": "Galego";
    "hu-HU": "magyar";
    "id-ID": "Bahasa Indonesia";
    "is-IS": "íslenska";
    "it-IT": "Italiano";
    "ja-JP": "日本語";
    km: "ខ្មែរ";
    "ko-KR": "한국어";
    "lt-LT": "Lietuvių";
    "nl-NL": "Nederlands";
    "nb-NO": "Norsk bokmål";
    "pl-PL": "Polski";
    "pt-BR": "Português (do Brasil)";
    "pt-PT": "Português (Europeu)";
    "ro-RO": "Română";
    "ru-RU": "Русский";
    "sk-SK": "slovenčina";
    "sl-SI": "Slovenščina";
    "sr-RS": "Српски";
    "sv-SE": "Svenska";
    "th-TH": "ไทย";
    "tr-TR": "Türkçe";
    "uk-UA": "Українська";
    "vi-VN": "Tiếng Việt";
    "zh-CN": "中文 (简体)";
    "zh-TW": "正體中文 (繁體)";
  }
}
