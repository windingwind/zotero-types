/// <reference path="../platform.d.ts" />
/// <reference path="../zotero.d.ts" />

declare namespace _ZoteroTypes {
  interface File {
    REPLACEMENT_CHARACTER: string;
    pathToFile(pathOrFile: string | nsIFile): nsIFile;
    pathToFileURI(path: string): string;
    encodeFilePath(path: string): string;
    getExtension(file: string | nsIFile): string;
    isLikeExtension(extension: string): boolean;
    getClosestDirectory(file: string): string | false;
    getSample: (
      file: nsIFile | string,
    ) =>
      | string
      | Promise<string>
      | Uint8Array
      | Promise<Uint8Array>
      | Promise<BufferSource>;
    /** @deprecated Use {@link getBinaryContentsAsync} instead. */
    getBinaryContents(file: nsIFile): string;
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
    /** @deprecated Use {@link getContentsFromURLAsync} instead. */
    getContentsFromURL(url: string): string;
    getContentsFromURLAsync(url: string, options?: any): Promise<string>;
    /** @deprecated Use {@link getResourceAsync} instead. */
    getResource(url: string): string;
    getResourceAsync(url: string): Promise<string>;
    /** @deprecated Use {@link getContentsAsync} instead. */
    getContents(
      file: string | nsIFile | nsIInputStream,
      charset?: string,
      maxLength?: number,
    ): string;
    /** @deprecated Use {@link putContentsAsync} instead. */
    putContents(file: nsIFile, str: string): void;
    putContentsAsync: (
      path: string | nsIFile,
      data: string | nsIInputStream | ArrayBuffer,
      charset?: string,
    ) => Promise<void>;
    putNetworkStream(
      path: string,
      stream: nsIInputStream,
      byteCount: number,
    ): Promise<number>;
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
    /** @deprecated Use {@link createDirectoryIfMissingAsync} instead. */
    createDirectoryIfMissing(dir: string): void;
    createDirectoryIfMissingAsync(path: string, options?: any): Promise<void>;
    normalizeToUnix(path: string): string;
    directoryContains(dir: string, file: string): boolean;
    zipDirectory: (
      dirPath: string,
      zipPath: string,
      observer: any,
    ) => Promise<void | false>;
    getValidFileName(fileName: string, skipXML?: boolean): string;
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
    createSymlink(sourcePath: string, targetPath: string): boolean;
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
