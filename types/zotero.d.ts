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

declare namespace Zotero {
  type DataObject = _ZoteroDataObject;
  type Item = _ZoteroItem;
  type FeedItem = _ZoteroFeedItem;
  type Collection = _ZoteroCollection;
  type Library = _ZoteroLibrary;
  type EditorInstance = _ZoteroEditorInstance;
  type ProgressWindow = _ZoteroProgressWindow;
}

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
  getActiveZoteroPane(): _ZoteroPaneConstructable;

  Prefs: _ZoteroPrefs;
  Notifier: _ZoteroNotifier;
  Promise: _ZoteroPromise;
  File: _ZoteroFile;
  URI: _ZoteroURI;
  Items: _ZoteroItems;
  Collections: _ZoteroCollections;
  Libraries: _ZoteroLibraries;
  Reader: _ZoteroReader;
  EditorInstanceUtilities: _ZoteroEditorInstanceUtilities;
  Notes: _ZoteroNotes;
  ItemTypes: _ZoteroItemTypes;
  CreatorTypes: _ZoteroCreatorTypes;
  FileTypes: _ZoteroFileTypes;
  CharacterSets: _ZoteroCharacterSets;
  RelationPredicates: _ZoteroRelationPredicates;
  Annotations: _ZoteroAnnotations;

  DataObject: typeof _ZoteroDataObject;
  Item: typeof _ZoteroItem;
  Collection: typeof _ZoteroCollection;
  Library: typeof _ZoteroLibrary;
  EditorInstance: typeof _ZoteroEditorInstance;
  ProgressWindow: typeof _ZoteroProgressWindow;
  CachedTypes: typeof _ZoteroCachedTypes;
};
