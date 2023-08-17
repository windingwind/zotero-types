declare namespace _ZoteroTypes {
  namespace Reader {
    class NavStack<T> {
      private _backStack: T[];
      private _forwardStack: T[];
      canPopBack(): boolean;
      canPopForward(): boolean;
      push(value: T): void;
      popBack(): T;
      popForward(): T;
    }
  }
}
