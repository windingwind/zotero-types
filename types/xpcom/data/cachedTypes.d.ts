/// <reference path="item.d.ts" />
/// <reference path="../../../internal.d.ts" />

declare namespace Zotero {
  /*
   * Base function for retrieving ids and names of static types stored in the DB
   * (e.g. creatorType, fileType, charset, itemType)
   *
   * Extend using the following code within a child constructor:
   *
   * 	Zotero.CachedTypes.apply(this, arguments);
   *  this.constructor.prototype = new Zotero.CachedTypes();
   *
   * And the following properties:
   *
   *	this._typeDesc = '';
   *	this._typeDescPlural = '';
   *	this._idCol = '';
   *	this._nameCol = '';
   *	this._table = '';
   *
   * Optional properties:
   *
   *  this._allowAdd: Allow new types to be added via .add(name)
   *	this._ignoreCase: Ignore case when looking for types, and add new types as lowercase
   *
   * And add .init() to zotero.js
   */
  interface CachedTypes {
    new (): this;
    _types: { [idOrName: string]: _ZoteroTypes.CachedTypes.Type };
    _typesArray: _ZoteroTypes.CachedTypes.Type[];
    _typeDesc: string;
    _idCol: string;
    _nameCol: string;
    _table: string;
    _allowAdd: boolean;
    _ignoreCase: boolean;
    _hasCustom: boolean;

    /**
     * Add a new type to the data and return its id. If the type already exists, return its id.
     *
     * @param {String} name - Type name to add
     * @return {Integer|False} - The type id (new or existing), or false if invalid type name
     */
    add(name: string): Promise<number | false>;

    init(): Promise<void>;
    getName(idOrName: number | string): string;
    getID(idOrName: number | string): number | false;
    getAll(): _ZoteroTypes.CachedTypes.Type[];
    getTypes(): _ZoteroTypes.CachedTypes.Type[];
    isCustom(idOrName: number | string): boolean; // Currently used only for item types
    _getTypesFromDB(where: string, params?: object): Promise<unknown>;
    _cacheTypeData(type: _ZoteroTypes.CachedTypes.Type): void;
  }

  const CreatorTypes: _ZoteroTypes.CreatorTypes;
  const ItemTypes: _ZoteroTypes.ItemTypes;
  const FileTypes: _ZoteroTypes.FileTypes;
  const CharacterSets: _ZoteroTypes.CharacterSets;
  const RelationPredicates: _ZoteroTypes.RelationPredicates;
}

declare namespace _ZoteroTypes {
  namespace CachedTypes {
    interface Type {
      custom?: boolean;
      id: number;
      name: string;
    }
  }

  interface CreatorTypes extends Zotero.CachedTypes {
    _typeDesc: "creator type";
    _typeDescPlural: "creator types";
    _idCol: "creatorTypeID";
    _nameCol: "creatorType";
    _table: "creatorTypes";
    getTypesForItemType(itemTypeID: number): _ZoteroTypes.CachedTypes.Type[];
    isValidForItemType(creatorTypeID: number, itemTypeID: number): boolean;
    getLocalizedString(idOrName: number | string): string;
    itemTypeHasCreators(itemTypeID: number): boolean;
    getPrimaryIDForType(itemTypeID: number): number | false;
  }

  namespace ItemTypes {
    type PrimaryTypeName =
      | "book"
      | "bookSection"
      | "journalArticle"
      | "newspaperArticle"
      | "document";
    type HiddenTypeName = "webpage" | "attachment" | "note" | "annotation";
  }

  interface ItemTypes extends Zotero.CachedTypes {
    customIDOffset: 10000;
    _typeDesc: "item type";
    _typeDescPlural: "item types";
    _idCol: "itemTypeID";
    _nameCol: "typeName";
    _table: "itemTypesCombined";
    _hasCustom: true;

    getPrimaryTypes(): _ZoteroTypes.CachedTypes.Type[];
    getSecondaryTypes(): _ZoteroTypes.CachedTypes.Type[];
    getHiddenTypes(): _ZoteroTypes.CachedTypes.Type[];
    getLocalizedString(idOrName: number | string): string;
    getImageSrc(itemType: _ZoteroTypes.Item.ItemType): _ZoteroTypes.IconURI;
  }

  interface FileTypes extends Zotero.CachedTypes {
    _typeDesc: "file type";
    _typeDescPlural: "file types";
    _idCol: "fileTypeID";
    _nameCol: "fileType";
    _table: "fileTypes";

    /**
     * @return {Promise<Integer>} fileTypeID
     */
    getIDFromMIMEType(mimeType: string): Promise<number>;
  }

  interface CharacterSets extends Zotero.CachedTypes {
    _typeDesc: "character set";
    _typeDescPlural: "character sets";
    _idCol: "charsetID";
    _nameCol: "charset";
    _table: "charsets";
    _ignoreCase: true;

    /**
     * Converts charset label to charset name
     * @link https://encoding.spec.whatwg.org/#names-and-labels
     * @param {String} charset
     * @return {String|Boolean} Normalized charset name or FALSE if not recognized
     */
    toCanonical(charset: string): string | false;

    /**
     * Normalizes charset label to conform to DOM standards
     * @link https://dom.spec.whatwg.org/#dom-document-characterset
     * @param {String} charset
     * @param {Boolean} mozCompat Whether to return a Mozilla-compatible label
     *   for use in Gecko internal APIs.
     *   https://developer.mozilla.org/en-US/docs/Gecko/Character_sets_supported_by_Gecko
     * @return {String|Boolean} Normalized label or FALSE is not recognized
     */
    toLabel(charset: string, mozCompat?: boolean): string | false;
  }

  interface RelationPredicates extends Zotero.CachedTypes {
    _typeDesc: "relation predicate";
    _typeDescPlural: "relation predicates";
    _idCol: "predicateID";
    _nameCol: "predicate";
    _table: "relationPredicates";
    _ignoreCase: false;
    _allowAdd: true;
  }
}
