/// <reference path="../data/item.d.ts" />
/// <reference path="../../../internal.d.ts" />

declare namespace _ZoteroTypes {
  interface ItemPaneManager {
    registerSection<T extends string>(
      options: ItemPaneManagerSection.ItemDetailsSectionOptions<T>,
    ): false | string;

    unregisterSection(key: string): boolean;

    registerInfoRow<T extends string>(
      options: ItemPaneManagerInfoRow.InfoRowOptions<T>,
    ): false | string;

    unregisterInfoRow(key: string): boolean;

    refreshInfoRow(rowID: string): void;
  }
  namespace ItemPaneManagerSection {
    type Icon16px = string | IconURI;
    type Icon20px = string | IconURI;

    type BuiltInPaneID =
      | "info"
      | "abstract"
      | "attachments"
      | "notes"
      | "attachment-info"
      | "attachment-annotations"
      | "libraries-collections"
      | "tags"
      | "related";
    type ExcludeBuiltInIDs<T extends string> = T extends BuiltInPaneID
      ? never
      : T;

    type ValidDOMString<T extends string> =
      T extends `${infer _Prefix},${infer _Suffix}` ? never : T;

    interface SectionHook {
      init(props: SectionInitHookArgs): void;
      destroy(props: BasicHookArgs): void;
      render(props: SectionHookArgs): void;
      itemChange(props: SectionHookArgs): void;
      asyncRender(props: SectionHookArgs): MaybePromise<void>;
      toggle(props: SectionEventHookArgs): void;
    }

    interface SectionButton {
      /** Button type, must be valid DOMString and without "," */
      type: ValidDOMString<string>; // TODO
      /** 16*16 Icon URI for section button in light mode */
      icon: Icon16px;
      /** 16*16 Icon URI for section button in dark mode. If not set, use icon */
      darkIcon?: Icon16px;
      /** data-l10n-id for localization of button tooltip text */
      l10nID?: string;
      /** Button click callback */
      onClick(props: SectionEventHookArgs): void;
    }

    interface BasicHookArgs {
      /** Registered pane id */
      paneID: string;
      /** Document of section */
      doc: Document;
      /** Section body */
      body: HTMLDivElement;
    }

    interface UIHookArgs {
      item: Zotero.Item;
      tabType: "library" | "reader";
      editable: boolean;

      /** Set l10n args for section header */
      setL10nArgs(l10nArgs: string): void;
      /** Set pane enabled state */
      setEnabled<T extends boolean>(enabled: T): T extends true ? false : true;
      /** Set summary in header */
      setSectionSummary<T extends string>(summary: T): T;
      /** Set the status of buttons */
      setSectionButtonStatus(
        buttonType: string,
        status: {
          disabled?: boolean;
          hidden?: boolean;
        },
      ): void;
    }

    interface SectionHookArgs
      extends Readonly<BasicHookArgs>,
        Readonly<UIHookArgs> {}

    interface SectionInitHookArgs extends SectionHookArgs {
      /** A `refresh` is exposed to plugins to allows plugins to refresh the section when necessary */
      refresh(): Promise<void>;
    }

    type SectionEventHookArgs = SectionHookArgs & { readonly event: Event };

    interface UIOptions {
      /** Icon URI in light mode */
      icon: string;
      darkIcon?: string;
      /** Pane data-l10n-id for localization of section head `label` or Sidenav data-l10n-id for localization of sidenav `tooltiptext` */
      l10nID: string;
      l10nArgs?: string;
    }

    interface ItemDetailsSectionOptions<T extends string> {
      /** Unique pane ID */
      paneID: ExcludeBuiltInIDs<T>;
      /** Set plugin ID to auto remove section when plugin is disabled/removed */
      pluginID: string;
      sidenav: UIOptions;
      header: UIOptions;
      onRender?: SectionHook["render"];
      onAsyncRender?: SectionHook["asyncRender"];
      onInit?: SectionHook["init"];
      onDestroy?: SectionHook["destroy"];
      onItemChange?: SectionHook["itemChange"];
      onToggle?: SectionHook["toggle"];

      /** Pane fragment as string */
      bodyXHTML?: string;
      sectionButtons?: SectionButton[];
    }
  }

  namespace ItemPaneManagerInfoRow {
    type ExcludeBuiltFields<T extends string> =
      T extends _ZoteroTypes.Item.ItemField ? never : T;

    interface BasicHookArgs {
      rowID: string;
      item: Zotero.Item;
      tabType: "library" | "reader";
      editable: boolean;
    }

    interface SetDataHookArgs extends BasicHookArgs {
      value: string;
    }

    interface ItemChangeHookArgs extends BasicHookArgs {
      setEnabled: (enabled: boolean) => void;
      setEditable: (editable: boolean) => void;
    }

    interface InfoRowOptions<T extends string> {
      rowID: ExcludeBuiltFields<T>;
      pluginID: string;
      label: {
        l10nID: string;
      };
      position?: "start" | "afterCreators" | "end";
      multiline?: boolean;
      nowrap?: boolean;
      editable?: boolean;
      onGetData: (options: BasicHookArgs) => string;
      onSetData?: (options: SetDataHookArgs) => void;
      onItemChange?: (options: ItemChangeHookArgs) => void;
    }
  }
}

declare namespace Zotero {
  const ItemPaneManager: _ZoteroTypes.ItemPaneManager;
}
