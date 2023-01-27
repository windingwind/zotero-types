/// <reference path="library.d.ts" />

declare namespace Zotero {
  /**
   * Zotero.Feed, extends Zotero.Library
   *
   * Custom parameters:
   * - name - name of the feed displayed in the collection tree
   * - url
   * - cleanupReadAfter - number of days after which read items should be removed
   * - cleanupUnreadAfter - number of days after which unread items should be removed
   * - refreshInterval - in terms of hours
   *
   * @param params
   * @returns Zotero.Feed
   * @constructor
   */
  interface Feed extends Zotero.Library {
    new (params?: Feed.Params): this;
  }
  namespace Feed {
    interface Params extends _ZoteroTypes.Library.Params {
      name: string;
      url: string;
      refreshInterval: number;
      cleanupReadAfter: boolean;
      cleanupUnreadAfter: boolean;
    }
  }
}
