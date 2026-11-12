/**
 * Type-level check of the `sandbox` entry: code loaded from a plugin's
 * bootstrap.js may only use the globals `_loadScope()` in Zotero's
 * chrome/content/zotero/xpcom/plugins.js puts into the sandbox.
 *
 * Every `@ts-expect-error` below must keep failing; a plain line must keep
 * compiling. Run with `npm test`.
 */

// Available in the sandbox.
export const available = {
  blob: new Blob([]),
  domParser: new DOMParser(),
  file: new File([], "a.txt"),
  fileReader: new FileReader(),
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
  url: new URL("https://example.com"),
  urlSearchParams: new URLSearchParams("a=1"),
  xmlHttpRequest: new XMLHttpRequest(),
  chromeWorker: new ChromeWorker("chrome://x.js"),
  worker: new Worker("chrome://x.js"),
  xmlSerializer: new XMLSerializer(),
  localization: new Localization(["x.ftl"]),
  crypto: crypto.randomUUID(),
  css: CSS.escape("a"),
  atob: atob("eA=="),
  btoa: btoa("x"),
  fetch: fetch("https://example.com"),
  timeout: setTimeout(() => {}, 1),
  clearTimeout: clearTimeout(1),
  interval: setInterval(() => {}, 1),
  clearInterval: clearInterval(1),
  idleCallback: requestIdleCallback(() => {}),
  cancelIdleCallback: cancelIdleCallback(1),
  chromeUtils: ChromeUtils.importESModule("resource://x.mjs"),
  ioUtils: IOUtils.exists("/"),
  pathUtils: PathUtils.join("a", "b"),
  zotero: Zotero.DB,
  services: Services.io,
  components: Components.classes,
};

// Not available in the sandbox.
export const unavailable = {
  // @ts-expect-error AbortController is a window global, not in the sandbox
  abortController: new AbortController(),
  // @ts-expect-error structuredClone is a window global, not in the sandbox
  structuredClone: structuredClone({ a: 1 }),
  // @ts-expect-error Request is a window global, not in the sandbox
  request: new Request("https://example.com"),
  // @ts-expect-error Headers is a window global, not in the sandbox
  headers: new Headers(),
  // @ts-expect-error queueMicrotask is not exposed by the sandbox
  queueMicrotask: queueMicrotask(() => {}),
  // @ts-expect-error document is a window global, not in the sandbox
  document: document.title,
  // @ts-expect-error window is not defined in the sandbox
  window: window.location.href,
  // @ts-expect-error the window event is not defined in the sandbox
  event: event,
  // @ts-expect-error MutationObserver is a window global, not in the sandbox
  mutationObserver: new MutationObserver(() => {}),
  // @ts-expect-error localStorage is a window global, not in the sandbox
  localStorage: localStorage.getItem("a"),
  // @ts-expect-error navigator is a window global, not in the sandbox
  navigator: navigator.userAgent,
  // @ts-expect-error performance is a window global, not in the sandbox
  performance: performance.now(),
  // @ts-expect-error WebSocket is a window global, not in the sandbox
  webSocket: new WebSocket("wss://example.com"),
  // @ts-expect-error an image element constructor is a window global
  image: new Image(),
  // @ts-expect-error Zotero does not put console into the sandbox scope
  console: console.log,
};
