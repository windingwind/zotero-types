/// <reference path="dataObject.d.ts" />

declare namespace Zotero {
	interface Search extends Zotero.DataObject {
		[prop: string]: unknown;
		_name: string | null;
		_scope: null;
		_scopeIncludeChildren: null;
		_sql: null;
		_sqlParams: boolean;
		_maxSearchConditionID: number;
		_conditions: {};
		_hasPrimaryConditions: boolean;
		_objectType: "search";
		_dataTypes: Search.DataType;

		getID(): number;
		getName(): string;
		setName(val: string): void;

		version: string | null;
		synced: any;
		conditions: { [id: number]: Search.ConditionType };
		treeViewID: string;
		treeViewImage: string;

		loadFromRow(row: string[]): void;
		_initSave(env: Search.EnvType): Promise<void>;

		// _finalizeSave(env: Search.EnvType): Promise<boolean | number>;

		clone(libraryID: number): Search;

		_eraseData(env: Search.EnvType): Promise<void>;

		addCondition(condition: string, operator: string, value: string, required: boolean): number;

		/**
		 * Sets scope of search to the results of the passed Search object
		 */
		setScope(searchObj: object, includeChildren: boolean): void;

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
		getConditions(): { [id: number]: Search.ConditionType }
		
		hasPostSearchFilter(): boolean;

		/**
		 * Run the search and return an array of item ids for results
		 *
		 * @param {Boolean} [asTempTable=false]
		 * @return {Promise}
		 */
		search(asTempTable: boolean): Promise<number[]>;

		/**
		 * Populate the object's data from an API JSON data object
		 *
		 * If this object is identified (has an id or library/key), loadAll() must have been called.
		 *
		 * @param {Object} json
		 * @param {Object} [options]
		 * @param {Boolean} [options.strict = false] - Throw on unknown property
		 */
		fromJSON(json: object, options: { strict: boolean;[key: string]: any }): void;

		toJSON(option: object): object;
	}
	namespace Search {
		type DataType = ('primaryData' | 'conditions');
		type ConditionType = { id: number; condition: string; mode: boolean; operator: string; value: string; required: boolean };
		type EnvType = { options: DataObject.SaveOptions; transactionOptions: object; isNew : boolean};
	}
}
