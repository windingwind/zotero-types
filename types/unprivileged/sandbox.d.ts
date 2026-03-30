// Sandbox globals provided to unprivileged plugin scopes by Zotero.

declare const rootURI: string;
declare const PERMISSIONS: readonly string[];
declare function loadSubScript(path: string): void;

declare function openWindow(
  url: string,
  features?: string,
  options?: {
    windowId?: string;
    onLoad?: (win: Window) => void;
  },
): Promise<Window>;

// Timer functions (setTimeout, setInterval, requestIdleCallback, etc.)
// are provided by the sandbox but also exist in lib.dom.d.ts.
// We do NOT redeclare them here to avoid conflicts when DOM lib is included.

// Localization constructor (provided by sandbox, based on gecko Localization)
declare class Localization {
  constructor(resourceIds: string[], sync?: boolean);
  addResourceIds(resourceIds: string[]): void;
  removeResourceIds(resourceIds: string[]): void;
  formatValue(
    id: string,
    args?: Record<string, string | number>,
  ): Promise<string>;
  formatValues(
    keys: Array<{ id: string; args?: Record<string, string | number> }>,
  ): Promise<string[]>;
  formatMessages(
    keys: Array<{ id: string; args?: Record<string, string | number> }>,
  ): Promise<any[]>;
  formatMessagesSync(
    keys: Array<{ id: string; args?: Record<string, string | number> }>,
  ): any[];
  setAsync(): void;
}
