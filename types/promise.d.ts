declare namespace Zotero {
  interface Promise<T = void> extends _ZoteroTypes.Bluebird<T> {
    method(fn: Function): () => _ZoteroTypes.Bluebird<T>;
    defer(): _ZoteroTypes.DeferredPromise<T>;
  }
}

declare namespace _ZoteroTypes {
  type Bluebird<T> = import("bluebird")<T>;

  /**
   * @deprecated
   */
  type PromiseObject = DeferredPromise<unknown>;

  interface DeferredPromise<T> {
    promise: Bluebird<T>;
    resolve(value?: T): void;
    reject(reason?: T): void;
  }
}
