/// <reference path="dataObject.d.ts" />

declare namespace Zotero {
  class Search extends Zotero.DataObject {
    static prototype: Search;
    constructor(params?: { name?: string; libraryID?: number });
    _name: string | null;
    _scope?: Search;
    _scopeIncludeChildren?: boolean;
    _sql: string;
    _sqlParams: object[];
    _maxSearchConditionID: number;
    _conditions: {};
    _hasPrimaryConditions: boolean;
    _objectType: "search";
    _dataTypes: _ZoteroTypes.Search.DataType;
    name: string;
    version: string | null;
    synced: boolean;
    conditions: { [id: number]: _ZoteroTypes.Search.ConditionType };
    readonly treeViewID: string;
    readonly treeViewImage: string;

    loadFromRow(row: object): void;
    _initSave(env: _ZoteroTypes.Search.EnvType): Promise<void>;

    // _finalizeSave(env: Search.EnvType): Promise<boolean | number>;

    clone(libraryID: number): Search;

    _eraseData(env: _ZoteroTypes.Search.EnvType): Promise<void>;

    addCondition(
      condition: _ZoteroTypes.Search.Conditions,
      operator: _ZoteroTypes.Search.Operator,
      value: string | number,
      required?: boolean,
    ): number;
    addCondition(
      condition: string,
      operator: _ZoteroTypes.Search.Operator,
      value?: string | number,
      required?: boolean,
    ): number;
    addCondition(condition: "blockStart" | "blockEnd"): number;

    /**
     * Sets scope of search to the results of the passed Search object
     */
    setScope(searchObj: Search, includeChildren: boolean): void;

    /**
     * @param {Number} searchConditionID
     * @param {String} condition
     * @param {String} operator
     * @param {String} value
     * @param {Boolean} [required]
     * @return {Promise}
     */
    updateCondition(
      searchConditionID: number,
      condition: string,
      operator: string,
      value: string,
      required: boolean,
    ): void;

    removeCondition(searchConditionID: number): void;

    /**
     * Returns an array with 'condition', 'operator', 'value', 'required'
     * for the given searchConditionID
     */
    getCondition(searchConditionID: number): _ZoteroTypes.Search.ConditionType;

    /**
     * Returns an object of conditions/operator/value sets used in the search,
     * indexed by searchConditionID
     */
    getConditions(): { [id: number]: _ZoteroTypes.Search.ConditionType };

    hasPostSearchFilter(): boolean;

    /**
     * Run the search and return an array of item ids for results
     *
     * @param {Boolean} [asTempTable=false]
     * @return {Promise}
     */
    search(asTempTable?: false): Promise<number[]>;
    search(asTempTable: true): Promise<string>;

    /**
     * Populate the object's data from an API JSON data object
     *
     * If this object is identified (has an id or library/key), loadAll() must have been called.
     *
     * @param {Object} json
     * @param {Object} [options]
     * @param {Boolean} [options.strict = false] - Throw on unknown property
     */
    fromJSON(json: object, options?: { strict: boolean }): void;

    toJSON(option: object): object;
  }
}

declare namespace _ZoteroTypes {
  namespace Search {
    type DataType = ["primaryData", "conditions"];
    type ConditionType = {
      id: number;
      condition: Conditions;
      mode: boolean;
      operator: Operator;
      value: string;
      required: boolean;
    };
    type EnvType = {
      options: Zotero.DataObject.SaveOptions;
      transactionOptions: object;
      isNew: boolean;
    };
    type Operator =
      | "is"
      | "isNot"
      | "true"
      | "false"
      | "isInTheLast"
      | "isBefore"
      | "isAfter"
      | "contains"
      | "doesNotContain"
      | "beginsWith"
      | "isLessThan"
      | "isGreaterThan"
      | "any"
      | "all"
      | "true"
      | "false";
    // Zotero.SearchConditions.getStandardConditions().map((c) => `'${c.name}'`).join(" | ");
    type Conditions =
      | "numPages"
      | "numberOfVolumes"
      | "abstractNote"
      | "anyField"
      | "accessDate"
      | "applicationNumber"
      | "archive"
      | "artworkSize"
      | "assignee"
      | "fulltextContent"
      | "fileTypeID"
      | "author"
      | "authority"
      | "bookAuthor"
      | "callNumber"
      | "childNote"
      | "citationKey"
      | "code"
      | "codeNumber"
      | "collection"
      | "committee"
      | "conferenceName"
      | "country"
      | "creator"
      | "date"
      | "dateAdded"
      | "dateModified"
      | "DOI"
      | "edition"
      | "editor"
      | "extra"
      | "filingDate"
      | "history"
      | "ISBN"
      | "ISSN"
      | "issue"
      | "itemType"
      | "journalAbbreviation"
      | "language"
      | "libraryCatalog"
      | "archiveLocation"
      | "medium"
      | "meetingName"
      | "note"
      | "number"
      | "pages"
      | "place"
      | "priorityNumbers"
      | "programmingLanguage"
      | "publicationTitle"
      | "publisher"
      | "references"
      | "reporter"
      | "rights"
      | "runningTime"
      | "scale"
      | "section"
      | "series"
      | "seriesNumber"
      | "seriesText"
      | "seriesTitle"
      | "session"
      | "shortTitle"
      | "status"
      | "system"
      | "tag"
      | "title"
      | "type"
      | "url"
      | "versionNumber"
      | "volume"
      | "deleted"
      | "noChildren"
      | "unfiled"
      | "retracted"
      | "publications"
      | "feed"
      | "includeParentsAndChildren"
      | "includeParents"
      | "includeChildren"
      | "recursive"
      | "joinMode"
      | "quicksearch-titleCreatorYear"
      | "quicksearch-titleCreatorYearNote"
      | "quicksearch-fields"
      | "quicksearch-everything"
      | "quicksearch"
      | "blockStart"
      | "blockEnd"
      | "collectionID"
      | "savedSearchID"
      | "savedSearch"
      | "itemTypeID"
      | "tagID"
      | "lastName"
      | "field"
      | "datefield"
      | "year"
      | "numberfield"
      | "libraryID"
      | "key"
      | "itemID"
      | "annotationText"
      | "annotationComment"
      | "fulltextWord"
      | "tempTable";
  }
}
