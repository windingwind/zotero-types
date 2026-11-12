/**
 * Type-level check of a window entry: everything the sandbox entry rejects is
 * available in `mainWindow`/`xhtml` code. Run with `npm test`.
 */
export const windowGlobals = {
  abortController: new AbortController(),
  structuredClone: structuredClone({ a: 1 }),
  request: new Request("https://example.com"),
  headers: new Headers(),
  queueMicrotask: queueMicrotask(() => {}),
  document: document.title,
  window: window.location.href,
  mutationObserver: new MutationObserver(() => {}),
  localStorage: localStorage.getItem("a"),
  navigator: navigator.userAgent,
  webSocket: new WebSocket("wss://example.com"),
  image: new Image(),
};
