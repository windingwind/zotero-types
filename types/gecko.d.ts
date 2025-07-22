/**
 * Tweaks to the Gecko types to make them compatible with the current version of Zotero.
 */

/// <reference path="./gecko/index.d.ts" />

declare namespace ChromeUtils {
  /**
   * @deprecated Use `ChromeUtils.importESModule` instead. See https://firefox-source-docs.mozilla.org/jsloader/jsloader-api.html#synchronous-module-import
   * @param aResourceURI
   * @param targetObj
   */
  function _import(aResourceURI: string, targetObj?: any): any;
  export { _import as import };
}

interface nsIXPCComponents_Utils {
  /**
   * @deprecated Use `ChromeUtils.importESModule` instead. See https://firefox-source-docs.mozilla.org/jsloader/jsloader-api.html#synchronous-module-import
   * @param aResourceURI
   * @param targetObj
   */
  import(aResourceURI: string, targetObj?: any): any;
}

interface DOMStringMap {
  [name: string]: string | undefined;
}

interface EventSourceEventMap {
  /**
   * Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document. A context object includes information about colors, line widths, fonts, and other graphic parameters that can be drawn on a canvas.
   * @param contextId The identifier (ID) of the type of canvas to create. Internet Explorer 9 and Internet Explorer 10 support only a 2-D context using canvas.getContext("2d"); IE11 Preview also supports 3-D or WebGL context using canvas.getContext("experimental-webgl");
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/getContext)
   */
  getContext(
    contextId: "2d",
    options?: CanvasRenderingContext2DSettings,
  ): CanvasRenderingContext2D | null;
  getContext(
    contextId: "bitmaprenderer",
    options?: ImageBitmapRenderingContext,
  ): ImageBitmapRenderingContext | null;
  getContext(
    contextId: "webgl",
    options?: WebGLContextAttributes,
  ): WebGLRenderingContext | null;
  getContext(
    contextId: "webgl2",
    options?: WebGLContextAttributes,
  ): WebGL2RenderingContext | null;
  getContext(contextId: string, options?: any): WebGLRenderingContext | null;
}
