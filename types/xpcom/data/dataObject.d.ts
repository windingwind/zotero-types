/// <reference path="library.d.ts" />

declare class _ZoteroDataObject {
    objectType: string;
    id: number;
    libraryID: number;
    library: _ZoteroLibrary;
    key: string;
    libraryKey: string;
    parentKey: string;
    parentID: number;
    itemTypeID: number;
    parentItem: _ZoteroItem;
    getRelations(): object;
    getRelationsByPredicate(predicate: string): string[];
    addRelation(predicate: string, object: object): boolean;
    hasRelation(predicate: string, object: object): boolean;
    removeRelation(predicate: string, object: object): boolean;
    setRelations(newRelations: object): boolean;
    hasChanged(): boolean;
    isEditable(_op?: string | undefined): boolean;
    save(options?: any): Promise<boolean>;
    saveTx(options?: any): Promise<boolean>;
    eraseTx(options?: any): Promise<boolean>;
    erase(options?: any): Promise<boolean>;
    _version: number;
    _synced: boolean;
}
