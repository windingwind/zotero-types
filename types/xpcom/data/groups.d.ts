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
