declare namespace Zotero {
  /**
   * Contains logic for working with Zotero groups: registration, retrieval,
   * cache management, and permissions.
   */
  namespace Groups {
    /**
     * The URL where a user may add new groups
     */
    const addGroupURL: string;

    /**
     * Registers a new group in the Zotero.Groups cache.
     *
     * @param group - The group object to register
     * @throws Error if cache is not initialized
     */
    function register(group: Group): void;

    /**
     * Unregisters a group by its ID from the Zotero.Groups cache.
     *
     * @param groupID - The group ID
     * @throws Error if cache is not initialized
     */
    function unregister(groupID: number): void;

    /**
     * Initializes the Zotero.Groups cache. This is called from Zotero.Libraries.
     * Returns a Promise that resolves once initialization is complete.
     */
    function init(): Promise<void>;

    /**
     * @param id - Group id
     * @return {Zotero.Group} The group associated with the given ID
     */
    function get(id: number): Group;

    /**
     * Get all groups, sorted by name.
     *
     * @return {Zotero.Group[]} An array of all groups
     * @throws Error if cache is not initialized
     */
    function getAll(): Group[];

    /**
     * Gets a group by its library ID.
     *
     * @param libraryID - The library ID of the group
     * @return {Zotero.Group} The group object
     */
    function getByLibraryID(libraryID: number): Group;

    /**
     * Determines if a group exists in the cache.
     *
     * @param groupID - The group ID to check
     * @returns true if the group is registered; otherwise false
     * @throws Error if cache is not initialized
     */
    function exists(groupID: number): boolean;

    /**
     * Returns the group ID for the given library ID.
     *
     * @param libraryID - The library ID of the group
     * @returns The group ID
     * @throws Error if the group does not exist or cache is not initialized
     */
    function getGroupIDFromLibraryID(libraryID: number): number;

    /**
     * Returns the library ID for the given group ID.
     *
     * @param groupID - The group ID
     * @returns The library ID or false if the group isn't found
     * @throws Error if cache is not initialized
     */
    function getLibraryIDFromGroupID(groupID: number): number | false;

    /**
     * Calculates the permissions for a given group JSON and user.
     *
     * @param json - The JSON containing group data
     * @param userID - The userID to check permissions for
     * @returns An object indicating whether the user can edit the library and files
     * @throws Error if JSON is invalid or userID not provided
     */
    function getPermissionsFromJSON(
      json: _ZoteroTypes.Groups.GroupJSON,
      userID: number,
    ): { editable: boolean; filesEditable: boolean };
  }
}

declare namespace _ZoteroTypes {
  namespace Groups {
    /**
     * The JSON structure that contains group information for permissions.
     */
    interface GroupJSON {
      /**
       * The userID of the group's owner
       */
      owner: number;

      /**
       * Array of userIDs that are admins of this group
       */
      admins?: number[];

      /**
       * Array of userIDs that are members of this group
       */
      members?: number[];

      /**
       * Library editing setting (e.g., 'members', 'none')
       */
      libraryEditing?: string;

      /**
       * File editing setting (e.g., 'members', 'none')
       */
      fileEditing?: string;
    }
  }
}
