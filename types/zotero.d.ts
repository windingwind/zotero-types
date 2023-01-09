/// <reference path="contextPane.d.ts" />
/// <reference path="tabs.d.ts" />
/// <reference path="zoteroPane.d.ts" />
/// <reference path="itemTree.d.ts" />
/// <reference path="collectionTree.d.ts" />
/// <reference path="promise.d.ts" />
/// <reference path="xpcom/progressWindow.d.ts" />
/// <reference path="xpcom/editorInstance.d.ts" />
/// <reference path="xpcom/file.d.ts" />
/// <reference path="xpcom/data/notes.d.ts" />
/// <reference path="xpcom/notifier.d.ts" />
/// <reference path="xpcom/prefs.d.ts" />
/// <reference path="xpcom/reader.d.ts" />
/// <reference path="xpcom/uri.d.ts" />
/// <reference path="xpcom/data/feedItem.d.ts" />
/// <reference path="xpcom/data/item.d.ts" />
/// <reference path="xpcom/data/items.d.ts" />
/// <reference path="xpcom/data/library.d.ts" />
/// <reference path="xpcom/data/libraries.d.ts" />
/// <reference path="xpcom/data/collection.d.ts" />
/// <reference path="xpcom/data/collections.d.ts" />
/// <reference path="xpcom/data/cachedTypes.d.ts" />

/**
 * @example
 * var Zotero: _ZoteroConstructable = Components.classes[
 *  "@zotero.org/Zotero;1"
 * ].getService(Components.interfaces.nsISupports).wrappedJSObject;
 */
declare type _ZoteroConstructable = typeof Zotero;

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
    stack?: number | boolean
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
    columnNumber?: number
  ): void;

  getMainWindow(): Window;
  getActiveZoteroPane(): _ZoteroTypes.ZoteroPane;

  // Objects - defined in namespace _ZoteroTypes
  Prefs: _ZoteroTypes.Prefs;
  Notifier: _ZoteroTypes.Notifier;
  File: _ZoteroTypes.File;
  URI: _ZoteroTypes.URI;
  Items: _ZoteroTypes.Items;
  Collections: _ZoteroTypes.Collections;
  Libraries: _ZoteroTypes.Libraries;
  Reader: _ZoteroTypes.Reader;
  EditorInstanceUtilities: _ZoteroTypes.EditorInstanceUtilities;
  Notes: _ZoteroTypes.Notes;
  Searches: _ZoteroTypes.Searches;
  ItemTypes: _ZoteroTypes.ItemTypes;
  CreatorTypes: _ZoteroTypes.CreatorTypes;
  FileTypes: _ZoteroTypes.FileTypes;
  CharacterSets: _ZoteroTypes.CharacterSets;
  RelationPredicates: _ZoteroTypes.RelationPredicates;
  Annotations: _ZoteroTypes.Annotations;
  Attachments: _ZoteroTypes.Attachments;

  // Classes - defined in namespace Zotero
  DataObject: Zotero.DataObject;
  Item: Zotero.Item;
  Promise: Zotero.Promise;
  Collection: Zotero.Collection;
  Library: Zotero.Library;
  CachedTypes: Zotero.CachedTypes;
  Search: Zotero.Search;
  EditorInstance: Zotero.EditorInstance;
  ProgressWindow: Zotero.ProgressWindow;
}
