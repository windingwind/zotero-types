/// <reference path="contextPane.d.ts" />
/// <reference path="tabs.d.ts" />
/// <reference path="zoteroPane.d.ts" />
/// <reference path="itemTree.d.ts" />
/// <reference path="collectionTree.d.ts" />
/// <reference path="promise.d.ts" />
/// <reference path="xpcom/progressWindow.d.ts" />
/// <reference path="xpcom/editorInstance.d.ts" />
/// <reference path="xpcom/file.d.ts" />
/// <reference path="xpcom/notifier.d.ts" />
/// <reference path="xpcom/users.d.ts" />
/// <reference path="xpcom/prefs.d.ts" />
/// <reference path="xpcom/reader.d.ts" />
/// <reference path="xpcom/uri.d.ts" />
/// <reference path="xpcom/collectionTreeRow.d.ts" />
/// <reference path="xpcom/data/notes.d.ts" />
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
  URI: _ZoteroTypes.URI;
  Tags: _ZoteroTypes.Tags;
  File: _ZoteroTypes.File;
  Users: _ZoteroTypes.Users;
  Feeds: _ZoteroTypes.Feeds;
  Prefs: _ZoteroTypes.Prefs;
  Items: _ZoteroTypes.Items;
  Notes: _ZoteroTypes.Notes;
  Reader: _ZoteroTypes.Reader;
  Notifier: _ZoteroTypes.Notifier;
  Searches: _ZoteroTypes.Searches;
  Libraries: _ZoteroTypes.Libraries;
  ItemTypes: _ZoteroTypes.ItemTypes;
  FileTypes: _ZoteroTypes.FileTypes;
  Collections: _ZoteroTypes.Collections;
  Annotations: _ZoteroTypes.Annotations;
  Attachments: _ZoteroTypes.Attachments;
  CreatorTypes: _ZoteroTypes.CreatorTypes;
  CharacterSets: _ZoteroTypes.CharacterSets;
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
}

declare namespace _ZoteroTypes {
  /**
   * @example
   * var Zotero: _ZoteroConstructable = Components.classes[
   *  "@zotero.org/Zotero;1"
   * ].getService(Components.interfaces.nsISupports).wrappedJSObject;
   */
  type Zotero = typeof Zotero;
}
