/// <reference path="dataObject.d.ts" />

declare namespace Zotero {
    interface Search extends Zotero.DataObject {
        [prop: string]: unknown;
    }
    namespace Search {
        type DataType = ('primaryData' | 'conditions');
    }
}
