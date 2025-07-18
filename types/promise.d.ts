declare namespace Zotero {
  /**
   * @deprecated Use standard Promise instead.
   */
  const Promise: _ZoteroTypes.Promise.Promise &
    _ZoteroTypes.Promise.PromiseConstructor<() => void>;
}

declare namespace _ZoteroTypes {
  /**
   * @deprecated Use standard Promise instead.
   */
  namespace Promise {
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

    interface Promise<T = void> extends _ZoteroTypes.Promise.Bluebird<T> {
      method(fn: Function): () => _ZoteroTypes.Promise.Bluebird<T>;
      defer(): _ZoteroTypes.Promise.DeferredPromise<T>;
    }

    interface PromiseConstructor<T extends (...args: any) => any> {
      new (fn: T): _ZoteroTypes.Promise.Promise<ReturnType<T>>;
    }
  }
}
