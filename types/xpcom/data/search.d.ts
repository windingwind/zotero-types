/// <reference path="dataObject.d.ts" />

declare namespace Zotero {
	interface Search extends Zotero.DataObject {
		[prop: string]: unknown;
		new(params?: { name: string, libraryID: number }): this;
		_name: string | null;
		_scope?: Search;
		_scopeIncludeChildren?: boolean;
		_sql: string;
		_sqlParams: object[];
		_maxSearchConditionID: number;
		_conditions: {};
		_hasPrimaryConditions: boolean;
		_objectType: "search";
		_dataTypes: Search.DataType;
		name: string;
		version: string | null;
		synced: boolean;
		conditions: { [id: number]: Search.ConditionType };
		readonly treeViewID: string;
		readonly treeViewImage: string;

		loadFromRow(row: object): void;
		_initSave(env: Search.EnvType): Promise<void>;

		// _finalizeSave(env: Search.EnvType): Promise<boolean | number>;

		clone(libraryID: number): Search;

		_eraseData(env: Search.EnvType): Promise<void>;

		addCondition(condition: Search.Conditions | string, operator: string, value: string, required: boolean): number;

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
		updateCondition(searchConditionID: number, condition: string, operator: string, value: string, required: boolean): void;

		removeCondition(searchConditionID: number): void;

		/**
		 * Returns an array with 'condition', 'operator', 'value', 'required'
		 * for the given searchConditionID
		 */
		getCondition(searchConditionID: number): Search.ConditionType;

		/**
		 * Returns an object of conditions/operator/value sets used in the search,
		 * indexed by searchConditionID
		 */
		getConditions(): Search.ConditionType;

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
	namespace Search {
		type DataType = ['primaryData', 'conditions'];
		type ConditionType = { id: number; condition: Conditions; mode: boolean; operator: string; value: string; required: boolean };
		type EnvType = { options: DataObject.SaveOptions; transactionOptions: object; isNew: boolean };
		type Conditions = (
			'deleted' | 'noChildren' | 'unfiled' | 'retracted' | 'publications' | 'includeParentsAndChildren' | 'includeParents' | 'includeChildren' | 'recursive' | 'joinMode' | 'quicksearch-titleCreatorYear' | 'quicksearch-titleCreatorYearNote' | 'quicksearch-fields' | 'quicksearch-everything' | 'quicksearch' | 'blockStart' | 'blockEnd' | 'collectionID' | 'savedSearchID' | 'collection' | 'savedSearch' | 'dateAdded' | 'dateModified' | 'itemTypeID' | 'itemType' | 'fileTypeID' | 'tagID' | 'tag' | 'note' | 'childNote' | 'creator' | 'lastName' | 'author' | 'editor' | 'bookAuthor' | 'field' | 'anyField' | 'datefield' | 'year' | 'numberfield' | 'libraryID' | 'key' | 'itemID' | 'annotationText' | 'annotationComment' | 'fulltextWord' | 'fulltextContent' | 'tempTable'
		);
	}
}
