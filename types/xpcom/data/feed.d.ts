/// <reference path="library.d.ts" />

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
