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
      options?: { encoding?: string },
    ) =>
      | string
      | Promise<string>
      | Uint8Array
      | Promise<Uint8Array>
      | Promise<BufferSource>;
    move(from: string, to: string): void | Promise<void>;
    remove: (
      path: string,
      options?: { ignoreAbsent: boolean },
    ) => Promise<void>;
    writeAtomic: (
      path: string,
      data: Uint8Array | string,
      options?: { tmpPath?: string; encoding?: string },
    ) => void | Promise<void>;
    makeDir: (
      path: string,
      options?: { ignoreExisting?: boolean },
    ) => void | Promise<void>;
    stat(path: string): OS.File.FileInfo | Promise<OS.File.FileInfo>;
    copy: (
      src: string,
      tgt: string,
      options?: { noOverwrite?: boolean },
    ) => void;
    removeDir: (
      path: string,
      options?: { ignoreAbsent?: boolean; ignorePermissions?: boolean },
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

/**
 * IOUtils is a simple, efficient interface for performing file I/O from a
 * privileged chrome-only context. All asynchronous I/O tasks are run on
 * a background thread.
 *
 * Pending I/O tasks will block shutdown at the |profileBeforeChange| phase.
 * During this shutdown phase, no additional I/O tasks will be accepted --
 * method calls to this interface will reject once shutdown has entered this
 * phase.
 *
 * IOUtils methods may reject for any number of reasons. Reasonable attempts
 * have been made to map each common operating system error to a |DOMException|.
 * Most often, a caller only needs to check if a given file wasn't found by
 * catching the rejected error and checking if |ex.name === 'NotFoundError'|.
 * In other cases, it is likely sufficient to allow the error to be caught and
 * reported elsewhere.
 *
 * @since Firefox 83, Zotero 7.0
 * @see https://searchfox.org/mozilla-central/source/dom/chrome-webidl/IOUtils.webidl
 * @see {@link https://firefox-source-docs.mozilla.org/dom/ioutils_migration.html | Migration from OS.File}
 */
declare namespace IOUtils {
  /**
   * Options to be passed to the |IOUtils.readUTF8| method.
   */
  interface ReadUTF8Options {
    /**
     * If true, this option indicates that the file to be read is compressed with
     * LZ4-encoding, and should be decompressed before the data is returned to
     * the caller.
     * @default false
     */
    decompress: boolean;
  }

  interface ReadOption extends ReadUTF8Options {
    /**
     * The offset into the file to read from. If unspecified, the file will be read
     * from the start.
     * @default 0
     */
    offset: number;
    /**
     * The max bytes to read from the file at path. If unspecified, the entire
     * file will be read. This option is incompatible with |decompress|.
     */
    maxBytes?: number;
  }

  interface WriteOptions {
    backupFile?: string;
    tmpPath?: string;
    mode?: "overwrite" | "append" | "appendOrCreate" | "create";
    flush?: boolean;
    compress?: boolean;
  }

  interface MoveOptions {
    noOverwrite?: boolean;
  }

  interface RemoveOptions {
    ignoreAbsent?: boolean;
    recursive?: boolean;
    retryReadonly?: boolean;
  }

  interface MakeDirectoryOptions {
    createAncestors?: boolean;
    ignoreExisting?: boolean;
    permissions?: number;
  }

  interface CopyOptions {
    noOverwrite?: boolean;
    recursive?: boolean;
  }

  interface GetChildrenOptions {
    ignoreAbsent?: boolean;
  }

  interface FileInfo {
    path: string;
    type: "regular" | "directory" | "other";
    size: number;
    creationTime: number;
    lastAccessed: number;
    lastModified: number;
    permissions: number;
  }

  enum HashAlgorithm {
    "sha1",
    "sha256",
    "sha384",
    "sha512",
  }

  /**
   * Reads up to |opts.maxBytes| of the file at |path| according to |opts|.
   *
   * NB: The maximum file size that can be read is UINT32_MAX.
   *
   * @param path An absolute file path.
   *
   * @return Resolves with an array of unsigned byte values read from disk,
   *         otherwise rejects with a DOMException.
   */
  function read(path: String, otps?: ReadOption): Promise<Uint8Array>;
  /**
   * Reads the UTF-8 text file located at |path| and returns the decoded
   * contents as a |DOMString|. If a UTF-8 byte order marker (BOM) is
   * present, it will be stripped from the returned string.
   *
   * NB: The maximum file size that can be read is UINT32_MAX.
   *
   * @param path An absolute file path.
   *
   * @return Resolves with the file contents encoded as a string, otherwise
   *         rejects with a DOMException.
   */
  function readUTF8(path: String, opts?: ReadUTF8Options): Promise<String>;
  /**
   * Read the UTF-8 text file located at |path| and return the contents
   * parsed as JSON into a JS value.
   *
   * NB: The maximum file size that can be read is UINT32_MAX.
   *
   * @param path An absolute path.
   *
   * @return Resolves with the contents of the file parsed as JSON.
   */
  function readJSON(path: String, opts?: ReadUTF8Options): Promise<any>;
  /**
   * Attempts to safely write |data| to a file at |path|.
   *
   * This operation can be made atomic by specifying the |tmpPath| option. If
   * specified, then this method ensures that the destination file is not
   * modified until the data is entirely written to the temporary file, after
   * which point the |tmpPath| is moved to the specified |path|.
   *
   * The target file can also be backed up to a |backupFile| before any writes
   * are performed to prevent data loss in case of corruption.
   *
   * @param path    An absolute file path.
   * @param data    Data to write to the file at path.
   *
   * @return Resolves with the number of bytes successfully written to the file,
   *         otherwise rejects with a DOMException.
   */
  function write(
    path: String,
    data: Uint8Array,
    options?: WriteOptions,
  ): Promise<number>;
  /**
   * Attempts to encode |string| to UTF-8, then safely write the result to a
   * file at |path|. Works exactly like |write|.
   *
   * @param path      An absolute file path.
   * @param string    A string to write to the file at path.
   * @param options   Options for writing the file.
   *
   * @return Resolves with the number of bytes successfully written to the file,
   *         otherwise rejects with a DOMException.
   */
  function writeUTF8(
    path: string,
    string: string,
    options?: WriteOptions,
  ): Promise<number>;
  /**
   * Attempts to serialize |value| into a JSON string and encode it as into a
   * UTF-8 string, then safely write the result to a file at |path|. Works
   * exactly like |write|.
   *
   * @param path      An absolute file path
   * @param value     The value to be serialized.
   * @param options   Options for writing the file. The "append" mode is not supported.
   *
   * @return Resolves with the number of bytes successfully written to the file,
   *         otherwise rejects with a DOMException.
   */
  function writeJSON(
    path: string,
    value: any,
    options?: WriteOptions,
  ): Promise<number>;
  /**
   * Moves the file from |sourcePath| to |destPath|, creating necessary parents.
   * If |destPath| is a directory, then the source file will be moved into the
   * destination directory.
   *
   * @param sourcePath An absolute file path identifying the file or directory
   *                   to move.
   * @param destPath   An absolute file path identifying the destination
   *                   directory and/or file name.
   *
   * @return Resolves if the file is moved successfully, otherwise rejects with
   *         a DOMException.
   */
  function move(
    sourcePath: string,
    destPath: string,
    options?: MoveOptions,
  ): Promise<void>;
  /**
   * Removes a file or directory at |path| according to |options|.
   *
   * @param path An absolute file path identifying the file or directory to
   *             remove.
   *
   * @return Resolves if the file is removed successfully, otherwise rejects
   *         with a DOMException.
   */
  function remove(path: string, options?: RemoveOptions): Promise<void>;
  /**
   * Creates a new directory at |path| according to |options|.
   *
   * @param path An absolute file path identifying the directory to create.
   *
   * @return Resolves if the directory is created successfully, otherwise
   *         rejects with a DOMException.
   */
  function makeDirectory(
    path: string,
    options?: MakeDirectoryOptions,
  ): Promise<void>;
  /**
   * Obtains information about a file, such as size, modification dates, etc.
   *
   * @param path An absolute file path identifying the file or directory to
   *             inspect.
   *
   * @return Resolves with a |FileInfo| object for the file at path, otherwise
   *         rejects with a DOMException.
   *
   * @see FileInfo
   */
  function stat(path: string): Promise<FileInfo>;
  /**
   * Copies a file or directory from |sourcePath| to |destPath| according to
   * |options|.
   *
   * @param sourcePath An absolute file path identifying the source file to be
   *                   copied.
   * @param destPath   An absolute file path identifying the location for the
   *                   copy.
   *
   * @return Resolves if the file was copied successfully, otherwise rejects
   *         with a DOMException.
   */
  function copy(
    sourcePath: string,
    destPath: string,
    options?: CopyOptions,
  ): Promise<void>;
  /**
   * Updates the access time for the file at |path|.
   *
   * @param path         An absolute file path identifying the file whose
   *                     modification time is to be set. This file must exist
   *                     and will not be created.
   * @param modification An optional access time for the file expressed in
   *                     milliseconds since the Unix epoch
   *                     (1970-01-01T00:00:00Z). The current system time is used
   *                     if this parameter is not provided.
   *
   * @return Resolves with the updated access time time expressed in
   *         milliseconds since the Unix epoch, otherwise rejects with a
   *         DOMException.
   */
  function setAccessTime(path: string, access?: number): Promise<number>;
  /**
   * Updates the modification time for the file at |path|.
   *
   * @param path         An absolute file path identifying the file whose
   *                     modification time is to be set. This file must exist
   *                     and will not be created.
   * @param modification An optional modification time for the file expressed in
   *                     milliseconds since the Unix epoch
   *                     (1970-01-01T00:00:00Z). The current system time is used
   *                     if this parameter is not provided.
   *
   * @return Resolves with the updated modification time expressed in
   *         milliseconds since the Unix epoch, otherwise rejects with a
   *         DOMException.
   */
  function setModificationTime(
    path: string,
    modification?: number,
  ): Promise<number>;
  /**
   * Retrieves a (possibly empty) list of immediate children of the directory at
   * |path|.
   *
   * @param path An absolute file path.
   *
   * @return Resolves with a sequence of absolute file paths representing the
   *         children of the directory at |path|, otherwise rejects with a
   *         DOMException.
   */
  function getChildren(
    path: string,
    options?: GetChildrenOptions,
  ): Promise<string[]>;
  /**
   * Set the permissions of the file at |path|.
   *
   * Windows does not make a distinction between user, group, and other
   * permissions like UNICES do. If a permission flag is set for any of user,
   * group, or other has a permission, then all users will have that
   * permission. Additionally, Windows does not support setting the
   * "executable" permission.
   *
   * @param path        An absolute file path
   * @param permissions The UNIX file mode representing the permissions.
   * @param honorUmask  If omitted or true, any UNIX file mode value is
   *                    modified by the process umask. If false, the exact value
   *                    of UNIX file mode will be applied. This value has no effect
   *                    on Windows.
   *
   * @return Resolves if the permissions were set successfully, otherwise
   *         rejects with a DOMException.
   */
  function setPermissions(
    path: string,
    permissions: number,
    honorUmask?: boolean,
  ): Promise<void>;
  /**
   * Return whether or not the file exists at the given path.
   *
   * @param path An absolute file path.
   *
   * @return A promise that resolves to whether or not the given file exists.
   */
  function exists(path: string): Promise<boolean>;
  /**
   * Create a file with a unique name and return its path.
   *
   * @param parent An absolute path to the directory where the file is to be
   *               created.
   * @param prefix A prefix for the filename.
   *
   * @return A promise that resolves to a unique filename.
   */
  function createUniqueFile(
    parent: string,
    prefix: string,
    permissions?: number,
  ): Promise<string>;
  /**
   * Create a directory with a unique name and return its path.
   *
   * @param parent An absolute path to the directory where the file is to be
   *               created.
   * @param prefix A prefix for the directory name.
   *
   * @return A promise that resolves to a unique directory name.
   */
  function createUniqueDirectory(
    parent: string,
    prefix: string,
    permissions?: number,
  ): Promise<string>;
  /**
   * Compute the hash of a file as a hex digest.
   *
   * @param path   The absolute path of the file to hash.
   * @param method The hashing method to use.
   *
   * @return A promise that resolves to the hex digest of the file's hash in lowercase.
   */
  function computeHexDigest(
    path: string,
    method: HashAlgorithm,
  ): Promise<string>;

  // Methods that are only applicable to specific platforms are omitted.

  // // Additional methods for Windows
  // function getWindowsAttributes(path: string): Promise<WindowsFileAttributes>;
  // function setWindowsAttributes(path: string, attrs?: WindowsFileAttributes): Promise<void>;

  // // Additional methods for Unix
  // function openFileForSyncReading(path: string): SyncReadFile;
  // function launchProcess(argv: UnixString[], options: LaunchOptions): number;
  // function hasMacXAttr(path: string, attr: string): Promise<boolean>;
  // function getMacXAttr(path: string, attr: string): Promise<Uint8Array>;
  // function setMacXAttr(path: string, attr: string, value: Uint8Array): Promise<void>;
  // function delMacXAttr(path: string, attr: string): Promise<void>;
  // function getFile(...components: string[]): Promise<nsIFile>;
  // function getDirectory(...components: string[]): Promise<nsIFile>;

  // Shutdown clients
  const profileBeforeChange: any;
  const sendTelemetry: any;
}

/**
 * PathUtils is a set of utilities for operating on absolute paths.
 * @since Firefox 83, Zotero 7.0
 * @see https://searchfox.org/mozilla-esr102/source/dom/chrome-webidl/PathUtils.webidl
 */
declare namespace PathUtils {
  /**
   * Return the last path component.
   *
   * @param path An absolute path.
   *
   * @returns The last path component.
   */
  function filename(path: string): string;

  /**
   * Return an ancestor directory of the given path.
   *
   * @param path An absolute path.
   * @param depth The number of ancestors to remove, defaulting to 1 (i.e., the
   *              parent).
   *
   * @return The ancestor directory.
   *
   *         If the path provided is a root path (e.g., `C:` on Windows or `/`
   *         on *NIX), then null is returned.
   */
  function parent(path: string, depth?: number): string | null;

  /**
   * Join the given components into a full path.
   *
   * @param components The path components. The first component must be an
   *                   absolute path.
   */
  function join(...components: string[]): string;

  /**
   * Join the given relative path to the base path.
   *
   * @param base The base path. This must be an absolute path.
   * @param relativePath A relative path to join to the base path.
   */
  function joinRelative(base: string, relativePath: string): string;

  /**
   * Creates an adjusted path using a path whose length is already close
   * to MAX_PATH. For windows only.
   *
   * @param path An absolute path.
   */
  function toExtendedWindowsPath(path: string): string;

  /**
   * Normalize a path by removing multiple separators and `..` and `.`
   * directories.
   *
   * On UNIX platforms, the path must exist as symbolic links will be resolved.
   *
   * @param path The absolute path to normalize.
   *
   */
  function normalize(path: string): string;

  /**
   * Split a path into its components.
   *
   * @param path An absolute path.
   */
  function split(path: string): string[];

  /**
   * Transform a file path into a file: URI
   *
   * @param path An absolute path.
   *
   * @return The file: URI as a string.
   */
  function toFileURI(path: string): string;

  /**
   * Determine if the given path is an absolute or relative path.
   *
   * @param path A file path that is either relative or absolute.
   *
   * @return Whether or not the path is absolute.
   */
  function isAbsolute(path: string): boolean;
}

// [Exposed=Window]
declare namespace PathUtils {
  /**
   * The profile directory.
   */
  const profileDir: string;

  /**
   * The local-specific profile directory.
   */
  const localProfileDir: string;

  /**
   * The temporary directory for the process.
   */
  const tempDir: string;

  /**
   * The OS temporary directory.
   */
  const osTempDir: string;
}

// [Exposed=Worker]
declare namespace PathUtils {
  /**
   * The profile directory.
   */
  function getProfileDir(): Promise<string>;

  /**
   * The local-specific profile directory.
   */
  function getLocalProfileDir(): Promise<string>;

  /**
   * The temporary directory for the process.
   */
  function getTempDir(): Promise<string>;

  /**
   * The OS temporary directory.
   */
  function getOSTempDir(): Promise<string>;
}

declare const NetUtil: any;

declare interface Window {
  openDialog(
    url?: string | URL,
    target?: string,
    features?: string,
    ...args: any
  ): Window;
}

declare class Localization {}
