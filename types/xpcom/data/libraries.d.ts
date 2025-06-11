/// <reference path="library.d.ts" />

declare namespace _ZoteroTypes {
  interface Libraries {
    readonly userLibraryID: number;
    readonly userLibrary: Library.LibraryAbstract;
    _cache?: { [i: number]: Library.LibraryAbstract };
    register(library: Library.LibraryAbstract): void;
    unregister(libraryID: number): void;
    _addToCache(
      cache: { [i: number]: Library.LibraryAbstract },
      library: Library.LibraryAbstract,
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
    getAll(): Library.LibraryAbstract[];

    /**
     * Get an existing library
     *
     * @param {Integer} libraryID
     * @return {Library.LibraryAbstract[] | Library.LibraryAbstract}
     */
    get(libraryID: number): Library.LibraryAbstract | false;

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
