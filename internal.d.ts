/// <reference path="./types/zotero.d.ts" />
/// <reference path="./types/gecko.d.ts" />

declare namespace _ZoteroTypes {
  type anyObj = { [key: string]: any };
  type MaybePromise<T> = T | Promise<T>;
  type MaybeArray<T> = T | Array<T>;
  type ZoteroObjectURI = string;
  type RelationsPredicate = "dc:relation" | "owl:sameAs" | "dc:replaces";
  type ObjectRelations = Record<
    _ZoteroTypes.RelationsPredicate,
    _ZoteroTypes.ZoteroObjectURI[]
  >;
  type IconURI = `chrome://zotero/skin/${string}`;
  // TODO: Add more specific types for icon URIs
  enum IconFile {}

  type React = typeof import("react");

  interface MainWindow extends Window {
    readonly Zotero: Zotero;
    readonly ZoteroPane: ZoteroPane;
    readonly ZoteroPane_Local: ZoteroPane;
    readonly Zotero_Tabs: _ZoteroTypes.Zotero_Tabs;
    readonly ZoteroContextPane: ZoteroContextPane;
    readonly Zotero_File_Interface: Zotero_File_Interface;

    readonly Components: nsIXPCComponents;
    readonly Cc: nsIXPCComponents_Classes;
    readonly Ci: nsIXPCComponents_Interfaces;
    readonly Cr: nsIXPCComponents_Results;
    readonly Cu: nsIXPCComponents_Utils;

    readonly Services: JSServices;
    readonly NetUtil: anyObj;

    readonly document: Document;
  }
}
