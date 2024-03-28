/// <reference path="../xul.d.ts" />

declare namespace _ZoteroTypes {
  class XULElementBase extends HTMLElement {
    readonly content: null | DocumentFragment;
    init(): void;
    destroy(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    _handleWindowUnload(): void;
  }
}
