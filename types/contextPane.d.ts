/// <reference path="xpcom/editorInstance.d.ts" />

declare const ZoteroContextPane: {
  [attr: string]: any;
  getActiveEditor(): _ZoteroEditorInstance;
};
