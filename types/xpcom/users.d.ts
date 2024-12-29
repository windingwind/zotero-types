declare namespace _ZoteroTypes {
  interface Users {
    init(): Promise<void>;
    getCurrentUserID(): number;
    setCurrentUserID(val: number): Promise<void>;
    getCurrentUsername(): string;
    setCurrentUsername(val: string): Promise<void>;
    getCurrentName(): string;
    setCurrentName(name: string): Promise<void>;
    getLocalUserKey(): string;
    getName(userID: number | string): string;
    setName(userID: number, name: string): Promise<void>;
  }
}

declare namespace Zotero {
  const Users: _ZoteroTypes.Users;
}
