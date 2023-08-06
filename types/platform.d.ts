// Type definitions for Zotero platform (Mozilla Firefox 60/102)

declare const Components: any;
declare const Services: any;
declare const ChromeUtils: any;

// https://github.com/retorquere/zotero-better-bibtex/blob/master/typings/global.d.ts
declare interface DirectoryIterator {
  forEach(handler: any): Promise<void>;
  close(): void;
  next(): any;
}
declare interface DirectoryIteratorConstructable {
  new (path: string): DirectoryIterator; // eslint-disable-line @typescript-eslint/prefer-function-type
}

// http://www.devdoc.net/web/developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIFile.html
declare interface nsIFile {
  [attr: string]: any;
  NORMAL_FILE_TYPE: 0;
  DIRECTORY_TYPE: 1;
  readonly diskSpaceAvailable: number;
  fileSize: number;
  readonly fileSizeOfLink: number;
  readonly parent: nsIFile;
  readonly path: string;
  permissions: number;
  permissionsOfLink: number;
  persistentDescriptor: string;
  readonly target: string;

  append(node: string): void;
  appendRelativePath(relativeFilePath: string): void;
  clone(): nsIFile;
  contains(file: nsIFile): boolean;
  copyTo(newParentDir: nsIFile, newName: string): void;
  copyToFollowingLinks(newParentDir: nsIFile, newName: string): void;
  create(type: number, permissions: number): void;
  createUnique(type: number, permissions: number): void;
  equals(file: nsIFile): boolean;
  exists(): boolean;
  getRelativeDescriptor(fromFile: nsIFile): string;
  initWithFile(file: nsIFile): void;
  initWithPath(filePath: string): void;
  isDirectory(): boolean;
  isExecutable(): boolean;
  isFile(): boolean;
  isHidden(): boolean;
  isReadable(): boolean;
  isSpecial(): boolean;
  isSymlink(): boolean;
  isWritable(): boolean;
  launch(): void;
  moveTo(newParentDir: nsIFile, newName: string): void;
  normalize(): void;
  remove(recursive?: boolean): void;
  renameTo(newParentDir: nsIFile, newName: string): void;
  reveal(): void;
  setRelativeDescriptor(fromFile: nsIFile, relativeDesc: string): void;
}
declare interface nsIInputStream {
  [attr: string]: any;
}

declare namespace OS {
  namespace File {
    type Entry = {
      isDir: boolean;
      size: number;
      path: string;
      unixMode?: number;
      name: string;
    };
    type FileInfo = {
      isDir: boolean;
      size: number;
      unixMode?: number;
      lastModificationDate: Date;
    };
  }
}
declare const OS: {
  /**
   * @deprecated This namespace is deprecated and is removed in Firefox 115.
   * Please use the `Zotero.File` or `IOUtils` instead.
   * @see {@link https://groups.google.com/g/zotero-dev/c/t0oP9NECX54}
   * @see {@link https://firefox-source-docs.mozilla.org/dom/ioutils_migration.html | Migration Guide}
   * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/OSFile.jsm/OS.File_for_the_main_thread}
   */
  File: {
    exists(path: string): boolean | Promise<boolean>;
    read: (
      path: string | BufferSource,
      options?: { encoding?: string }
    ) =>
      | string
      | Promise<string>
      | Uint8Array
      | Promise<Uint8Array>
      | Promise<BufferSource>;
    move(from: string, to: string): void | Promise<void>;
    remove: (
      path: string,
      options?: { ignoreAbsent: boolean }
    ) => Promise<void>;
    writeAtomic: (
      path: string,
      data: Uint8Array | string,
      options?: { tmpPath?: string; encoding?: string }
    ) => void | Promise<void>;
    makeDir: (
      path: string,
      options?: { ignoreExisting?: boolean }
    ) => void | Promise<void>;
    stat(path: string): OS.File.FileInfo | Promise<OS.File.FileInfo>;
    copy: (
      src: string,
      tgt: string,
      options?: { noOverwrite?: boolean }
    ) => void;
    removeDir: (
      path: string,
      options?: { ignoreAbsent?: boolean; ignorePermissions?: boolean }
    ) => void;

    DirectoryIterator: DirectoryIteratorConstructable;
  };

  /**
   * @deprecated This namespace is deprecated and is removed in Firefox 115.
   * Please use the `Zotero.File` or `PathUtils` instead.
   * @see {@link https://groups.google.com/g/zotero-dev/c/t0oP9NECX54}
   * @see {@link https://firefox-source-docs.mozilla.org/dom/ioutils_migration.html | Migration Guide}
   * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/OSFile.jsm/OS.Path}
   */
  Path: {
    join(...args: string[]): string;
    dirname(path: string): string;
    basename(path: string): string;
    normalize(path: string): string;
    split: (path: string) => {
      absolute: boolean;
      components: string[];
      winDrive?: string;
    };
    toFileURI(path: string): string;
  };
};

declare const NetUtil: any;
