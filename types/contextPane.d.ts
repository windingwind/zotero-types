/// <reference path="xpcom/editorInstance.d.ts" />
/// <reference path="xul.d.ts" />

declare const ZoteroContextPane: {
  readonly activeEditor?: Zotero.EditorInstance;
  readonly sidenav: XUL.Element;
  readonly splitter: XUL.Element;
  showLoadingMessage(isShow: boolean): void;
  init(): void;
  destroy(): void;
  update(): void;
  focus(): void;
  togglePane(): void;
  updateAddToNote(): void;
};
