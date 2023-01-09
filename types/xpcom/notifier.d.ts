declare namespace _ZoteroTypes {
  interface Notifier {
    registerObserver: (
      ref: { notify: Function },
      types?: string[],
      id?: string,
      priority?: null
    ) => string;
    unregisterObserver(id: String): void;
    trigger: (
      event: string,
      type: string,
      ids: number | number[],
      extraData?: any,
      force?: boolean
    ) => any;
  }
}
