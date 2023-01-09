/// <reference path="library.d.ts" />

declare namespace _ZoteroTypes {
  interface Libraries {
    [attr: string]: any;
    readonly userLibraryID: number;
    readonly userLibrary: Zotero.Library;
    register(library: Zotero.Library): void;
    unregister(libraryID: number): void;
    init(): void;
    exists(libraryID: number): boolean;
    getAll(): Zotero.Library[];
    get(libraryID: number): Zotero.Library;
  }
}
