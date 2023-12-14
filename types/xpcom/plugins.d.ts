declare namespace _ZoteroTypes {
  interface Plugins {
    init(): Promise<void>;
    getRootURI(id: string): Promise<string>;
    resolveURI(id: string, uri: string | URL): Promise<string>;
    getName(id: string): Promise<string>;
    getIconURI(id: string, idealSize: number): Promise<string | null>;
    addObserver(observer: _ZoteroTypes._PluginObserver): void;
    removeObserver(observer: _ZoteroTypes._PluginObserver): void;
  }
}

declare namespace _ZoteroTypes {
  type _PluginObserver = {
    install?(
      params: { id: string; version: string; rootURI: string },
      reason: number
    ): void;
    startup?(
      params: { id: string; version: string; rootURI: string },
      reason: number
    ): void;
    shutdown?(
      params: { id: string; version: string; rootURI: string },
      reason: number
    ): void;
    uninstall?(
      params: { id: string; version: string; rootURI: string },
      reason: number
    ): void;
  };
}
