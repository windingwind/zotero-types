/// <reference path="item.d.ts" />
/// <reference path="../../../internal.d.ts" />

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
