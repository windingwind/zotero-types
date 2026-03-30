/// <reference path="dataObject.d.ts" />

declare namespace _ZoteroTypes {
  namespace Collection {
    type DataType =
      | "primaryData"
      | "childCollections"
      | "childItems"
      | "relations";
    type DescendentType = "item" | "collection";
    interface Descendent {
      id: number;
      key: string;
      level: number;
      name: string;
      parent: number;
      type: Collection.DescendentType;
    }
  }
}
