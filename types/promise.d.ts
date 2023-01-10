declare namespace Zotero {
  interface Promise<T = void> extends globalThis.Promise<T> {
    method(fn: Function): () => _ZoteroTypes.PromiseWithResolved<T>;
    defer(): _ZoteroTypes.PromiseObject;
    delay(timeout: number): globalThis.Promise<void>;
  }
}

declare namespace _ZoteroTypes {
  interface PromiseObject {
    promise: Promise<void>;
    resolve(): void;
    reject(): void;
  }

  class PromiseWithResolved<T> extends Promise<T> {
    isResolved: boolean;
  }
}
