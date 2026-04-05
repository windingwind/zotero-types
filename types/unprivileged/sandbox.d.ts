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

declare function isDeadWrapper(obj: any): boolean;

// Timer functions (setTimeout, setInterval, requestIdleCallback, etc.)
// are provided by the sandbox but also exist in lib.dom.d.ts.
// We do NOT redeclare them here to avoid conflicts when DOM lib is included.
