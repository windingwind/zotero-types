/// <reference path="../platform.d.ts" />
/// <reference path="../zotero.d.ts" />

declare namespace _ZoteroTypes {
  interface File {
    pathToFile(pathOrFile: string | nsIFile): nsIFile;
    pathToFileURI(path: string): string;
    encodeFilePath(path: string): string;
    getExtension(file: string | nsIFile): string;
    getClosestDirectory(file: string): string | false;
    getSample: (
      file: nsIFile | string,
    ) =>
      | string
      | Promise<string>
      | Uint8Array
      | Promise<Uint8Array>
      | Promise<BufferSource>;
    getBinaryContentsAsync: (
      source: string | nsIFile,
      maxLength?: number,
    ) => Promise<string>;
    getContentsAsync: (
      source: string | nsIFile | nsIInputStream,
      charset?: string,
      maxLength?: number,
    ) =>
      | string
      | Promise<string>
      | Uint8Array
      | Promise<Uint8Array>
      | Promise<BufferSource>
      | Promise<void>;
    getContentsFromURL(url: string): string;
    getContentsFromURLAsync(url: string, options?: any): Promise<string>;
    getResource(url: string): string;
    getResourceAsync(url: string): Promise<string>;
    putContents(file: nsIFile, str: string): void;
    putContentsAsync: (
      path: string | nsIFile,
      data: string | nsIInputStream | ArrayBuffer,
      charset?: string,
    ) => Promise<void>;
    download(uri: string, path: string): Promise<void>;
    rename: (
      file: string,
      newName: string,
      options?: { overwrite?: boolean; unique: boolean },
    ) => Promise<string | false>;
    removeIfExists(path: string): Promise<void>;
    directoryIsEmpty(path: string): Promise<boolean>;
    iterateDirectory(
      path: string,
      onEntry: (entry: OS.File.Entry) => void,
    ): Promise<void>;
    canMoveDirectoryWithCommand(): boolean;
    canMoveDirectoryWithFunction(): boolean;
    moveDirectory: (
      oldDir: string,
      newDir: string,
      options?: object,
    ) => Promise<void | Error[]>;
    generateDataURI(file: string, contentType: string): string;
    setNormalFilePermissions(file: string): void | Promise<void>;
    createShortened: (
      file: string,
      type: any,
      mode: any,
      maxBytes: number,
    ) => string;
    moveToUnique(file: string, newFile: string): Promise<string>;
    copyToUnique(file: string, newFile: string): Promise<OS.File.Entry>;
    copyDirectory: (
      source: string | nsIFile,
      target: string | nsIFile,
    ) => Promise<void>;
    createDirectoryIfMissing(dir: string): void;
    createDirectoryIfMissingAsync(path: string, options?: any): Promise<void>;
    normalizeToUnix(path: string): string;
    directoryContains(dir: string, file: string): boolean;
    zipDirectory: (
      dirPath: string,
      zipPath: string,
      observer: any,
    ) => Promise<void | false>;
    truncateFileName(fileName: string, maxLength: number): string;
    getCharsetFromFile: (
      file: typeof OS.File,
      mimeType: string,
      callback: Function,
      args: any,
    ) => void;
    checkFileAccessError: (
      e: Error | any,
      file: string | nsIFile,
      operation: "create" | "delete" | any,
    ) => void;
    getEvictedICloudPath(path: string): string;
    isCloudStorageFolder(path: string): boolean;
    reveal(file: string): Promise<void>;
  }

  class Zotero_File_Interface {
    exportItemsToClipboard(items: Zotero.Item[], translatorID: string): void;
    importFile(options: {
      file: nsIFile | string | null;
      createNewCollection?: boolean;
    }): Promise<void>;
  }
}

declare const Zotero_File_Interface: _ZoteroTypes.Zotero_File_Interface;

declare namespace Zotero {
  const File: _ZoteroTypes.File;
}
