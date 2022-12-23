declare interface _ZoteroPromise {
  method(fn: Function) => (): _PromiseWithResolved<any>;
  defer(): _ZoteroPromiseObject;
  delay(timeout: number): Promise<void>;
}

declare interface _ZoteroPromiseObject {
  promise: Promise<void>;
  resolve(): void;
  reject(): void;
}

declare class _PromiseWithResolved<T> extends Promise<T> {
  isResolved: boolean;
}
