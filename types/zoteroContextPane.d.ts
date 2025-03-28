/// <reference path="elements/index.d.ts" />

declare namespace _ZoteroTypes {
  class ZoteroContextPane {
    readonly activeEditor?: Zotero.EditorInstance;
    readonly sidenav: XULElement;
    readonly splitter: XULElement;
    showLoadingMessage(isShow: boolean): void;
    init(): void;
    destroy(): void;
    update(): void;
    focus(): void;
    togglePane(): void;
    updateAddToNote(): void;
  }
}
