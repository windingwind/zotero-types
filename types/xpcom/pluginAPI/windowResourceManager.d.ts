declare namespace _ZoteroTypes {
  interface WindowResourceManager {
    registerResource(options: {
      resourceID: string;
      pluginID: string;
      target: "mainWindow" | "preferencePane";
      type: "ftl" | "css";
      url: string;
    }): void;
    unregisterResource(resourceID: string): void;
  }
}
