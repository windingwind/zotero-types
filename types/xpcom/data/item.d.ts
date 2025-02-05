/// <reference path="dataObject.d.ts" />
/// <reference path="../attachments.d.ts" />
/// <reference path="../annotations.d.ts" />

declare namespace _ZoteroTypes {
  /*
   * Constructor for Item object
   */
  namespace Item {
    type DataType =
      | "primaryData"
      | "creators"
      | "itemData"
      | "note"
      | "annotation"
      | "annotationDeferred"
      | "childItems"
      | "tags"
      | "collections"
      | "relations";
    type ItemType =
      | "attachment-file"
      | "document"
      | "attachment-link"
      | "attachment-pdf"
      | "attachment-pdf-link"
      | "attachment-snapshot"
      | "attachment-web-link"
      | "artwork"
      | "audioRecording"
      | "bill"
      | "blogPost"
      | "book"
      | "bookSection"
      | "case"
      | "computerProgram"
      | "conferencePaper"
      | "dictionaryEntry"
      | "email"
      | "encyclopediaArticle"
      | "film"
      | "forumPost"
      | "hearing"
      | "instantMessage"
      | "interview"
      | "journalArticle"
      | "letter"
      | "magazineArticle"
      | "manuscript"
      | "newspaperArticle"
      | "note"
      | "patent"
      | "preprint"
      | "presentation"
      | "report"
      | "statute"
      | "thesis"
      | "webpage"
      | "map"
      | "podcast"
      | "radioBroadcast"
      | "tvBroadcast"
      | "videoRecording";
    type PrimaryField =
      | "itemID"
      | "itemTypeID"
      | "dateAdded"
      | "dateModified"
      | "libraryID"
      | "key"
      | "version"
      | "synced"
      | "createdByUserID"
      | "lastModifiedByUserID"
      | "firstCreator"
      | "sortCreator"
      | "deleted"
      | "inPublications"
      | "parentID"
      | "parentKey"
      | "attachmentCharset"
      | "attachmentLinkMode"
      | "attachmentContentType"
      | "attachmentPath"
      | "attachmentSyncState"
      | "attachmentSyncedModificationTime"
      | "attachmentSyncedHash"
      | "attachmentLastProcessedModificationTime"
      | "feedItemGUID"
      | "feedItemReadTime"
      | "feedItemTranslatedTime";
    type ItemField =
      | "title"
      | "firstCreator"
      | "abstractNote"
      | "artworkMedium"
      | "medium"
      | "artworkSize"
      | "date"
      | "language"
      | "shortTitle"
      | "archive"
      | "archiveLocation"
      | "libraryCatalog"
      | "callNumber"
      | "url"
      | "accessDate"
      | "rights"
      | "extra"
      | "audioRecordingFormat"
      | "seriesTitle"
      | "volume"
      | "numberOfVolumes"
      | "place"
      | "label"
      | "publisher"
      | "runningTime"
      | "ISBN"
      | "billNumber"
      | "number"
      | "code"
      | "codeVolume"
      | "section"
      | "codePages"
      | "pages"
      | "legislativeBody"
      | "session"
      | "history"
      | "blogTitle"
      | "publicationTitle"
      | "websiteType"
      | "type"
      | "series"
      | "seriesNumber"
      | "edition"
      | "numPages"
      | "bookTitle"
      | "caseName"
      | "court"
      | "dateDecided"
      | "docketNumber"
      | "reporter"
      | "reporterVolume"
      | "firstPage"
      | "versionNumber"
      | "system"
      | "company"
      | "programmingLanguage"
      | "proceedingsTitle"
      | "conferenceName"
      | "DOI"
      | "dictionaryTitle"
      | "subject"
      | "encyclopediaTitle"
      | "distributor"
      | "genre"
      | "videoRecordingFormat"
      | "forumTitle"
      | "postType"
      | "committee"
      | "documentNumber"
      | "interviewMedium"
      | "issue"
      | "seriesText"
      | "journalAbbreviation"
      | "ISSN"
      | "letterType"
      | "manuscriptType"
      | "mapType"
      | "scale"
      | "country"
      | "assignee"
      | "issuingAuthority"
      | "patentNumber"
      | "filingDate"
      | "applicationNumber"
      | "priorityNumbers"
      | "issueDate"
      | "references"
      | "legalStatus"
      | "episodeNumber"
      | "audioFileType"
      | "repository"
      | "archiveID"
      | "citationKey"
      | "presentationType"
      | "meetingName"
      | "programTitle"
      | "network"
      | "reportNumber"
      | "reportType"
      | "institution"
      | "nameOfAct"
      | "codeNumber"
      | "publicLawNumber"
      | "dateEnacted"
      | "thesisType"
      | "university"
      | "studio"
      | "websiteTitle";

    // [...new Set(Object.values(Zotero.ItemTypes._types).map(t => `${t.id}: "${t.name}"`))].join(';\n')
    type ItemTypeMapping = {
      1: "annotation";
      2: "artwork";
      3: "attachment";
      4: "audioRecording";
      5: "bill";
      6: "blogPost";
      7: "book";
      8: "bookSection";
      9: "case";
      10: "computerProgram";
      11: "conferencePaper";
      12: "dictionaryEntry";
      13: "document";
      14: "email";
      15: "encyclopediaArticle";
      16: "film";
      17: "forumPost";
      18: "hearing";
      19: "instantMessage";
      20: "interview";
      21: "journalArticle";
      22: "letter";
      23: "magazineArticle";
      24: "manuscript";
      25: "map";
      26: "newspaperArticle";
      27: "note";
      28: "patent";
      29: "podcast";
      30: "preprint";
      31: "presentation";
      32: "radioBroadcast";
      33: "report";
      34: "statute";
      35: "thesis";
      36: "tvBroadcast";
      37: "videoRecording";
      38: "webpage";
      39: "dataset";
      40: "standard";
    };

    type CreatorTypeMapping = {
      1: "artist";
      2: "contributor";
      3: "performer";
      4: "composer";
      5: "wordsBy";
      6: "sponsor";
      7: "cosponsor";
      8: "author";
      9: "commenter";
      10: "editor";
      11: "translator";
      12: "seriesEditor";
      13: "bookAuthor";
      14: "counsel";
      15: "programmer";
      16: "reviewedAuthor";
      17: "recipient";
      18: "director";
      19: "scriptwriter";
      20: "producer";
      21: "interviewee";
      22: "interviewer";
      23: "cartographer";
      24: "inventor";
      25: "attorneyAgent";
      26: "podcaster";
      27: "guest";
      28: "presenter";
      29: "castMember";
    };

    type CreatorTypeID = keyof CreatorTypeMapping;
    type CreatorType = CreatorTypeMapping[keyof CreatorTypeMapping];

    /**
     * Creator json for API
     * When Creator.fieldMode == 1, CreatorJSON.name == string,
     * else CreatosJSON.firstName and Creator.lastName == string
     */
    interface CreatorJSON {
      creatorType: CreatorTypeMapping[keyof CreatorTypeMapping];
      firstName?: string;
      name?: string;
      lastName?: string;
    }
    interface Creator {
      creatorTypeID: keyof CreatorTypeMapping;
      fieldMode: 0 | 1;
      firstName: string;
      lastName: string;
    }
  }
}

declare namespace Zotero {
  class Item extends Zotero.DataObject {
    static prototype: Zotero.Item;
    constructor(
      itemTypeOrID?:
        | keyof _ZoteroTypes.Item.ItemTypeMapping
        | _ZoteroTypes.Item.ItemTypeMapping[keyof _ZoteroTypes.Item.ItemTypeMapping],
    );
    _objectType: "item";
    readonly ContainerObjectsClass: Zotero.Collection;
    id: number;
    key: string;
    libraryID: number;
    dateAdded: string;
    dateModified: string;
    version: number;
    synced: boolean;
    inPublications: boolean;
    createdByUserID?: number;
    lastModifiedByUserID?: number;
    readonly itemTypeID: number;
    readonly itemType: _ZoteroTypes.Item.ItemType;
    parentItemID?: number | false;
    parentItemKey?: string | false;
    readonly parentItem?: Zotero.Item;
    readonly topLevelItem: Zotero.Item;
    readonly firstCreator: string;
    readonly sortCreator: string;
    readonly relatedItems: string[];
    readonly treeViewID: number;
    readonly note: string;
    isFeedItem: boolean;

    loadAllData(reload?: boolean): Promise<void>;

    isRegularItem(): boolean;
    isTopLevelItem(): boolean;

    ////////////////////////////////////////////////////////
    //
    //
    // Attachment methods
    //
    // save() is not required for attachment functions
    //
    //
    ///////////////////////////////////////////////////////

    /**
     * Determine if an item is an attachment
     **/
    isAttachment(): boolean;

    /**
     * Determine if an item is an annotation
     *
     * @return {Boolean}
     **/
    isAnnotation(): boolean;

    /**
     * @return {Boolean} - Returns true if item is a snapshot
     */
    isSnapshotAttachment(): boolean;

    /**
     * @return {Boolean} - Returns true if item is a stored or linked PDF attachment
     */
    isPDFAttachment(): boolean;

    isEmbeddedImageAttachment(): boolean;
    isImportedAttachment(): boolean;
    isStoredFileAttachment(): boolean;
    isWebAttachment(): boolean;
    isFileAttachment(): boolean;
    isLinkedFileAttachment(): boolean;

    /**
     * @return {Boolean} - Returns true if item is a stored or linked EPUB attachment
     */
    isEPUBAttachment(): boolean;

    /**
     * @return {Boolean} - Returns true if item is a stored or linked image attachment
     */
    isImageAttachment(): boolean;

    /**
     * @return {Boolean} - Returns true if item is a stored or linked video attachment
     */
    isVideoAttachment(): boolean;

    /**
     * Returns number of child attachments of item
     *
     * @param	{Boolean}	includeTrashed		Include trashed child items in count
     * @return	<Integer>
     */
    numAttachments(includeTrashed?: boolean): number;

    /**
     * Returns the number of file attachments of an item
     *
     * @return <Integer>
     */
    numFileAttachments(): number;

    addTag(name: string, type: number): boolean;
    removeTag(tag: string): boolean;
    // Only regular item
    addToCollection(id: number): void;
    getCollections(): number[];
    numChildren(includeTrashed?: boolean): number;
    numNonHTMLFileAttachments(): number;
    numPDFAttachments(): number;
    numAnnotations(includeTrashed?: boolean): number;

    /**
     * Returns number of child attachments of item
     *
     * @param	{Boolean}	includeTrashed		Include trashed child items in count
     * @return	<Integer>
     */
    numAttachments(includeTrashed?: boolean): number;

    isFieldOfBase(
      field: _ZoteroTypes.Item.ItemField | number,
      baseField: _ZoteroTypes.Item.ItemField | number,
    ): boolean;

    /**
     * Retrieves an itemData field value
     *
     * @param {String|Integer} field fieldID or fieldName
     * @param {Boolean} [unformatted] Skip any special processing of DB value
     *   (e.g. multipart date field)
     * @param {Boolean} includeBaseMapped If true and field is a base field, returns
     *   value of type-specific field instead
     *   (e.g. 'label' for 'publisher' in 'audioRecording')
     * @return {String} Value as string or empty string if value is not present
     */
    getField(
      field: _ZoteroTypes.Item.ItemField | number,
      unformatted?: boolean,
      includeBaseMapped?: boolean,
    ): string;
    getField(
      field: string,
      unformatted?: boolean,
      includeBaseMapped?: boolean,
    ): string;

    getExtraField(fieldName: string): string;

    /**
     * @param	{Boolean} asNames
     * @return	{Integer[]|String[]}
     */
    getUsedFields(asNames?: false): number[];
    getUsedFields(asNames: true): string[];

    /*
     * Populate basic item data from a database row
     */
    loadFromRow(
      row: { [col in _ZoteroTypes.Item.PrimaryField]?: unknown },
      reload?: boolean,
    ): void;

    /*
     * Set or change the item's type
     */
    setType(itemTypeID: number, loadIn?: boolean): boolean;

    /*
     * Find existing fields from current type that aren't in another
     *
     * If _allowBaseConversion_, don't return fields that can be converted
     * via base fields (e.g. label => publisher => studio)
     */
    getFieldsNotInType(
      itemTypeID: number,
      allowBaseConversion?: boolean,
    ): number[];

    /*
     * Set a field value, loading existing itemData first if necessary
     *
     * Field can be passed as fieldID or fieldName
     */
    setField(
      field: _ZoteroTypes.Item.ItemField | number,
      value: string | number | boolean,
      loadIn?: boolean,
    ): void;
    setField(
      field: string,
      value: string | number | boolean,
      loadIn?: boolean,
    ): void;

    /*
     * Get the title for an item for display in the interface
     *
     * This is the same as the standard title field (with includeBaseMapped on)
     * except for letters and interviews, which get placeholder titles in
     * square braces (e.g. "[Letter to Thoreau]"), and cases
     */
    getDisplayTitle(): string;

    /**
     * Update the generated display title from the loaded data
     */
    updateDisplayTitle(): void;

    /*
     * Returns the number of creators for this item
     */
    numCreators(): number;

    hasCreatorAt(pos: number): boolean;

    /**
     * @param  {Integer} pos
     * @return {Object|Boolean} The internal creator data object at the given position, or FALSE if none
     */
    getCreator(pos: number): _ZoteroTypes.Item.Creator | false;

    /**
     * @param  {Integer} pos
     * @return {Object|Boolean} The API JSON creator data at the given position, or FALSE if none
     */
    getCreatorJSON(pos: number): _ZoteroTypes.Item.CreatorJSON;

    /**
     * Returns creator data in internal format
     *
     * @return {Array<Object>}  An array of internal creator data objects
     *                          ('firstName', 'lastName', 'fieldMode', 'creatorTypeID')
     */
    getCreators(): _ZoteroTypes.Item.Creator[];

    /**
     * @return {Array<Object>} An array of creator data objects in API JSON format
     *                         ('firstName'/'lastName' or 'name', 'creatorType')
     */
    getCreatorsJSON(): _ZoteroTypes.Item.CreatorJSON[];

    /**
     * Set or update the creator at the specified position
     *
     * @param {Integer} orderIndex
     * @param {Object} Creator data in internal or API JSON format:
     *                   <ul>
     *                     <li>'name' or 'firstName'/'lastName', or 'firstName'/'lastName'/'fieldMode'</li>
     *                     <li>'creatorType' (can be name or id) or 'creatorTypeID'</li>
     *                   </ul>
     * @param {Object} [options]
     * @param {Boolean} [options.strict] - Throw on invalid creator type
     */
    setCreator(
      orderIndex: number,
      data: _ZoteroTypes.Item.CreatorJSON | _ZoteroTypes.Item.Creator,
      options?: { strict: boolean },
    ): boolean;

    /**
     * @param {Object[]} data - An array of creator data in internal or API JSON format
     */
    setCreators(
      data: Array<_ZoteroTypes.Item.CreatorJSON | _ZoteroTypes.Item.Creator>,
      options?: { strict: boolean },
    ): void;

    /*
     * Remove a creator and shift others down
     */
    removeCreator(orderIndex: number, allowMissing?: boolean): never | true;

    /**
     * Relate this item to another. A separate save is required.
     *
     * @param {Zotero.Item} item
     * @return {Boolean}
     */
    addRelatedItem(item: Zotero.Item): boolean;

    removeRelatedItem(item: Zotero.Item): Promise<boolean>;

    /**
     * @param {String} [op='edit'] - Operation to check; if not provided, check edit privileges for
     *     library
     */
    isEditable(op?: "edit" | "erase"): boolean;

    /**
     * Returns child attachments of this item
     *
     * @param	{Boolean}	includeTrashed		Include trashed child items
     * @return	{Integer[]}						Array of itemIDs
     */
    getAttachments(includeTrashed?: boolean): number[];

    /**
     * Looks for attachment in the following order: oldest PDF attachment matching parent URL,
     * oldest non-PDF attachment matching parent URL, oldest PDF attachment not matching URL,
     * old non-PDF attachment not matching URL
     *
     * @return {Promise<Zotero.Item|FALSE>} - A promise for attachment item or FALSE if none
     */
    getBestAttachment(): Promise<Zotero.Item | false>;

    /**
     * Looks for attachment in the following order: oldest PDF attachment matching parent URL,
     * oldest PDF attachment not matching parent URL, oldest non-PDF attachment matching parent URL,
     * old non-PDF attachment not matching parent URL
     *
     * @return {Promise<Zotero.Item[]>} - A promise for an array of Zotero items
     */
    getBestAttachments(): Promise<Zotero.Item[]>;

    /**
     * Return state of best attachment (or this item if it's a standalone attachment)
     *
     * @return {Promise<Object>} - Promise for object with string 'type' ('none'|'pdf'|'snapshot'|'other')
     *     and boolean 'exists'
     */
    getBestAttachmentState(): Promise<{
      type: "none" | "pdf" | "snapshot" | "other";
      exists: boolean;
    }>;

    /**
     * Return cached state of best attachment for use in items view
     *
     * @return {Object|null} - Resolved value from getBestAttachmentState() or { type: null } if
     *     unavailable
     */
    getBestAttachmentStateCached():
      | { type: "none" | "pdf" | "snapshot" | "other"; exists: boolean }
      | { type: null };

    clearBestAttachmentState(): void;

    // Only image annotation & attachment item
    isImportedAttachment(): boolean;
    isStoredFileAttachment(): boolean;
    isWebAttachment(): boolean;
    isFileAttachment(): boolean;
    isLinkedFileAttachment(): boolean;
    isEmbeddedImageAttachment(): boolean;

    /**
     * @return {Boolean} - Returns true if item is a snapshot
     */
    isSnapshotAttachment(): boolean;

    /**
     * @return {Boolean} - Returns true if item is a stored or linked PDF attachment
     */
    isPDFAttachment(): boolean;

    /**
     * Get the absolute file path for the attachment
     *
     * @return {string|false} - The absolute file path of the attachment, or false for invalid paths
     */
    getFilePath(): string | false;

    /**
     * Get the absolute path for the attachment, if the file exists
     *
     * @return {Promise<String|false>} - A promise for either the absolute path of the attachment
     *                                   or false for invalid paths or if the file doesn't exist
     */
    getFilePathAsync(): Promise<string | false>;

    /**
     * Update file existence state of this item and best attachment state of parent item
     */
    _updateAttachmentStates(exists: boolean): void;

    /**
     * Asynchronous check for file existence
     */
    fileExists(): Promise<boolean>;

    /**
     * Rename file associated with an attachment
     *
     * @param {String} newName
     * @param {Boolean} [overwrite=false] - Overwrite file if one exists
     * @param {Boolean} [unique=false] - Add suffix to create unique filename if necessary
     * @return {Number|false} -- true - Rename successful
     *                           -1 - Destination file exists; use _force_ to overwrite
     *                           -2 - Error renaming
     *                           false - Attachment file not found
     */
    renameAttachmentFile(
      newName: string,
      overwrite?: boolean,
      unique?: boolean,
    ): Promise<boolean | -1 | -2>;

    /**
     * @param {string} path  File path
     * @param {Boolean} [skipItemUpdate] Don't update attachment item mod time, so that item doesn't
     *     sync. Used when a file needs to be renamed to be accessible but the user doesn't have
     *     access to modify the attachment metadata. This also allows a save when the library is
     *     read-only.
     */
    relinkAttachmentFile(
      path: string,
      skipItemUpdate?: boolean,
    ): Promise<boolean>;

    deleteAttachmentFile(): Promise<boolean>;

    /*
     * Return a file:/// URL path to files and snapshots
     */
    getLocalFileURL(): string;

    readonly attachmentReaderType: keyof _ZoteroTypes.Reader.ViewTypeMap;

    /**
     * Link mode of an attachment
     *
     * Possible values specified as constants in Zotero.Attachments
     * (e.g. Zotero.Attachments.LINK_MODE_LINKED_FILE)
     */
    attachmentLinkMode: _ZoteroTypes.Attachments.LinkMode;

    /**
     * Content type of an attachment (e.g. 'text/plain')
     */
    attachmentContentType: string;

    /**
     * Character set of an attachment
     */
    attachmentCharset: string;

    /**
     * Get or set the filename of file attachments
     *
     * This will return the filename for all file attachments, but the filename can only be set
     * for stored file attachments. Linked file attachments should be set using .attachmentPath.
     */
    attachmentFilename: string;

    /**
     * Returns raw attachment path string as stored in DB
     * (e.g., "storage:foo.pdf", "attachments:foo/bar.pdf", "/Users/foo/Desktop/bar.pdf")
     *
     * Can be set as absolute path or prefixed string ("storage:foo.pdf")
     */
    attachmentPath: string;

    attachmentSyncState:
      | number
      | (
          | "to_upload"
          | "to_download"
          | "in_sync"
          | "force_upload"
          | "force_download"
          | "in_conflict"
        );
    attachmentSyncedModificationTime: number;
    attachmentSyncedHash: string;
    attachmentLastProcessedModificationTime: number;
    getAttachmentLastPageIndex(): number;
    setAttachmentLastPageIndex(val: number): Promise<boolean>;

    /**
     * Get the key for the item's pageIndex synced setting
     *
     * E.g., 'lastPageIndex_u_ABCD2345' or 'lastPageIndex_g123_ABCD2345'
     */
    _getLastPageIndexSettingKey(ignoreInvalid?: boolean): string;

    /**
     * Modification time of an attachment file
     *
     * Note: This is the mod time of the file itself, not the last-known mod time
     * of the file on the storage server as stored in the database
     *
     * @return {Promise<Number|undefined>} File modification time as timestamp in milliseconds,
     *                                     or undefined if no file
     */
    readonly attachmentModificationTime: Promise<number | undefined>;

    /**
     * MD5 hash of an attachment file
     *
     * Note: This is the hash of the file itself, not the last-known hash
     * of the file on the storage server as stored in the database
     *
     * @return {Promise<String>} - MD5 hash of file as hex string
     */
    readonly attachmentHash: Promise<string>;

    /**
     * Return plain text of attachment content
     *
     * - Currently works on HTML, PDF and plaintext attachments
     * - Paragraph breaks will be lost in PDF content
     *
     * @return {Promise<String>} - A promise for attachment text or empty string if unavailable
     */
    readonly attachmentText: Promise<string>;

    /**
     * Return dataURI of attachment content
     *
     * @return {Promise<String>} - A promise for attachment dataURI or empty string if unavailable
     */
    readonly attachmentDataURI: Promise<string>;

    // Only notes
    /**
     * Set an item note
     *
     * Note: This can only be called on notes and attachments
     */
    setNote(content: string): boolean;

    getNoteTitle(): string;

    /**
     * Determine if an item is a note
     */
    isNote(): boolean;

    /**
     * Returns number of child notes of item
     *
     * @param	{Boolean}	includeTrashed		Include trashed child items in count
     * @param	{Boolean}	includeEmbedded		Include notes embedded in attachments
     * @return	{Integer}
     */
    numNotes(includeTrashed?: boolean, includeEmbedded?: boolean): number;

    /**
     * Get the first line of the note for display in the items list
     *
     * @return	{String}
     */
    getNoteTitle(): string;

    /**
     * Get the text of an item note
     **/
    getNote(): string;

    /**
     * Returns child notes of this item
     *
     * @param	{Boolean}	includeTrashed		Include trashed child items
     * @param	{Boolean}	includeEmbedded		Include embedded attachment notes
     * @return	{Integer[]}						Array of itemIDs
     */
    getNotes(includeTrashed?: boolean): number[];

    hasNote(): Promise<boolean>;

    // Only Annotation
    getAnnotations(
      /**
       * Include trashed items.
       * @default true
       */
      includeTrashed?: boolean,
    ): Zotero.Item[];

    annotationType: _ZoteroTypes.Annotations.AnnotationType;
    annotationAuthorName: string;
    annotationComment: string;
    annotationText: string;
    annotationPosition: string;
    annotationColor: string;
    annotationPageLabel: string;
    annotationSortIndex: number;
    annotationIsExternal: boolean;

    isAnnotationSupportingImage(): boolean;

    /**
     * Returns child annotations for an attachment item
     *
     * @param {Boolean} [includeTrashed=false] - Include annotations in trash
     * @return {Zotero.Item[]}
     */
    getAnnotations(includeTrashed?: boolean): Zotero.Item[];

    /**
     * Determine if the item is a PDF attachment that exists on disk and contains
     * embedded markup annotations.
     *
     * @return {Promise<Boolean>}
     */
    hasEmbeddedAnnotations(): Promise<boolean>;

    //
    // Methods dealing with item tags
    //

    /**
     * Returns all tags assigned to an item
     *
     * @return {Array} Array of tag data in API JSON format
     */
    getTags(): Array<{ tag: string; type?: number }>;

    /**
     * Check if the item has a given tag
     *
     * @param {String} tagName
     * @return {Boolean}
     */
    hasTag(tagName: string): boolean;

    /**
     * Get the assigned type for a given tag of the item
     */
    getTagType(tagName: string): number | null;

    /**
     * Set the item's tags
     *
     * A separate save() is required to update the database.
     *
     * @param {String[]|Object[]} tags - Array of strings or object in API JSON format
     *                                   (e.g., [{tag: 'tag', type: 1}])
     */
    setTags(tags: Array<string | { tag: string; type: number }>): void;

    /**
     * Add a single tag to the item. If type is 1 and an automatic tag with the same name already
     * exists, replace it with a manual one.
     *
     * A separate save() is required to update the database.
     *
     * @param {String} name
     * @param {Number} [type=0]
     * @return {Boolean} - True if the tag was added; false if the item already had the tag
     */
    addTag(name: string, type?: number): boolean;

    /**
     * Replace an existing tag with a new manual tag
     *
     * A separate save() is required to update the database.
     *
     * @param {String} oldTag
     * @param {String} newTag
     */
    replaceTag(oldTag: string, newTag: string): boolean;

    /**
     * Remove a tag from the item
     *
     * A separate save() is required to update the database.
     *
     * @param {String} tagName
     * @return {Boolean} - True if the tag was removed; false if the item didn't have the tag
     */
    removeTag(tagName: string): boolean;

    /**
     * Remove all tags from the item
     *
     * A separate save() is required to update the database.
     */
    removeAllTags(): void;

    //
    // Methods dealing with collections
    //

    /**
     * Gets the collections the item is in
     *
     * @return {Array<Integer>}  An array of collectionIDs for all collections the item belongs to
     */
    getCollections(): number[];

    /**
     * Sets the collections the item is in
     *
     * A separate save() (with options.skipDateModifiedUpdate, possibly) is required to save changes.
     *
     * @param {Array<String|Integer>} collectionIDsOrKeys Collection ids or keys
     */
    setCollections(collectionIDsOrKeys: Array<string | number>): void;

    /**
     * Add this item to a collection
     *
     * A separate save() (with options.skipDateModifiedUpdate, possibly) is required to save changes.
     *
     * @param {Number} collectionID
     */
    addToCollection(collectionIDOrKey: number | string): void;

    /**
     * Remove this item from a collection
     *
     * A separate save() (with options.skipDateModifiedUpdate, possibly) is required to save changes.
     *
     * @param {Number} collectionID
     */
    removeFromCollection(collectionIDOrKey: number | string): void;

    /**
     * Determine whether the item belongs to a given collectionID
     */
    inCollection(collectionID: number): boolean;

    /**
     * Update item deleted (i.e., trash) state without marking as changed or modifying DB
     *
     * This is used by Zotero.Items.trash().
     *
     * Database state must be set separately!
     *
     * @param {Boolean} deleted
     */
    setDeleted(deleted?: boolean): void;

    /**
     * Update item publications state without marking as changed or modifying DB
     *
     * This is used by Zotero.Items.addToPublications()/removeFromPublications()
     *
     * Database state must be set separately!
     *
     * @param {Boolean} inPublications
     */
    setPublications(inPublications: boolean): void;

    getItemTypeIconName(): _ZoteroTypes.Item.ItemType;
    getImageSrc(): _ZoteroTypes.IconURI;

    /**
     * Return tags and colors
     *
     * @return {Object[]} - Array of object with 'tag' and 'color' properties
     */
    getColoredTags(): { tag: string; color: string };

    /**
     * Compare multiple items against this item and return fields that differ
     *
     * Currently compares only item data, not primary fields
     */
    multiDiff(
      otherItems: Zotero.Item[],
      ignoreFields?: string[],
    ):
      | false
      | {
          [field in _ZoteroTypes.Item.ItemField]?: Array<
            string | _ZoteroTypes.anyObj
          >;
        };

    /**
     * Returns an unsaved copy of the item without itemID and key
     *
     * This is used to duplicate items and copy them between libraries.
     *
     * @param {Number} [libraryID] - libraryID of the new item, or the same as original if omitted
     * @param {Boolean} [options.skipTags=false] - Skip tags
     * @param {Boolean} [options.includeCollections=false] - Add new item to all collections
     * @return {Zotero.Item}
     */
    clone(
      libraryID: number,
      options?: { skipTags?: boolean; includeCollections?: boolean },
    ): Zotero.Item;

    /**
     * @param {Integer} libraryID
     * @return {Zotero.Item} - New item
     */
    moveToLibrary(
      libraryID: number,
      onSkippedAttachment?: boolean,
    ): Promise<Zotero.Item>;

    isCollection(): false;

    /**
     * Populate the object's data from an API JSON data object
     *
     * @param {Object} json
     * @param {Object} [options]
     * @param {Boolean} [options.strict = false] - Throw on unknown field or invalid field for type
     */
    fromJSON(json: object, options?: { strict: boolean }): void;

    toJSON(options?: object): {
      [field in _ZoteroTypes.Item.ItemField]: string | unknown;
    };

    /**
     * Migrate valid fields in Extra to real fields
     *
     * A separate save is required
     */
    migrateExtraFields(): boolean;

    /**
     * Return an item in the specified library equivalent to this item
     *
     * @return {Promise<Zotero.Item>}
     */
    getLinkedItem(
      libraryID: number,
      bidirectional?: boolean,
    ): Promise<Zotero.Item | false>;

    /**
     * Add a linked-object relation pointing to the given item
     *
     * Does not require a separate save()
     *
     * @return {Promise}
     */
    addLinkedItem(item: Zotero.Item): Promise<boolean>;

    /**
     * Update createdByUserID/lastModifiedByUserID, efficiently
     *
     * Used by sync code
     */
    updateCreatedByUser(
      createdByUserID: number,
      lastModifiedByUserID: number,
    ): Promise<void>;
  }
}
