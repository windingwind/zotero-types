/**
    ***** BEGIN LICENSE BLOCK *****
    
    Copyright © 2009 Center for History and New Media
                     George Mason University, Fairfax, Virginia, USA
                     http://zotero.org
    
    This file is part of Zotero.
    
    Zotero is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    Zotero is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    
    You should have received a copy of the GNU Affero General Public License
    along with Zotero.  If not, see <http://www.gnu.org/licenses/>.
    
    ***** END LICENSE BLOCK *****
*/

declare namespace _ZoteroTypes {
  namespace Group {
    /**
     * A parameter object for constructing or updating a Zotero.Group.
     */
    interface GroupParams {
      groupID?: number;
      name?: string;
      description?: string;
      version?: number;
      libraryID?: number;
      /**
       * Will be set to 'group' internally. May be provided externally but not required.
       */
      libraryType?: string;
    }
  }
}

declare namespace Zotero {
  /**
   * A Zotero Group object, extending Zotero.Library, with additional group-specific
   * properties and methods.
   */
  class Group
    extends _ZoteroTypes.Library.LibraryAbstract
    implements _ZoteroTypes.Group.GroupParams
  {
    _childObjectTypes: ["item", "collection", "search"];
    fixedLibraries: ["user"];
    libraryType: "user" | "group" | "feed";
    groupID?: number;
    description?: string;
    version?: number;
    /**
     * Group constructor.
     *
     * @param params - Initial parameters for the group, such as name, description, etc.
     *                 `params.libraryType` will be forced to 'group'.
     */
    constructor(params?: _ZoteroTypes.Group.GroupParams);

    /**
     * Maps database columns to object properties.
     *
     * Non-prototype property:
     *
     * @example
     * Zotero.Group._dbColumns // ['name', 'description', 'version']
     */
    static readonly _dbColumns: ["name", "description", "version"];

    /**
     * A helper method to convert a column name into its corresponding property name.
     *
     * Non-prototype function:
     */
    static _colToProp(c: string): string;

    /**
     * A static definition for selecting columns in SQL.
     *
     * Non-prototype property:
     */
    static readonly _rowSQLSelect: string;

    /**
     * A static definition for the base SELECT SQL for groups.
     *
     * Non-prototype property:
     */
    static readonly _rowSQL: string;

    /**
     * A constant used to label the object type.
     */
    readonly _objectType: "group";

    /**
     * Extends the library types from the super class to include 'group'.
     */
    readonly libraryTypes: ["user", "group"];

    /**
     * Indicates whether this group allows linked files. Always false.
     */
    readonly allowsLinkedFiles: boolean;

    /**
     * Checks if a property name corresponds to a valid group property.
     *
     * @param prop - The property name
     * @returns True if valid group property; otherwise false.
     */
    _isValidGroupProp(prop: string): boolean;

    /**
     * Checks if a property name is valid for this group or its superclass.
     *
     * @param prop - The property name
     * @returns True if valid property; otherwise false.
     */
    _isValidProp(prop: string): boolean;

    /*
     * Populate group data from a database row
     */
    _loadDataFromRow(row: any): void;

    /**
     * Custom setter logic for internal group properties, such as version or name.
     *
     * @param prop - The property name (e.g. '_groupName')
     * @param val - The new value for that property
     * @throws Error on invalid values or disallowed decreases for version
     */
    _set(prop: string, val: any): any;

    /**
     * Reloads group data from the database.
     */
    _reloadFromDB(): Promise<void>;

    /**
     * Initializes a save operation. Checks required fields.
     *
     * @param env - Internal environment for the save operation
     * @returns true if valid for saving, otherwise throws an error
     */
    _initSave(env: any): Promise<boolean>;

    /**
     * Saves changes to the group into the database.
     *
     * @param env - Internal environment for the save operation
     */
    _saveData(env: any): Promise<void>;

    /**
     * Finalizes the save operation, e.g., registering new groups in Zotero.Groups.
     *
     * @param env - Internal environment for the save operation
     */
    _finalizeSave(env: any): Promise<void>;

    /**
     * Finalizes erasing/deleting the group, including unregistering from Zotero.Groups
     * and queueing a delete notification.
     *
     * @param env - Internal environment for the erase operation
     */
    _finalizeErase(env: any): Promise<void>;

    /**
     * Converts the group to a JSON object suitable for responses.
     *
     * @param options - Options object.
     *                  If `options.includeGroupDetails` is true, returns more detail
     */
    toResponseJSON(options?: any): any;

    /**
     * An async variation of `toResponseJSON`. When `options.includeGroupDetails` is set,
     * adds a `meta.numItems` value by querying the database.
     *
     * @param options - Options object
     * @returns A Promise that resolves to the response JSON
     */
    toResponseJSONAsync(options?: any): Promise<any>;

    /**
     * Updates this group from a JSON object, potentially including user-based editing checks.
     *
     * @param json - The JSON object containing updated fields like name or description
     * @param userID - The user attempting to update the group
     */
    fromJSON(json: any, userID?: number): void;

    /**
     * Preps a field for change, marking it as changed and optionally storing previous data.
     *
     * @param field - The internal field name to mark as changed
     */
    _prepFieldChange(field: string): void;
  }
}
