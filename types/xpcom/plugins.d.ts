declare namespace _ZoteroTypes {
  interface Plugins {
    init(): Promise<void>;
    getRootURI(id: string): Promise<string>;
    resolveURI(id: string, uri: string | URL): Promise<string>;
    getName(id: string): Promise<string>;
    getIconURI(id: string, idealSize: number): Promise<string | null>;
    addObserver(observer: Plugins.observer): void;
    removeObserver(observer: Plugins.observer): void;
  }

  namespace Plugins {
    type _observerFunction = (
      params: { id: string; version: string; rootURI: string },
      reason: number,
    ) => void;

    type observer = {
      install?: _observerFunction;
      startup?: _observerFunction;
      shutdown?: _observerFunction;
      uninstall?: _observerFunction;
    };
  }
}

declare namespace Zotero {
  const Plugins: _ZoteroTypes.Plugins;
}
