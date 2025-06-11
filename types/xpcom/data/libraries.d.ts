/// <reference path="library.d.ts" />

declare namespace _ZoteroTypes {
  interface Libraries {
    readonly userLibraryID: number;
    readonly userLibrary: Zotero.Library;
    _cache?: { [i: number]: Library.LibraryLike };
    register(library: Library.LibraryLike): void;
    unregister(libraryID: number): void;
    _addToCache(
      cache: { [i: number]: Library.LibraryLike },
      library: Library.LibraryLike,
    ): void;

    /**
     * Loads all libraries from DB. Groups, Feeds, etc. should not maintain an
     * independent cache.
     */
    init(): Promise<void>;

    /**
     * @param {Integer} libraryID
     * @return {Boolean}
     */
    exists(libraryID: number): boolean;

    _ensureExists(libraryID: number): void | never;

    /**
     * @return {Array<Zotero.Library | Zotero.Group | Zotero.Feed>} - All libraries
     */
    getAll(): Library.LibraryLike[];

    /**
     * Get an existing library
     *
     * @param {Integer} libraryID
     * @return {Library.LibraryLike[] | Library.LibraryLike}
     */
    get(libraryID: number): Library.LibraryLike | false;

    getName(libraryID: number): string;
    getType(libraryID: number): "group" | "user" | "feed";
    getLastSyncTime(libraryID: number): Date;
    getVersion(libraryID: number): number;
    hasTrash(libraryID: number): boolean;
    isEditable(libraryID: number): boolean;
    isFilesEditable(libraryID: number): boolean;
    isGroupLibrary(libraryID: number): boolean;
  }
}

declare namespace Zotero {
  const Libraries: _ZoteroTypes.Libraries;
}
