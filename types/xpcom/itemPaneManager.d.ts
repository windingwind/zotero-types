/// <reference path="data/item.d.ts" />
/// <reference path="../../internal.d.ts" />

declare namespace _ZoteroTypes {
  interface ItemPaneManager {
    registerSections<T extends string>(
      options: ItemPaneManager.ItemDetailsSectionOptions<T>,
    ): false | string;
    registerSections<T extends string>(
      options: ItemPaneManager.ItemDetailsSectionOptions<T>[],
    ): false | string[];
  }
  namespace ItemPaneManager {
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

    interface SectionButton {
      /** Button type, must be valid DOMString and without "," */
      type: string;
      /** 16*16 Icon URI for section button in light mode */
      icon: Icon16px;
      /** 16*16 Icon URI for section button in dark mode. If not set, use icon */
      darkIcon?: Icon16px;
      /** Button click callback */
      onClick: (options: SectionEventHookArgs) => void;
    }

    interface SectionHookArgs {
      /** Registered pane id */
      paneID: string;
      /** Document of section */
      doc: Document;
      /** Section body */
      body: HTMLDivElement;
      /** Get section data */
      getData: () => {
        item: Zotero.Item;
        mode: string;
        inTrash: boolean;
        tabType: string;
      };
      /** Set l10n args for section header */
      setL10nArgs: (l10nArgs: string) => void;
      /** Set pane enabled state */
      setEnabled: <T extends boolean>(
        enabled: T,
      ) => T extends true ? false : true;
    }

    interface SectionInitHookArgs extends SectionHookArgs {
      /** A `refresh` is exposed to plugins to allows plugins to refresh the section when necessary */
      refresh: () => Promise<void>;
    }

    interface SectionDataChangeHookArgs extends SectionHookArgs {
      /** Incoming data with the structure */
      incomingData: {
        type: "item" | "mode" | "inTrash" | "tabType";
        value: any;
      };
    }

    type SectionDestroyHookArgs = Omit<
      SectionHookArgs,
      "getData" | "setL10nArgs" | "setEnabled"
    >;

    type SectionEventHookArgs = SectionHookArgs & { event: Event };

    interface UIOptions {
      /** Icon URI in light mode */
      icon: string;
      /** Pane data-l10n-id for localization of section head `label` or Sidenav data-l10n-id for localization of sidenav `tooltiptext` */
      l10nID: string;
    }

    interface ItemDetailsSectionOptions<T extends string> {
      /** Unique pane ID */
      paneID: ExcludeBuiltInIDs<T>;
      /** Set plugin ID to auto remove section when plugin is disabled/removed */
      pluginID: string;
      sidenav: UIOptions;
      head: UIOptions;
      /** Pane fragment as string */
      fragment?: string;
      /** Lifecycle hook called when section is initialized */
      onInit?: (options: SectionInitHookArgs) => void;
      /** Lifecycle hook called when section is destroyed */
      onDestroy?: (options: SectionDestroyHookArgs) => void;
      /** Lifecycle hook called when section incoming data change received */
      onDataChange?: (options: SectionDataChangeHookArgs) => boolean;
      /** Lifecycle hook called when section should do primary render */
      onRender: (options: SectionHookArgs) => MaybePromise<void>;
      /** Lifecycle hook called when section should do secondary render */
      onSecondaryRender?: (options: SectionHookArgs) => MaybePromise<void>;
      /** Called when section is toggled */
      onToggle?: (options: SectionEventHookArgs) => void;
      /** Section button options */
      sectionButtons?: SectionButton[];
    }
  }
}
