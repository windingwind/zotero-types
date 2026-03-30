/// <reference path="zoteroTabs.d.ts" />
/// <reference path="zoteroPane.d.ts" />
/// <reference path="zoteroContextPane.d.ts" />
/// <reference path="itemTree.d.ts" />
/// <reference path="collectionTree.d.ts" />
/// <reference path="promise.d.ts" />
/// <reference path="xpcom/index.d.ts" />
/// <reference path="elements/index.d.ts" />
/// <reference path="reader/index.d.ts" />

// Below are not implemented types

declare namespace _ZoteroTypes {
  /**
   * @example
   * var Zotero: _ZoteroConstructable = Components.classes[
   *  "@zotero.org/Zotero;1"
   * ].getService(Components.interfaces.nsISupports).wrappedJSObject;
   */
  type _ZoteroConstructable = typeof Zotero;
  type Zotero = _ZoteroConstructable;

  interface AvailableLocales {
    ar: "عربي";
    "bg-BG": "Български";
    br: "brezhoneg";
    "ca-AD": "Català";
    "cs-CZ": "Čeština";
    "da-DK": "Dansk";
    de: "Deutsch";
    "el-GR": "Ελληνικά";
    "en-AU": "English (Australian)";
    "en-CA": "English (Canada)";
    "en-US": "English";
    "en-GB": "English (UK)";
    "en-NZ": "English (New Zealand)";
    "es-ES": "Español";
    "et-EE": "Eesti keel";
    "eu-ES": "Euskara";
    fa: "فارسی";
    "fi-FI": "suomi";
    "fr-FR": "Français";
    "gl-ES": "Galego";
    "hu-HU": "magyar";
    "id-ID": "Bahasa Indonesia";
    "is-IS": "íslenska";
    "it-IT": "Italiano";
    "ja-JP": "日本語";
    km: "ខ្មែរ";
    "ko-KR": "한국어";
    "lt-LT": "Lietuvių";
    "nl-NL": "Nederlands";
    "nb-NO": "Norsk bokmål";
    "pl-PL": "Polski";
    "pt-BR": "Português (do Brasil)";
    "pt-PT": "Português (Europeu)";
    "ro-RO": "Română";
    "ru-RU": "Русский";
    "sk-SK": "slovenčina";
    "sl-SI": "Slovenščina";
    "sr-RS": "Српски";
    "sv-SE": "Svenska";
    "th-TH": "ไทย";
    "tr-TR": "Türkçe";
    "uk-UA": "Українська";
    "vi-VN": "Tiếng Việt";
    "zh-CN": "中文 (简体)";
    "zh-TW": "正體中文 (繁體)";
  }
}
