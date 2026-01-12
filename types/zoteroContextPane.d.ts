/// <reference path="elements/index.d.ts" />

declare namespace _ZoteroTypes {
  class ZoteroContextPane {
    readonly activeEditor?: Zotero.EditorInstance;
    readonly sidenav: XULElement;
    readonly splitter: XULElement;
    // TODO: complete type
    readonly context: any;
    showLoadingMessage(isShow: boolean): void;
    init(): void;
    destroy(): void;
    update(): void;
    focus(): void;
    togglePane(): void;
    collapsed: boolean;
    updateAddToNote(): void;
  }
}
