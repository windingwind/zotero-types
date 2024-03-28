/// <reference path="../xul.d.ts" />

declare namespace _ZoteroTypes {
  class XULElementBase extends HTMLElement {
    initialized: false;
    get content(): null | DocumentFragment;
    init(): void;
    destroy(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    _handleWindowUnload(): void;
  }
}
