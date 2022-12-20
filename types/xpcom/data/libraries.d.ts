/// <reference path="library.d.ts" />

declare class _ZoteroLibraries {
    [attr: string]: any;
    userLibraryID: number;
    userLibrary: _ZoteroLibrary;
    register: (library: _ZoteroLibrary) => void;
    unregister: (libraryID: number) => void;
    init: () => void;
    exists: (libraryID: number) => boolean;
    getAll: () => _ZoteroLibrary[];
    get: (libraryID: number) => _ZoteroLibrary;
  }
  