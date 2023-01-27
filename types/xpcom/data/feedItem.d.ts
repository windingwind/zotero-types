/// <reference path="item.d.ts" />

declare namespace Zotero {
  interface FeedItem extends Zotero.Item {
    new (itemTypeOrID?: Item.ItemType | number, params?: object);
  }
}
