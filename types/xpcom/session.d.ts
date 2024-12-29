declare namespace Zotero {
  namespace Session {
    const state: Record<string, any>;

    function init(): Promise<void>;
    function save(): Promise<void>;
    function debounceSave(): Promise<void>;
    function setLastClosedZoteroPaneState(): void;
  }
}
