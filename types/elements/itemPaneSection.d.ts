/// <reference path="base.d.ts" />
/// <reference path="../xpcom/pluginAPI/itemPaneManager.d.ts" />

declare namespace _ZoteroTypes {
  class ItemPaneSectionElementBase extends XULElementBase {
    initCollapsibleSection(): void;
  }
  class ItemPaneCustomSection extends ItemPaneSectionElementBase {
    _hooks: {
      [hook in keyof ItemPaneManagerSection.SectionHook]?: ItemPaneManagerSection.SectionHook[hook];
    };
    _sectionButtons: Record<
      string,
      Omit<ItemPaneManagerSection.SectionButton, "type">
    >;
    _refreshDisabled: boolean;
    paneID: string;
    bodyXHTML: string;
    setL10nID(id: string): void;
    setL10nArgs(args: string): void;
    registerSectionIcon(icon: { icon: string; darkIcon?: string }): void;
    updateSectionIcon(): void;
    registerSectionButton(button: ItemPaneManagerSection.SectionButton): void;
    registerHook<T extends keyof ItemPaneManagerSection.SectionHook>(options: {
      type: T;
      callback: ItemPaneManagerSection.SectionHook[T];
    }): void;
    render(): false | void;
    asyncRender(): Promise<void | false>;
  }
}
