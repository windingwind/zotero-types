/// <reference path="base.d.ts" />

declare namespace _ZoteroTypes {
  class ItemPaneSectionElementBase extends XULElementBase {
    initCollapsibleSection(): void;
  }
  class ItemPaneCustomSection extends ItemPaneSectionElementBase {
    _hooks: {
      [hook in keyof ItemPaneManager.SectionHook]?: ItemPaneManager.SectionHook[hook];
    };
    _sectionButtons: Record<
      string,
      Omit<ItemPaneManager.SectionButton, "type">
    >;
    _refreshDisabled: boolean;
    paneID: string;
    bodyXHTML: string;
    setL10nID(id: string): void;
    setL10nArgs(args: string): void;
    registerSectionIcon(icon: { icon: string; darkIcon?: string }): void;
    updateSectionIcon(): void;
    registerSectionButton(button: ItemPaneManager.SectionButton): void;
    registerHook<T extends keyof ItemPaneManager.SectionHook>(options: {
      type: T;
      callback: ItemPaneManager.SectionHook[T];
    }): void;
    render(): false | void;
    asyncRender(): Promise<void | false>;
  }
}
