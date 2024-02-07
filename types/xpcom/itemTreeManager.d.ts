/// <reference path="data/item.d.ts" />

declare namespace _ZoteroTypes {
  namespace ItemTreeManager {
    /**
     * @type {object}
     * @property {string} dataKey - Required, see use in ItemTree#_getRowData()
     * @property {string} label - The column label. Either a string or the id to an i18n string.
     * @property {string} [pluginID] - Set plugin ID to auto remove column when plugin is removed.
     * @property {string[]} [enabledTreeIDs=[]] - Which tree ids the column should be enabled in. If undefined, enabled in main tree. If ["*"], enabled in all trees.
     * @property {string[]} [defaultIn] - Will be deprecated. Types of trees the column is default in. Can be [default, feed];
     * @property {string[]} [disabledIn] - Will be deprecated. Types of trees where the column is not available
     * @property {boolean} [sortReverse=false] - Default: false. Set to true to reverse the sort order
     * @property {number} [flex=1] - Default: 1. When the column is added to the tree how much space it should occupy as a flex ratio
     * @property {string} [width] - A column width instead of flex ratio. See above.
     * @property {boolean} [fixedWidth] - Default: false. Set to true to disable column resizing
     * @property {boolean} [staticWidth] - Default: false. Set to true to prevent columns from changing width when the width of the tree increases or decreases
     * @property {number} [minWidth] - Override the default [20px] column min-width for resizing
     * @property {React.Component} [iconLabel] - Set an Icon label instead of a text-based one
     * @property {string} [iconPath] - Set an Icon path, overrides {iconLabel}
     * @property {string | React.Component} [htmlLabel] - Set an HTML label, overrides {iconLabel} and {label}. Can be a HTML string or a React component.
     * @property {boolean} [showInColumnPicker=true] - Default: true. Set to true to show in column picker.
     * @property {boolean} [columnPickerSubMenu=false] - Default: false. Set to true to display the column in "More Columns" submenu of column picker.
     * @property {boolean} [primary] - Should only be one column at the time. Title is the primary column
     * @property {boolean} [custom] - Set automatically to true when the column is added by the user
     * @property {(item: Zotero.Item, dataKey: string) => string} [dataProvider] - Custom data provider that is called when rendering cells
     * @property {(index: number, data: string, column: ItemTreeColumnOptions & {className: string}) => HTMLElement} [renderCell] - The cell renderer function
     * @property {string[]} [zoteroPersist] - Which column properties should be persisted between zotero close
     */
    interface ItemTreeColumnOptions {
      dataKey: string;
      label: string;
      pluginID?: string;
      enabledTreeIDs?: string[];
      defaultIn?: string[];
      disabledIn?: string[];
      sortReverse?: boolean;
      flex?: number;
      width?: string;
      fixedWidth?: boolean;
      staticWidth?: boolean;
      minWidth?: number;
      iconLabel?: React.ReactElement;
      iconPath?: string;
      htmlLabel?: string | React.ReactElement;
      showInColumnPicker?: boolean;
      columnPickerSubMenu?: boolean;
      primary?: boolean;
      custom?: boolean;
      dataProvider?: (item: Zotero.Item, dataKey: string) => string;
      renderCell?: (
        index: number,
        data: string,
        column: ItemTreeColumnOptions & { className: string },
      ) => HTMLElement;
      zoteroPersist?: string[];
    }

    type RequiredCustomColumnOptionKeys = "dataKey" | "label" | "pluginID";
    type RequiredCustomColumnOptionsPartial = Required<
      Pick<ItemTreeColumnOptions, RequiredCustomColumnOptionKeys>
    >;
    type CustomColumnOptionsPartial = Omit<
      ItemTreeColumnOptions,
      RequiredCustomColumnOptionKeys
    >;
    type ItemTreeCustomColumnOptions = RequiredCustomColumnOptionsPartial &
      CustomColumnOptionsPartial;
    type ItemTreeCustomColumnFilters = Partial<
      Omit<ItemTreeCustomColumnOptions, "enabledTreeIDs">
    >;
  }
  interface ItemTreeManager {
    _observerAdded: boolean;
    _customColumns: Record<string, ItemTreeManager.ItemTreeCustomColumnOptions>;

    /**
     * Register a custom column. All registered columns must be valid, and must have a unique dataKey.
     * Although it's async, resolving does not promise the item trees are updated.
     *
     * Note that the `dataKey` you use here may be different from the one returned by the function.
     * This is because the `dataKey` is prefixed with the `pluginID` to avoid conflicts after the column is registered.
     * @param {ItemTreeCustomColumnOptions | ItemTreeCustomColumnOptions[]} options - An option or array of options to register
     * @returns {string | string[] | false} - The dataKey(s) of the added column(s) or false if no columns were added
     * @example
     * A minimal custom column:
     * ```js
     * // You can unregister the column later with Zotero.ItemTreeManager.unregisterColumns(registeredDataKey);
     * const registeredDataKey = await Zotero.ItemTreeManager.registerColumns(
     * {
     *     dataKey: 'rtitle',
     *     label: 'Reversed Title',
     *     pluginID: 'make-it-red@zotero.org', // Replace with your plugin ID
     *     dataProvider: (item, dataKey) => {
     *         return item.getField('title').split('').reverse().join('');
     *     },
     * });
     * ```
     * @example
     * A custom column using all available options.
     * Note that the column will only be shown in the main item tree.
     * ```js
     * const registeredDataKey = await Zotero.ItemTreeManager.registerColumns(
     * {
     *     dataKey: 'rtitle',
     *     label: 'Reversed Title',
     *     enabledTreeIDs: ['main'], // only show in the main item tree
     *     sortReverse: true, // sort by increasing order
     *     flex: 0, // don't take up all available space
     *     width: 100, // assign fixed width in pixels
     *     fixedWidth: true, // don't allow user to resize
     *     staticWidth: true, // don't allow column to be resized when the tree is resized
     *     minWidth: 50, // minimum width in pixels
     *     iconPath: 'chrome://zotero/skin/tick.png', // icon to show in the column header
     *     htmlLabel: '<span style="color: red;">reversed title</span>', // use HTML in the label. This will override the label and iconPath property
     *     showInColumnPicker: true, // show in the column picker
     *     columnPickerSubMenu: true, // show in the column picker submenu
     *     pluginID: 'make-it-red@zotero.org', // plugin ID, which will be used to unregister the column when the plugin is unloaded
     *     dataProvider: (item, dataKey) => {
     *         // item: the current item in the row
     *         // dataKey: the dataKey of the column
     *         // return: the data to display in the column
     *         return item.getField('title').split('').reverse().join('');
     *     },
     * 	   renderCell: (index, data, column) => {
     *         // index: the index of the row
     *         // data: the data to display in the column, return of `dataProvider`
     *         // column: the column options
     *         // return: the HTML to display in the cell
     *         const cell = document.createElement('span');
     *         cell.className = `cell ${column.className}`;
     *         cell.textContent = data;
     *         cell.style.color = 'red';
     *         return cell;
     *     },
     *     zoteroPersist: ['width', 'hidden', 'sortDirection'], // persist the column properties
     * });
     * ```
     * @example
     * Register multiple custom columns:
     * ```js
     * const registeredDataKeys = await Zotero.ItemTreeManager.registerColumns(
     * [
     *     {
     *          dataKey: 'rtitle',
     *          iconPath: 'chrome://zotero/skin/tick.png',
     *          label: 'Reversed Title',
     *          pluginID: 'make-it-red@zotero.org', // Replace with your plugin ID
     *          dataProvider: (item, dataKey) => {
     *              return item.getField('title').split('').reverse().join('');
     *          },
     *     },
     *     {
     *          dataKey: 'utitle',
     *          label: 'Uppercase Title',
     *          pluginID: 'make-it-red@zotero.org', // Replace with your plugin ID
     *          dataProvider: (item, dataKey) => {
     *              return item.getField('title').toUpperCase();
     *          },
     *     },
     * ]);
     * ```
     */
    registerColumns(
      options: ItemTreeManager.ItemTreeCustomColumnOptions,
    ): Promise<string | false>;
    registerColumns(
      options: ItemTreeManager.ItemTreeCustomColumnOptions[],
    ): Promise<string[] | false>;

    /**
     * Add a new column or new columns.
     * If the options is an array, all its children must be valid.
     * Otherwise, no columns are added.
     * @param {ItemTreeCustomColumnOptions | ItemTreeCustomColumnOptions[]} options - An option or array of options to add
     * @returns {string | string[] | false} - The dataKey(s) of the added column(s) or false if no columns were added
     */
    _addColumns(
      options: ItemTreeManager.ItemTreeCustomColumnOptions,
    ): string | false;
    _addColumns(
      options: ItemTreeManager.ItemTreeCustomColumnOptions[],
    ): string[] | false;

    /**
     * Unregister a custom column.
     * Although it's async, resolving does not promise the item trees are updated.
     * @param {string | string[]} dataKeys - The dataKey of the column to unregister
     * @returns {boolean} true if the column(s) are unregistered
     * @example
     * ```js
     * Zotero.ItemTreeManager.unregisterColumns(registeredDataKey);
     * ```
     */
    unregisterColumns(dataKeys: string | string[]): Promise<boolean>;

    /**
     * Get column(s) that matches the properties of option
     * @param {string | string[]} [filterTreeIDs] - The tree IDs to match
     * @param {ItemTreeCustomColumnFilters} [options] - An option or array of options to match
     * @returns {ItemTreeCustomColumnOptions[]}
     */
    getColumn(
      filterTreeIDs?: string | string[],
      options?: ItemTreeManager.ItemTreeCustomColumnFilters,
    ): ItemTreeManager.ItemTreeCustomColumnOptions[];

    /**
     * Check if a column is registered as a custom column
     * @param {string} dataKey - The dataKey of the column
     * @returns {boolean} true if the column is registered as a custom column
     */
    isCustomColumn(dataKey: string): boolean;

    /**
     * A centralized data source for custom columns. This is used by the ItemTreeRow to get data.
     * @param {Zotero.Item} item - The item to get data from
     * @param {string} dataKey - The dataKey of the column
     * @returns {string}
     */
    getCustomCellData(item: Zotero.Item, dataKey: string): string;

    /**
     * Check if column options is valid.
     * All its children must be valid. Otherwise, the validation fails.
     * @param {ItemTreeCustomColumnOptions[]} options - An array of options to validate
     * @returns {boolean} true if the options are valid
     */
    _validateColumnOption(
      options: ItemTreeManager.ItemTreeCustomColumnOptions[],
    ): boolean;

    /**
     * Add a new column or new columns.
     * If the options is an array, all its children must be valid.
     * Otherwise, no columns are added.
     * @param {ItemTreeCustomColumnOptions | ItemTreeCustomColumnOptions[]} options - An option or array of options to add
     * @returns {string | string[] | false} - The dataKey(s) of the added column(s) or false if no columns were added
     */
    _addColumns(
      options: ItemTreeManager.ItemTreeCustomColumnOptions,
    ): string | false;
    _addColumns(
      options: ItemTreeManager.ItemTreeCustomColumnOptions[],
    ): string[] | false;

    /**
     * Remove a column option
     * @param {string | string[]} dataKeys - The dataKey of the column to remove
     * @returns {boolean} - True if column(s) were removed, false if not
     */
    _removeColumns(dataKeys: string | string[]): boolean;

    /**
     * Make sure the dataKey is namespaced with the plugin ID
     * @param {ItemTreeCustomColumnOptions} options
     * @returns {string}
     */
    _namespacedDataKey(
      options: ItemTreeManager.ItemTreeCustomColumnOptions,
    ): string;

    /**
     * Reset the item trees to update the columns
     */
    _notifyItemTrees(): void;

    /**
     * Unregister all columns registered by a plugin
     * @param {string} pluginID - Plugin ID
     */
    _unregisterColumnByPluginID(pluginID: string): void;

    /**
     * Ensure that the shutdown observer is added
     * @returns {void}
     */
    _addPluginShutdownObserver(): void;
  }
}
