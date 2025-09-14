/// <reference path="../../xul.d.ts" />
/// <reference path="../data/item.d.ts" />

declare namespace _ZoteroTypes {
  namespace MenuManager {
    // Target type groups for better organization
    type MainMenubarTarget =
      | "main/menubar/file"
      | "main/menubar/edit"
      | "main/menubar/view"
      | "main/menubar/go"
      | "main/menubar/tools"
      | "main/menubar/help";

    type ReaderMenubarTarget =
      | "reader/menubar/file"
      | "reader/menubar/edit"
      | "reader/menubar/view"
      | "reader/menubar/go"
      | "reader/menubar/window";

    type LibraryTarget =
      | "main/library/item"
      | "main/library/collection"
      | "main/library/addAttachment"
      | "main/library/addNote";

    type NotesPaneTarget =
      | "notesPane/addItemNote"
      | "notesPane/addStandaloneNote";

    /**
     * Valid menu targets where custom menus can be registered
     */
    type ValidTarget =
      | MainMenubarTarget
      | ReaderMenubarTarget
      | LibraryTarget
      | NotesPaneTarget
      | "main/tab"
      | "itemPane/info/row"
      | "sidenav/locate";

    /**
     * Valid menu item types
     */
    type MenuType = "menuitem" | "separator" | "submenu";

    /**
     * Valid tab types for enableForTabTypes property
     */
    type TabType =
      | "library"
      | "reader/*"
      | "reader/pdf"
      | "reader/epub"
      | "reader/snapshot"
      | string;

    /**
     * Base context object provided to menu event handlers
     */
    interface BaseMenuContext {
      /** Reference to the menu element */
      readonly menuElem: XULElement;
      /** Set l10n arguments for the menu item */
      setL10nArgs(l10nArgs: object): void;
      /** Enable or disable the menu item */
      setEnabled(enabled: boolean): void;
      /** Show or hide the menu item */
      setVisible(visible: boolean): void;
      /** Set the icon for the menu item */
      setIcon(icon: string, darkIcon?: string): void;
    }

    /**
     * Common tab-related properties
     */
    interface TabProperties {
      /** Type of the tab */
      tabType: string;
      /** ID of the tab */
      tabID: string;
      /** Subtype of the tab (e.g., reader type) */
      tabSubType?: string;
    }

    /**
     * Common item-related properties
     */
    interface ItemProperties {
      /** Array of items */
      items: Zotero.Item[];
    }

    /**
     * Context object for main window tab menus
     */
    interface TabMenuContext
      extends BaseMenuContext,
        TabProperties,
        ItemProperties {}

    /**
     * Context object for library menus (item, collection, addAttachment, addNote)
     */
    interface LibraryMenuContext extends BaseMenuContext {
      /** Array of selected items */
      items?: Zotero.Item[];
      /** Collection tree row (for collection menus) */
      collectionTreeRow?: any;
      /** Type of the tab */
      tabType: "library";
      /** Subtype of the tab */
      tabSubType: undefined;
      /** ID of the tab */
      tabID: "zotero-pane";
    }

    /**
     * Context object for item pane info row menus
     */
    interface ItemPaneMenuContext
      extends BaseMenuContext,
        TabProperties,
        ItemProperties {
      /** Whether the field is editable */
      editable: boolean;
      /** Name of the field */
      fieldName: string;
      /** Weak reference to the target element */
      targetElem?: WeakRef<Element>;
    }

    /**
     * Context object for sidenav locate menus
     */
    interface SidenavMenuContext extends BaseMenuContext, ItemProperties {
      /** Type of the tab */
      tabType?: string;
      /** ID of the tab */
      tabID?: string;
      /** Subtype of the tab */
      tabSubType?: string;
    }

    /**
     * Context object for notes pane menus
     */
    interface NotesPaneMenuContext extends BaseMenuContext, ItemProperties {
      /** ID of the tab */
      tabID?: string;
      /** Type of the tab */
      tabType?: string;
      /** Subtype of the tab */
      tabSubType?: string;
    }

    /**
     * Context object for menubar menus (main window and reader)
     */
    interface MenubarMenuContext extends BaseMenuContext, ItemProperties {
      /** Type of the tab */
      tabType: string;
      /** Subtype of the tab */
      tabSubType?: string;
      /** ID of the tab */
      tabID?: string;
    }

    /**
     * Union type for all possible menu contexts
     */
    type MenuContext =
      | TabMenuContext
      | LibraryMenuContext
      | ItemPaneMenuContext
      | SidenavMenuContext
      | NotesPaneMenuContext
      | MenubarMenuContext
      | (BaseMenuContext & Record<string, any>);

    /**
     * Mapping of target types to their corresponding context types
     */
    type TargetToContextMap = {
      "main/tab": TabMenuContext;
      "main/library/item": LibraryMenuContext;
      "main/library/collection": LibraryMenuContext;
      "main/library/addAttachment": LibraryMenuContext;
      "main/library/addNote": LibraryMenuContext;
      "itemPane/info/row": ItemPaneMenuContext;
      "sidenav/locate": SidenavMenuContext;
      "notesPane/addItemNote": NotesPaneMenuContext;
      "notesPane/addStandaloneNote": NotesPaneMenuContext;
    } & {
      [K in MainMenubarTarget]: MenubarMenuContext;
    } & {
      [K in ReaderMenubarTarget]: MenubarMenuContext;
    };

    /**
     * Generic menu data interface with context-specific event handlers
     */
    interface MenuData<TContext = MenuContext> {
      menuType: MenuType;
      l10nID?: string;
      l10nArgs?: object;
      icon?: string;
      darkIcon?: string;
      enableForTabTypes?: TabType[];
      onShowing?: (event: Event, context: TContext) => void;
      onShown?: (event: Event, context: TContext) => void;
      onHiding?: (event: Event, context: TContext) => void;
      onHidden?: (event: Event, context: TContext) => void;
      onCommand?: (event: Event, context: TContext) => void;
      menus?: MenuData<TContext>[];
      /** @internal Generated unique key for the menu item */
      _key?: string;
    }

    /**
     * Generic menu options interface that infers context type from target
     */
    interface MenuOptions<T extends ValidTarget = ValidTarget> {
      menuID: string;
      pluginID: string;
      target: T;
      menus: MenuData<TargetToContextMap[T]>[];
      // l10nFiles?: string[];
    }

    // Specific menu option types for better type inference
    type TabMenuOptions = MenuOptions<"main/tab">;
    type LibraryMenuOptions = MenuOptions<LibraryTarget>;
    type ItemPaneMenuOptions = MenuOptions<"itemPane/info/row">;
    type SidenavMenuOptions = MenuOptions<"sidenav/locate">;
    type NotesPaneMenuOptions = MenuOptions<NotesPaneTarget>;
    type MenubarMenuOptions = MenuOptions<
      MainMenubarTarget | ReaderMenubarTarget
    >;

    /**
     * Union type for all menu options with proper context typing
     */
    type AllMenuOptions = MenuOptions<ValidTarget>;

    /**
     * Arguments for updating menu popup
     */
    interface UpdateMenuPopupArgs {
      /** The event that triggered the menu creation */
      event?: Event;
      /** Function to get the context object for the menu */
      getContext?: () => Partial<MenuContext>;
      /** The type of the tab, only for main window menubar menus */
      tabType?: string;
      /** The subtype of the tab/reader type, only for main window menubar menus and reader window menubar menus */
      tabSubType?: string;
      /** ID of the tab */
      tabID?: string;
      /** Whether to skip grouping the menus */
      skipGrouping?: boolean;
    }

    // Utility types for backwards compatibility and internal use
    type RequiredMenuOptionKeys = "menuID" | "pluginID" | "target";
    type MenuCustomOptions = Omit<AllMenuOptions, "menus"> & {
      menus?: AllMenuOptions["menus"];
    };
  }

  interface MenuManager {
    /**
     * Register a custom menu. All registered menus must be valid and have a unique menuID.
     * The context type is automatically inferred based on the target type.
     *
     * @param {MenuOptions} options - Menu registration options
     * @returns {string | false} - The menuID of the registered menu or false if registration failed
     * @example
     * A minimal custom menu for library items:
     * ```js
     * const registeredMenuID = Zotero.MenuManager.registerMenu({
     *   menuID: 'my-custom-menu',
     *   pluginID: 'my-plugin@example.com',
     *   target: 'main/library/item', // LibraryMenuContext is inferred
     *   menus: [{
     *     menuType: 'menuitem',
     *     l10nID: 'my-menu-item-label',
     *     onCommand: (event, context) => {
     *       // context is LibraryMenuContext with full type safety
     *       console.log('Processing', context.items?.length, 'items');
     *       console.log('Tab type:', context.tabType); // "library"
     *     }
     *   }]
     * });
     * ```
     * @example
     * A menu for item pane with field-specific context:
     * ```js
     * const registeredMenuID = Zotero.MenuManager.registerMenu({
     *   menuID: 'field-menu',
     *   pluginID: 'my-plugin@example.com',
     *   target: 'itemPane/info/row', // ItemPaneMenuContext is inferred
     *   menus: [{
     *     menuType: 'menuitem',
     *     l10nID: 'edit-field',
     *     onShowing: (event, context) => {
     *       // context is ItemPaneMenuContext with field-specific properties
     *       context.setEnabled(context.editable);
     *       console.log('Field:', context.fieldName, 'Items:', context.items);
     *     },
     *     onCommand: (event, context) => {
     *       // Edit the specific field with full type safety
     *       editField(context.items[0], context.fieldName);
     *     }
     *   }]
     * });
     * ```
     * @example
     * A complex custom menu for tab context with proper typing:
     * ```js
     * const registeredMenuID = Zotero.MenuManager.registerMenu({
     *   menuID: 'tab-menu',
     *   pluginID: 'my-plugin@example.com',
     *   target: 'main/tab', // TabMenuContext is inferred
     *   menus: [{
     *     menuType: 'menuitem',
     *     l10nID: 'tab-action',
     *     onCommand: (event, context) => {
     *       // context is TabMenuContext with tab-specific properties
     *       console.log('Tab ID:', context.tabID);
     *       console.log('Tab Type:', context.tabType);
     *       console.log('Tab SubType:', context.tabSubType);
     *       processTabItem(context.items[0]);
     *     }
     *   }]
     * });
     * ```
     */
    registerMenu<T extends MenuManager.ValidTarget>(
      options: MenuManager.MenuOptions<T>,
    ): string | false;

    /**
     * Unregister a custom menu by menuID.
     *
     * @param {string} menuID - The menuID of the menu to unregister
     * @returns {boolean} - True if the menu was successfully unregistered
     * @example
     * ```js
     * Zotero.MenuManager.unregisterMenu('my-custom-menu');
     * ```
     */
    unregisterMenu(menuID: string): boolean;

    /**
     * Update a popup element with custom menu items for the specified target type.
     * This method is typically called internally by Zotero when menus are shown.
     *
     * @param {XULPopupElement} popupElem - The popup element to update
     * @param {string} targetType - The target type of the menu
     * @param {UpdateMenuPopupArgs} [args] - Additional options for updating the popup
     * @example
     * ```js
     * // For main window tab context menu
     * Zotero.MenuManager.updateMenuPopup(popup, 'main/tab', {
     *   getContext: () => {
     *     let item = Zotero.Items.get(tab.data.itemID);
     *     return {
     *       items: [item],
     *       tabType: tab.type,
     *       tabID: id,
     *       tabSubType: item.attachmentReaderType,
     *     };
     *   }
     * });
     * ```
     * @example
     * ```js
     * // For library item context menu
     * Zotero.MenuManager.updateMenuPopup(menu, 'main/library/item', {
     *   getContext: () => ({
     *     collectionTreeRow,
     *     items,
     *     tabType: 'library',
     *     tabSubType: undefined,
     *     tabID: 'zotero-pane',
     *   })
     * });
     * ```
     * @example
     * ```js
     * // For item pane info row menu
     * Zotero.MenuManager.updateMenuPopup(popup, 'itemPane/info/row', {
     *   event: undefined,
     *   getContext: () => ({
     *     items: [this.item],
     *     tabID,
     *     tabType: this.tabType,
     *     tabSubType,
     *     editable: this.editable,
     *     fieldName,
     *     targetElem: targetElem ? new WeakRef(targetElem) : undefined,
     *   })
     * });
     * ```
     */
    updateMenuPopup(
      popupElem: XULPopupElement,
      targetType: MenuManager.ValidTarget,
      args?: MenuManager.UpdateMenuPopupArgs,
    ): void;
  }
}

declare namespace Zotero {
  const MenuManager: _ZoteroTypes.MenuManager;
}
