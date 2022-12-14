declare namespace _ZoteroTypes {
  interface Prefs {
    get: (
      pref: string,
      global?: boolean | undefined
    ) => boolean | string | number | undefined;
    set: (
      pref: string,
      value: boolean | string | number,
      global?: boolean | undefined
    ) => any;
    clear(pref: string, global?: boolean | undefined): void;
  }
}
