/// <reference path="base.d.ts" />
/// <reference path="../xpcom/data/item.d.ts" />

declare namespace _ZoteroTypes {
  class ItemPane extends XULElementBase {
    get content(): DocumentFragment;
    collectionTreeRow: any;
    itemsView: any;
    editable: boolean;
    mode: "message" | "item" | "note" | "duplicates";
    render(): boolean;
    notify(action: "modify", type: "item"): void;
    renderNoteEditor(item: Zotero.Item): void;
    renderItemPane(item: Zotero.Item): true;
    renderMessage(): boolean;
    setItemPaneMessage(message: string): void;

    /**
     * Display buttons at top of item pane depending on context
     */
    updateItemPaneButtons(): void;

    renderPublicationsHead(data: {
      doc: Document;
      append: Document["append"];
    }): void;
    renderTrashHead(data: { doc: Document; append: Document["append"] }): void;
    renderFeedHead(data: { doc: Document; append: Document["append"] }): void;
    updateReadLabel(): void;
    setReadLabel(isRead: boolean): void;
    translateSelectedItems(): Promise<void>;
    buildTranslateSelectContextMenu(event: Event): void;
    setTranslateButton(): void;
    setTranslationTarget(translationTarget: unknown): void;
    static get observedAttributes():
      | "collapsed"
      | "width"
      | "height"
      | "view-type";
    attributeChangedCallback(
      name: "collapsed" | "width" | "height" | "view-type",
      oldValue?: string,
      newValue?: string,
    ): void;
    handleBlur(): Promise<void>;
    handleResize(): void;
  }
}
