/// <reference path="zotero_editor_instance.d.ts" />

declare const ZoteroContextPane: {
  [attr: string]: any;
  getActiveEditor: () => _ZoteroEditorInstance;
};
