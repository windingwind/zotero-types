/// <reference path="feed.d.ts" />

declare namespace _ZoteroTypes {
  /**
   * Mimics Zotero.Libraries
   */
  interface Feeds extends anyObj {}
}

declare namespace Zotero {
  const Feeds: _ZoteroTypes.Feeds;
}
