/// <reference path="zotero_context_pane.d.ts" />
/// <reference path="zotero_data.d.ts" />
/// <reference path="zotero_editor_instance.d.ts" />
/// <reference path="zotero_file.d.ts" />
/// <reference path="zotero_notes.d.ts" />
/// <reference path="zotero_notifier.d.ts" />
/// <reference path="zotero_pane.d.ts" />
/// <reference path="zotero_prefs.d.ts" />
/// <reference path="zotero_promise.d.ts" />
/// <reference path="zotero_reader.d.ts" />
/// <reference path="zotero_tabs.d.ts" />
/// <reference path="zotero_uri.d.ts" />

/*
  Example:
  var Zotero: _ZoteroConstructable = Components.classes[
    "@zotero.org/Zotero;1"
  ].getService(Components.interfaces.nsISupports).wrappedJSObject;
*/
declare type _ZoteroConstructable = typeof Zotero;

declare namespace Zotero {
  type DataObject = _ZoteroDataObject;
  type Item = _ZoteroItem;
  type Collection = _ZoteroCollection;
  type Library = _ZoteroLibrary;
  type EditorInstance = _ZoteroEditorInstance;
}

declare const Zotero: {
  [attr: string]: any;
  debug: (message, level?, maxDepth?, stack?) => void;
  log: (
    message,
    type?,
    sourceName?,
    sourceLine?,
    lineNumber?,
    columnNumber?
  ) => void;
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
};
