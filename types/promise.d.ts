declare namespace Zotero {
  interface Promise<T = void> extends globalThis.Promise<T> {
    method(fn: Function): () => _ZoteroTypes.PromiseWithResolved<T>;
    defer(): _ZoteroTypes.PromiseObject<T>;
    delay(timeout: number): globalThis.Promise<void>;
  }
}

declare namespace _ZoteroTypes {
  interface PromiseObject<T> {
    promise: Promise<T> & {
      isCancelled: () => boolean;
      isResolved: () => boolean;
      isRejected: () => boolean;
      isFulfilled: () => boolean;
      isPending: () => boolean;
      value: () => T;
      reason: () => T;
    };
    resolve(value?: T): void;
    reject(reason?: T): void;
  }

  class PromiseWithResolved<T> extends Promise<T> {
    isResolved: boolean;
  }
}
