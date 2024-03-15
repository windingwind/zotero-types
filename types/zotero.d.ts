/// <reference path="contextPane.d.ts" />
/// <reference path="tabs.d.ts" />
/// <reference path="zoteroPane.d.ts" />
/// <reference path="itemTree.d.ts" />
/// <reference path="collectionTree.d.ts" />
/// <reference path="promise.d.ts" />
/// <reference path="xpcom/progressWindow.d.ts" />
/// <reference path="xpcom/editorInstance.d.ts" />
/// <reference path="xpcom/itemTreeManager.d.ts" />
/// <reference path="xpcom/itemPaneManager.d.ts" />
/// <reference path="xpcom/file.d.ts" />
/// <reference path="xpcom/http.d.ts" />
/// <reference path="xpcom/server.d.ts" />
/// <reference path="xpcom/notifier.d.ts" />
/// <reference path="xpcom/users.d.ts" />
/// <reference path="xpcom/plugins.d.ts" />
/// <reference path="xpcom/prefs.d.ts" />
/// <reference path="xpcom/preferencePanes.d.ts" />
/// <reference path="xpcom/reader.d.ts" />
/// <reference path="xpcom/uri.d.ts" />
/// <reference path="xpcom/collectionTreeRow.d.ts" />
/// <reference path="xpcom/data/notes.d.ts" />
/// <reference path="xpcom/data/creators.d.ts" />
/// <reference path="xpcom/data/tags.d.ts" />
/// <reference path="xpcom/data/feedItem.d.ts" />
/// <reference path="xpcom/data/feed.d.ts" />
/// <reference path="xpcom/data/feeds.d.ts" />
/// <reference path="xpcom/data/item.d.ts" />
/// <reference path="xpcom/data/items.d.ts" />
/// <reference path="xpcom/data/library.d.ts" />
/// <reference path="xpcom/data/libraries.d.ts" />
/// <reference path="xpcom/data/collection.d.ts" />
/// <reference path="xpcom/data/collections.d.ts" />
/// <reference path="xpcom/data/cachedTypes.d.ts" />
/// <reference path="xpcom/utilities/utilities.d.ts" />
/// <reference path="xpcom/utilities/date.d.ts" />

declare const Zotero: {
  [attr: string]: any;

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
  debug(
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
  log(
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
  logError(err: Error): void;

  warn(err: Error): void;

  /**
   * Display an alert in a given window
   *
   * @param {Window}
   * @param {String} title
   * @param {String} msg
   */
  alert(window: Window, title: string, msg: string): void;

  getMainWindow(): Window;
  getMainWindows(): Window[];
  getZoteroPanes(): _ZoteroTypes.ZoteroPane[];
  getActiveZoteroPane(): _ZoteroTypes.ZoteroPane;
  getStorageDirectory(): nsIFile;
  setFontSize(rootElement: Element): void;
  readonly startupErrorHandler?: () => void;
  locale: keyof _ZoteroTypes.AvailableLocales;
  dir: "ltr" | "rtl";
  platform: string;
  version: string;
  isMac: boolean;
  isWin: boolean;
  initialized: boolean;
  skipLoading: boolean;
  hiDPISuffix: string;

  /**
   * @property {Boolean} crashed - True if the application needs to be restarted
   */
  crashed: boolean;

  /**
   * @property	{Boolean}	closing		True if the application is closing.
   */
  closing: boolean;

  /**
   * @property	{Boolean}	locked		Whether all Zotero panes are locked
   *										with an overlay
   */
  locked: boolean;

  /**
   * Initialize the extension
   *
   * @return {Promise<Boolean>}
   */
  init(options?: object): Promise<boolean>;

  /**
   * Triggers events when initialization finishes
   */
  initComplete(): void;

  uiIsReady(): void;
  shutdown(): Promise<void>;
  getStylesDirectory(): nsIFile;
  getTranslatorsDirectory(): nsIFile;
  getTempDirectory(): nsIFile;
  removeTempDirectory(): Promise<boolean>;
  openCheckForUpdatesWindow(): void;

  /**
   * Launch a file, the best way we can
   */
  launchFile(file: string): void;

  /**
   * Launch a file with the given application
   */
  launchFileWithApplication(filePath: string, applicationPath: string): void;

  /**
   * Launch a URL externally, the best way we can
   */
  launchURL(url: string): void;

  /**
   * Opens a URL in the basic viewer, and optionally run a callback on load
   *
   * @param {String} uri
   * @param {Object} [options]
   * @param {Function} [options.onLoad] - Function to run once URI is loaded; passed the loaded document
   * @param {Object} [options.cookieSandbox] - Attach a cookie sandbox to the browser
   * @param {Boolean} [options.allowJavaScript] - Set to false to disable JavaScript
   */
  openInViewer(
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
  crash(popup?: boolean): void;

  getErrors(asStrings?: false): unknown[];
  getErrors(asStrings: true): string[];

  /**
   * Get versions, platform, etc.
   */
  getSystemInfo(): Promise<string>;

  /**
   * @return {Promise<String[]>} - Promise for an array of extension names and versions
   */
  getInstalledExtensions(): Promise<string[]>;

  defineProperty(
    obj: object,
    prop: string,
    desc: object,
    opts?: { lazy: boolean },
  ): void;
  extendClass(superClass: object, newClass: object): void;
  randomString(len?: number, chars?: string): string;
  lazy(fn: Function): Function;

  /**
   * Emulates the behavior of window.setTimeout
   *
   * @param {Function} func			The function to be called
   * @param {Integer} ms				The number of milliseconds to wait before calling func
   * @return {Integer} - ID of timer to be passed to clearTimeout()
   */
  setTimeout(func: Function, ms: number): number;

  clearTimeout(id: number): void;

  /**
   * Show Zotero pane overlay and progress bar in all windows
   *
   * @param {String} msg
   * @param {Boolean} [determinate=false]
   * @param {Boolean} [modalOnly=false] - Don't use popup if Zotero pane isn't showing
   * @return	{void}
   */
  showZoteroPaneProgressMeter(
    msg: string,
    determinate?: boolean,
    modalOnly?: boolean,
  ): void;

  /**
   * @param	{Number}	percentage		Percentage complete as integer or float
   */
  updateZoteroPaneProgressMeter(percentage: number): void;

  /**
   * Hide Zotero pane overlay in all windows
   */
  hideZoteroPaneOverlays(): void;

  /**
   * Adds a listener to be called when Zotero shuts down (even if Firefox is not shut down)
   */
  addShutdownListener(listener: Function): void;

  updateQuickSearchBox(doc: Document): void;

  /**
   * Clear entries that no longer exist from various tables
   */
  purgeDataObjects(): Promise<void>;

  /**
   * Brings Zotero Standalone to the foreground
   */
  activateStandalone(): void;

  // Objects - defined in namespace _ZoteroTypes
  URI: _ZoteroTypes.URI;
  Tags: _ZoteroTypes.Tags;
  File: _ZoteroTypes.File;
  HTTP: _ZoteroTypes.HTTP;
  Users: _ZoteroTypes.Users;
  Feeds: _ZoteroTypes.Feeds;
  Server: _ZoteroTypes.Server;
  Plugins: _ZoteroTypes.Plugins;
  PreferencePanes: _ZoteroTypes.PreferencePanes;
  Prefs: _ZoteroTypes.Prefs;
  Items: _ZoteroTypes.Items;
  Notes: _ZoteroTypes.Notes;
  Reader: _ZoteroTypes.Reader;
  Creators: _ZoteroTypes.Creators;
  Notifier: _ZoteroTypes.Notifier;
  Searches: _ZoteroTypes.Searches;
  Utilities: _ZoteroTypes.Utilities;
  Date: _ZoteroTypes.Utilities_Date;
  Libraries: _ZoteroTypes.Libraries;
  ItemTypes: _ZoteroTypes.ItemTypes;
  FileTypes: _ZoteroTypes.FileTypes;
  Collections: _ZoteroTypes.Collections;
  Annotations: _ZoteroTypes.Annotations;
  Attachments: _ZoteroTypes.Attachments;
  CreatorTypes: _ZoteroTypes.CreatorTypes;
  CharacterSets: _ZoteroTypes.CharacterSets;
  ItemTreeManager: _ZoteroTypes.ItemTreeManager;
  ItemPaneManager: _ZoteroTypes.ItemPaneManager;
  RelationPredicates: _ZoteroTypes.RelationPredicates;
  CollectionTreeCache: _ZoteroTypes.CollectionTreeCache;
  EditorInstanceUtilities: _ZoteroTypes.EditorInstanceUtilities;

  // Classes - defined in namespace Zotero
  Library: _ZoteroTypes.Library;
  Item: Zotero.Item;
  Feed: Zotero.Feed;
  Search: Zotero.Search;
  Promise: Zotero.Promise;
  DataObject: Zotero.DataObject;
  Collection: Zotero.Collection;
  CachedTypes: Zotero.CachedTypes;
  EditorInstance: Zotero.EditorInstance;
  ProgressWindow: Zotero.ProgressWindow;
  CollectionTreeRow: Zotero.CollectionTreeRow;

  Locale: {
    readonly availableLocales: _ZoteroTypes.AvailableLocales;
    defaultScriptDirection(
      locale: _ZoteroTypes.AvailableLocales,
    ): "ltr" | "rtl";
  };
};

declare namespace _ZoteroTypes {
  /**
   * @example
   * var Zotero: _ZoteroConstructable = Components.classes[
   *  "@zotero.org/Zotero;1"
   * ].getService(Components.interfaces.nsISupports).wrappedJSObject;
   */
  type Zotero = typeof Zotero;

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
