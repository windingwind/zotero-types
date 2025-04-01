// @ts-nocheck
/// <reference lib="dom" />
declare var Glean: GleanImpl;
declare var GleanPings: GleanPingsImpl;
declare var InstallTrigger: InstallTriggerImpl | null;
declare var browserDOMWindow: nsIBrowserDOMWindow | null;
declare var browsingContext: BrowsingContext;
declare var clientInformation: Navigator;
declare var clientPrincipal: Principal | null;
declare var closed: boolean;
declare var content: any;
declare var controllers: XULControllers;
declare var cookieStore: CookieStore;
declare var customElements: CustomElementRegistry;
declare var desktopToDeviceScale: number;
declare var devicePixelRatio: number;
declare var docShell: nsIDocShell | null;
declare var document: Document | null;
declare var event: Event | undefined;
declare var external: External;
declare var frameElement: Element | null;
declare var frames: WindowProxy;
declare var fullScreen: boolean;
declare var history: History;
declare var innerHeight: number;
declare var innerWidth: number;
declare var intlUtils: IntlUtils;
declare var isChromeWindow: boolean;
declare var isFullyOccluded: boolean;
declare var isInFullScreenTransition: boolean;
// @ts-ignore
declare var isInstance: IsInstance<Window>;
declare var length: number;
declare var location: Location;
declare var locationbar: BarProp;
declare var menubar: BarProp;
declare var messageManager: ChromeMessageBroadcaster;
declare var mozInnerScreenX: number;
declare var mozInnerScreenY: number;
/** @deprecated */
declare const name: void;
declare var navigation: Navigation;
declare var navigator: Navigator;
declare var ondevicelight: ((this: Window, ev: Event) => any) | null;
declare var ondevicemotion: ((this: Window, ev: Event) => any) | null;
declare var ondeviceorientation: ((this: Window, ev: Event) => any) | null;
declare var ondeviceorientationabsolute: ((this: Window, ev: Event) => any) | null;
declare var onorientationchange: ((this: Window, ev: Event) => any) | null;
declare var onuserproximity: ((this: Window, ev: Event) => any) | null;
declare var onvrdisplayactivate: ((this: Window, ev: Event) => any) | null;
declare var onvrdisplayconnect: ((this: Window, ev: Event) => any) | null;
declare var onvrdisplaydeactivate: ((this: Window, ev: Event) => any) | null;
declare var onvrdisplaydisconnect: ((this: Window, ev: Event) => any) | null;
declare var onvrdisplaypresentchange: ((this: Window, ev: Event) => any) | null;
declare var opener: any;
declare var orientation: number;
declare var originAgentCluster: boolean;
declare var outerHeight: number;
declare var outerWidth: number;
declare var pageXOffset: number;
declare var pageYOffset: number;
declare var paintWorklet: Worklet;
declare var parent: WindowProxy | null;
declare var performance: Performance | null;
declare var personalbar: BarProp;
declare var realFrameElement: Element | null;
declare var screen: Screen;
declare var screenEdgeSlopX: number;
declare var screenEdgeSlopY: number;
declare var screenLeft: number;
declare var screenTop: number;
declare var screenX: number;
declare var screenY: number;
declare var scrollMaxX: number;
declare var scrollMaxY: number;
declare var scrollMinX: number;
declare var scrollMinY: number;
declare var scrollX: number;
declare var scrollY: number;
declare var scrollbars: BarProp;
declare var self: WindowProxy;
declare var status: string;
declare var statusbar: BarProp;
declare var toolbar: BarProp;
declare var top: WindowProxy | null;
declare var visualViewport: VisualViewport;
declare var window: WindowProxy;
declare var windowGlobalChild: WindowGlobalChild | null;
declare var windowRoot: WindowRoot | null;
declare var windowState: number;
declare var windowUtils: nsIDOMWindowUtils;
declare function alert(): void;
declare function alert(message: string): void;
declare function blur(): void;
declare function cancelIdleCallback(handle: number): void;
declare function captureEvents(): void;
declare function close(): void;
declare function confirm(message?: string): boolean;
declare function dump(str: string): void;
declare function find(str?: string, caseSensitive?: boolean, backwards?: boolean, wrapAround?: boolean, wholeWord?: boolean, searchInFrames?: boolean, showDialog?: boolean): boolean;
declare function focus(): void;
declare function getAttention(): void;
declare function getAttentionWithCycleCount(aCycleCount: number): void;
declare function getComputedStyle(elt: Element, pseudoElt?: string | null): CSSStyleDeclaration | null;
declare function getDefaultComputedStyle(elt: Element, pseudoElt?: string): CSSStyleDeclaration | null;
declare function getGroupMessageManager(aGroup: string): ChromeMessageBroadcaster;
declare function getInterface(iid: any): any;
declare function getRegionalPrefsLocales(): string[];
declare function getSelection(): Selection | null;
declare function getWebExposedLocales(): string[];
declare function getWorkspaceID(): string;
declare function matchMedia(query: string): MediaQueryList | null;
declare function maximize(): void;
declare function minimize(): void;
declare function moveBy(x: number, y: number): void;
declare function moveTo(x: number, y: number): void;
declare function moveToWorkspace(workspaceID: string): void;
declare function mozScrollSnap(): void;
declare function notifyDefaultButtonLoaded(defaultButton: Element): void;
declare function open(url?: string | URL, target?: string, features?: string): WindowProxy | null;
declare function openDialog(url?: string, name?: string, options?: string, ...extraArguments: any[]): WindowProxy | null;
declare function postMessage(message: any, targetOrigin: string, transfer?: any[]): void;
declare function postMessage(message: any, options?: WindowPostMessageOptions): void;
declare function print(): void;
declare function printPreview(settings?: nsIPrintSettings | null, listener?: nsIWebProgressListener | null, docShellToPreviewInto?: nsIDocShell | null): WindowProxy | null;
declare function promiseDocumentFlushed(callback: PromiseDocumentFlushedCallback): Promise<any>;
declare function prompt(message?: string, _default?: string): string | null;
declare function releaseEvents(): void;
declare function requestIdleCallback(callback: IdleRequestCallback, options?: IdleRequestOptions): number;
declare function resizeBy(x: number, y: number): void;
declare function resizeTo(x: number, y: number): void;
declare function restore(): void;
declare function scroll(x: number, y: number): void;
declare function scroll(options?: ScrollToOptions): void;
declare function scrollBy(x: number, y: number): void;
declare function scrollBy(options?: ScrollToOptions): void;
declare function scrollByLines(numLines: number, options?: ScrollOptions): void;
declare function scrollByPages(numPages: number, options?: ScrollOptions): void;
declare function scrollTo(x: number, y: number): void;
declare function scrollTo(options?: ScrollToOptions): void;
declare function setCursor(cursor: string): void;
declare function setResizable(resizable: boolean): void;
declare function setScrollMarks(marks: number[], onHorizontalScrollbar?: boolean): void;
declare function shouldReportForServiceWorkerScope(aScope: string): boolean;
declare function sizeToContent(constraints?: SizeToContentConstraints): void;
declare function stop(): void;
declare function updateCommands(action: string): void;
declare function toString(): string;
// @ts-ignore
declare var isInstance: IsInstance<EventTarget>;
declare var ownerGlobal: WindowProxy | null;
declare function dispatchEvent(event: Event): boolean;
declare function getEventHandler(type: string): EventHandler;
declare function setEventHandler(type: string, handler: EventHandler): void;
declare function cancelAnimationFrame(handle: number): void;
declare function requestAnimationFrame(callback: FrameRequestCallback): number;
declare var crypto: Crypto;
declare var onabort: ((this: Window, ev: Event) => any) | null;
declare var onanimationcancel: ((this: Window, ev: Event) => any) | null;
declare var onanimationend: ((this: Window, ev: Event) => any) | null;
declare var onanimationiteration: ((this: Window, ev: Event) => any) | null;
declare var onanimationstart: ((this: Window, ev: Event) => any) | null;
declare var onauxclick: ((this: Window, ev: Event) => any) | null;
declare var onbeforeinput: ((this: Window, ev: Event) => any) | null;
declare var onbeforetoggle: ((this: Window, ev: Event) => any) | null;
declare var onblur: ((this: Window, ev: Event) => any) | null;
declare var oncancel: ((this: Window, ev: Event) => any) | null;
declare var oncanplay: ((this: Window, ev: Event) => any) | null;
declare var oncanplaythrough: ((this: Window, ev: Event) => any) | null;
declare var onchange: ((this: Window, ev: Event) => any) | null;
declare var onclick: ((this: Window, ev: Event) => any) | null;
declare var onclose: ((this: Window, ev: Event) => any) | null;
declare var oncontentvisibilityautostatechange: ((this: Window, ev: Event) => any) | null;
declare var oncontextlost: ((this: Window, ev: Event) => any) | null;
declare var oncontextmenu: ((this: Window, ev: Event) => any) | null;
declare var oncontextrestored: ((this: Window, ev: Event) => any) | null;
declare var oncopy: ((this: Window, ev: Event) => any) | null;
declare var oncuechange: ((this: Window, ev: Event) => any) | null;
declare var oncut: ((this: Window, ev: Event) => any) | null;
declare var ondblclick: ((this: Window, ev: Event) => any) | null;
declare var ondrag: ((this: Window, ev: Event) => any) | null;
declare var ondragend: ((this: Window, ev: Event) => any) | null;
declare var ondragenter: ((this: Window, ev: Event) => any) | null;
declare var ondragexit: ((this: Window, ev: Event) => any) | null;
declare var ondragleave: ((this: Window, ev: Event) => any) | null;
declare var ondragover: ((this: Window, ev: Event) => any) | null;
declare var ondragstart: ((this: Window, ev: Event) => any) | null;
declare var ondrop: ((this: Window, ev: Event) => any) | null;
declare var ondurationchange: ((this: Window, ev: Event) => any) | null;
declare var onemptied: ((this: Window, ev: Event) => any) | null;
declare var onended: ((this: Window, ev: Event) => any) | null;
declare var onfocus: ((this: Window, ev: Event) => any) | null;
declare var onformdata: ((this: Window, ev: Event) => any) | null;
declare var ongotpointercapture: ((this: Window, ev: Event) => any) | null;
declare var oninput: ((this: Window, ev: Event) => any) | null;
declare var oninvalid: ((this: Window, ev: Event) => any) | null;
declare var onkeydown: ((this: Window, ev: Event) => any) | null;
declare var onkeypress: ((this: Window, ev: Event) => any) | null;
declare var onkeyup: ((this: Window, ev: Event) => any) | null;
declare var onload: ((this: Window, ev: Event) => any) | null;
declare var onloadeddata: ((this: Window, ev: Event) => any) | null;
declare var onloadedmetadata: ((this: Window, ev: Event) => any) | null;
declare var onloadstart: ((this: Window, ev: Event) => any) | null;
declare var onlostpointercapture: ((this: Window, ev: Event) => any) | null;
declare var onmousedown: ((this: Window, ev: Event) => any) | null;
declare var onmouseenter: ((this: Window, ev: Event) => any) | null;
declare var onmouseleave: ((this: Window, ev: Event) => any) | null;
declare var onmousemove: ((this: Window, ev: Event) => any) | null;
declare var onmouseout: ((this: Window, ev: Event) => any) | null;
declare var onmouseover: ((this: Window, ev: Event) => any) | null;
declare var onmouseup: ((this: Window, ev: Event) => any) | null;
declare var onmozfullscreenchange: ((this: Window, ev: Event) => any) | null;
declare var onmozfullscreenerror: ((this: Window, ev: Event) => any) | null;
declare var onpaste: ((this: Window, ev: Event) => any) | null;
declare var onpause: ((this: Window, ev: Event) => any) | null;
declare var onplay: ((this: Window, ev: Event) => any) | null;
declare var onplaying: ((this: Window, ev: Event) => any) | null;
declare var onpointercancel: ((this: Window, ev: Event) => any) | null;
declare var onpointerdown: ((this: Window, ev: Event) => any) | null;
declare var onpointerenter: ((this: Window, ev: Event) => any) | null;
declare var onpointerleave: ((this: Window, ev: Event) => any) | null;
declare var onpointermove: ((this: Window, ev: Event) => any) | null;
declare var onpointerout: ((this: Window, ev: Event) => any) | null;
declare var onpointerover: ((this: Window, ev: Event) => any) | null;
declare var onpointerup: ((this: Window, ev: Event) => any) | null;
declare var onprogress: ((this: Window, ev: Event) => any) | null;
declare var onratechange: ((this: Window, ev: Event) => any) | null;
declare var onreset: ((this: Window, ev: Event) => any) | null;
declare var onresize: ((this: Window, ev: Event) => any) | null;
declare var onscroll: ((this: Window, ev: Event) => any) | null;
declare var onscrollend: ((this: Window, ev: Event) => any) | null;
declare var onsecuritypolicyviolation: ((this: Window, ev: Event) => any) | null;
declare var onseeked: ((this: Window, ev: Event) => any) | null;
declare var onseeking: ((this: Window, ev: Event) => any) | null;
declare var onselect: ((this: Window, ev: Event) => any) | null;
declare var onselectionchange: ((this: Window, ev: Event) => any) | null;
declare var onselectstart: ((this: Window, ev: Event) => any) | null;
declare var onslotchange: ((this: Window, ev: Event) => any) | null;
declare var onstalled: ((this: Window, ev: Event) => any) | null;
declare var onsubmit: ((this: Window, ev: Event) => any) | null;
declare var onsuspend: ((this: Window, ev: Event) => any) | null;
declare var ontimeupdate: ((this: Window, ev: Event) => any) | null;
declare var ontoggle: ((this: Window, ev: Event) => any) | null;
declare var ontransitioncancel: ((this: Window, ev: Event) => any) | null;
declare var ontransitionend: ((this: Window, ev: Event) => any) | null;
declare var ontransitionrun: ((this: Window, ev: Event) => any) | null;
declare var ontransitionstart: ((this: Window, ev: Event) => any) | null;
declare var onvolumechange: ((this: Window, ev: Event) => any) | null;
declare var onwaiting: ((this: Window, ev: Event) => any) | null;
declare var onwebkitanimationend: ((this: Window, ev: Event) => any) | null;
declare var onwebkitanimationiteration: ((this: Window, ev: Event) => any) | null;
declare var onwebkitanimationstart: ((this: Window, ev: Event) => any) | null;
declare var onwebkittransitionend: ((this: Window, ev: Event) => any) | null;
declare var onwheel: ((this: Window, ev: Event) => any) | null;
declare var onerror: ((this: Window, ev: Event) => any) | null;
declare var speechSynthesis: SpeechSynthesis;
declare var ontouchcancel: ((this: Window, ev: Event) => any) | null;
declare var ontouchend: ((this: Window, ev: Event) => any) | null;
declare var ontouchmove: ((this: Window, ev: Event) => any) | null;
declare var ontouchstart: ((this: Window, ev: Event) => any) | null;
declare var onafterprint: ((this: Window, ev: Event) => any) | null;
declare var onbeforeprint: ((this: Window, ev: Event) => any) | null;
declare var onbeforeunload: ((this: Window, ev: Event) => any) | null;
declare var ongamepadconnected: ((this: Window, ev: Event) => any) | null;
declare var ongamepaddisconnected: ((this: Window, ev: Event) => any) | null;
declare var onhashchange: ((this: Window, ev: Event) => any) | null;
declare var onlanguagechange: ((this: Window, ev: Event) => any) | null;
declare var onmessage: ((this: Window, ev: Event) => any) | null;
declare var onmessageerror: ((this: Window, ev: Event) => any) | null;
declare var onoffline: ((this: Window, ev: Event) => any) | null;
declare var ononline: ((this: Window, ev: Event) => any) | null;
declare var onpagehide: ((this: Window, ev: Event) => any) | null;
declare var onpageshow: ((this: Window, ev: Event) => any) | null;
declare var onpopstate: ((this: Window, ev: Event) => any) | null;
declare var onrejectionhandled: ((this: Window, ev: Event) => any) | null;
declare var onstorage: ((this: Window, ev: Event) => any) | null;
declare var onunhandledrejection: ((this: Window, ev: Event) => any) | null;
declare var onunload: ((this: Window, ev: Event) => any) | null;
declare var localStorage: Storage | null;
declare var caches: CacheStorage;
declare var crossOriginIsolated: boolean;
declare var indexedDB: IDBFactory | null;
declare var isSecureContext: boolean;
declare var origin: string;
declare var scheduler: Scheduler;
declare var trustedTypes: TrustedTypePolicyFactory;
declare function atob(atob: string): string;
declare function btoa(btoa: string): string;
declare function clearInterval(handle?: number): void;
declare function clearTimeout(handle?: number): void;
declare function createImageBitmap(aImage: ImageBitmapSource, aOptions?: ImageBitmapOptions): Promise<ImageBitmap>;
declare function createImageBitmap(aImage: ImageBitmapSource, aSx: number, aSy: number, aSw: number, aSh: number, aOptions?: ImageBitmapOptions): Promise<ImageBitmap>;
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
declare function queueMicrotask(callback: VoidFunction): void;
declare function reportError(e: any): void;
declare function setInterval(handler: TimerHandler, timeout?: number, ...unused: any[]): number;
declare function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
declare function structuredClone(value: any, options?: StructuredSerializeOptions): any;
declare var sessionStorage: Storage | null;
declare function addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
declare function addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
declare function removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;