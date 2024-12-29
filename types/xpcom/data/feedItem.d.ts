/// <reference path="item.d.ts" />

declare namespace Zotero {
  class FeedItem extends Zotero.Item {
    constructor(
      itemTypeOrID?: _ZoteroTypes.Item.ItemType | number,
      params?: object,
    );
  }
}
