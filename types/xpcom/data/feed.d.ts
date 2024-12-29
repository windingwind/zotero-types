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
  class Feed extends Zotero.Library {
    constructor(params?: _ZoteroTypes.Feed.Params);
    static prototype: Zotero.Feed;
  }
}

declare namespace _ZoteroTypes {
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
