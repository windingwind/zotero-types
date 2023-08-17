declare namespace _ZoteroTypes {
  namespace Reader {
    type SheetMetadata = {
      sheet?: CSSStyleSheet;
      scopeClass: string;
    };
    class StyleScoper {
      private _document: Document;
      private _sheets: Map<string, SheetMetadata>;
      private _textCache: Map<string, string>;
      constructor(document: Document);

      /**
       * @param css CSS stylesheet code
       * @return A class to add to the scope element
       */
      add(css: string): Promise<string>;

      /**
       * @param url The URL of a CSS stylesheet
       * @return A class to add to the scope element
       */
      addByURL(url: string): Promise<string>;
    }
  }
}
