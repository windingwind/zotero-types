declare namespace XUL {
  interface IDisabled {
    disabled: boolean;
  }
  interface ICrop {
    crop: "start" | "end" | "center" | "none";
  }
  interface IValue {
    value: string;
  }
  interface ILabel {
    label: string;
  }
  interface ISelectedIndex {
    selectedIndex: number;
  }
  interface IProperties {
    properties: string;
  }

  interface Element extends HTMLElement {
    width: number | string;
    height: number | string;
    top: number | string;
    left: number | string;
    flex: number | string;
    align: "start" | "center" | "end" | "baseline" | "stretch";
    setAttribute(qualifiedName: string, value: string | any): void;
  }

  interface Description extends Element, IDisabled, ICrop, IValue {
    control: string;
  }

  interface Label extends Description {}

  interface Textbox extends Element, IValue, ILabel, IDisabled {
    readOnly: boolean;
    maxLength: number;
    clickSelectsAll: boolean;
    defaultValue: string;
    selectionStart: number;
    selectionEnd: number;
    type: "autocomplete" | "number" | "password" | "search";
    placeholder: string;
    size: number;
    readonly inputField: HTMLInputElement;
    reset(): void;
    select(): void;
    setSelectionRange(start: number, end: number): void;
  }

  interface Checkbox extends Element, ILabel, IDisabled {
    checked: boolean;
  }

  interface Radio extends Element, ILabel, IDisabled {
    selected: boolean;
    command: Command;
  }

  interface RadioGroup extends Element, IDisabled, IValue, ISelectedIndex {
    focusedItem: Radio;
    selectedItem: Radio;
    appendItem(lable: string, value?: string): Radio;
    insertItemAt: (index: number, label: string, value?: string) => Radio;
    removeItemAt(index: number): Radio;
  }

  interface GroupBox extends Element, ICrop, ILabel {}

  interface StatusBar extends Element {}

  interface StatusBarPanel extends Element, ILabel {}

  interface Separator extends Element {}

  interface Spacer extends Element {}

  interface ProgressMeter extends Element {
    mode: "determined" | "undetermined";
    value: number;
  }

  interface MenuBar extends Element {}

  interface Menu extends Element, IValue {}

  interface MenuPopup extends Popup {}

  interface Popup extends Element {
    /**
     * Closes the popup menu immediately.
     */
    hidePopup(): void;

    /**
     * menupopup.showPopup (someButton,-1,-1,"popup","bottomleft","topleft");
     */
    showPopup: (
      element: Element,
      x: number,
      y: number,
      popupType: "popup" | "context" | "tooltip",
      anchor: string,
      align: string,
    ) => void;

    /**
     * Changes the current size of the popup to a new width and height.
     */
    sizeTo(width: number, height: number): void;

    /**
     * Moves the popup to a new location.
     */
    moveTo(x: number, y: number): void;

    position:
      | "after_start"
      | "after_end"
      | "before_start"
      | "before_end"
      | "end_after"
      | "end_before"
      | "start_after"
      | "start_before"
      | "overlap"
      | "at_pointer"
      | "after_pointer";
  }

  interface MenuItem extends Element, ICrop, IValue, ILabel, IDisabled {
    command: string | Command;
    allowEvents: boolean;
    selected: boolean;
  }

  interface MenuList
    extends Element,
      ICrop,
      IValue,
      IDisabled,
      ILabel,
      ISelectedIndex {
    selectedItem: MenuItem;
    itemCount: number;
    description: string;
    open: false;
    readonly inputField: Textbox;

    getItemAtIndex(i: number): XUL.MenuItem;
    appendItem: (
      label: string,
      value?: string,
      description?: string,
    ) => XUL.MenuItem;
    insertItemAt: (
      index: number,
      label: string,
      value?: string,
      description?: string,
    ) => XUL.MenuItem;
  }

  interface MenuSeparator extends Element {}

  interface Tooltip extends ILabel, Popup {}

  interface ToolBox extends Element {}

  interface ToolBar extends Element {}

  interface ToolBarPalette extends Element {}

  interface ToolBarSet extends Element {}

  interface ToolBarButton extends Button {}

  interface ToolBarItem extends Element {}

  interface ToolBarSeparator extends Separator {}

  interface ToolBarSpacer extends Spacer {}

  interface ToolBarSpring extends Element {}

  interface ToolBarGrippy extends Grippy {}

  interface Box extends Element {
    maxHeight: number;
    minHeight: number;
    maxWidth: number;
    minWidth: number;
  }

  interface Deck extends Element, ISelectedIndex {
    selectedPanel: Element;
  }

  interface Tab extends Element {
    readonly selected: boolean;
    readonly control: Tabs;
  }

  interface Tabs extends Element, ISelectedIndex {
    itemCount: number;
    selectedItem: Tab;

    /**
     * @param dir
     * If the argument dir is set to 1, the currently selected tab changes to the next tab.
     * If the argument dir is set to -1, the currently selected tab changes to the previous tab.
     * @param wrap
     * If the wrap argument is true, the adjustment will wrap around when the first or last tab is reached.
     */
    advanceSelectedTab(dir: number, wrap: boolean): void;

    /**
     * Creates a new item and adds it to the end of the existing list of items.
     * You may optionally set a value.
     * @returns The function returns the newly created element.
     */
    appendItem(label: string, value: string): Tab;

    /**
     * This method creates a new item and inserts it at the specified position.
     * You may optionally set a value.
     * @returns The new item element is returned.
     */
    insertItemAt(index: number, label: string, value: string): Tab;

    /**
     * Removes the child item in the element at the specified index.
     * @returns The method returns the removed item.
     */
    removeItemAt(index: number): Tab;
  }

  interface TabPanel extends Element {}

  interface TabPanels extends Element, ISelectedIndex {
    selectedPanel: Element;
  }

  interface TabBox extends Element, ISelectedIndex {
    handleCtrlPageUpDown: boolean;
    handleCtrlTab: boolean;
    accessibleType: number;
    selectedPanel: Element;
    selectedTab: Tab;
    tabs: Tabs;
    tabpanels: TabPanels;
  }

  interface Button extends Element, IDisabled, ICrop, ILabel {
    checked: boolean;
    type: string;
    tooltiptext: string;
    autoCheck: boolean;
    checkState: number;
    dlgType: string;
    group: string;
    open: boolean;
  }

  interface ListItem extends Element {
    selectedItem: Element;
  }

  /**
   * Used to place a seperator row in a tree.
   */
  interface TreeSeparator extends Element, IProperties {}

  /**
   * A single row in a tree. It should be placed inside a treeitem element.
   * Children of the treerow should be treecell elements.
   * If child rows are necessary, they should be placed in a treechildren element inside the parent treeitem.
   */
  interface TreeRow extends Element, IProperties {}

  /**
   * A single cell in a tree. This element should be placed inside a treerow.
   * You can set the text for the cell using the label attribute.
   */
  interface TreeCell extends Element, IProperties, ILabel {
    mode: "none" | "normal" | "undetermined";
  }

  /**
   * A treeitem should be placed inside a treechildren element and should contain treerow elements.
   * The treeitem can be clicked by the user to select the row of the tree.
   * The treeitem contains a single row and all of what appear to the user as that row's descendants.
   */
  interface TreeItem extends Element, ILabel {
    open: boolean;
  }

  /**
   * This element is the body of the tree. For content trees, the content will be placed inside this element.
   * This element is also used to define container rows in the tree.
   */
  interface TreeChildren extends Element {
    alternatingbackground: boolean;
  }

  /**
   * A column of a tree.
   * It displays the column header and holds the size and other information about the column.
   * You can also place splitter elements between the columns to allow column resizing.
   * You should always place an id attribute on a treecol element to ensure that the column positioning is handled properly.
   */
  interface TreeCol extends Element, ICrop, ILabel {
    cycler: boolean;
    dragging: boolean;
    fixed: boolean;
    hideheader: boolean;
    ignoreincolumnpicker: boolean;
    primary: boolean;
    src: string;
    type: "checkbox" | "progressmeter" | "text";
  }

  /**
   * A group of treecol elements. There should one and only one treecols element in a tree.
   */
  interface TreeCols extends Element {
    pickertooltiptext: string;
  }

  interface Tree extends Element {
    disableKeyNavigation: boolean;
    enableColumnDrag: boolean;
    hidecolumnpicker: boolean;
    rows: number;
    selstyle: string;
    seltype: "single" | "multiple";
    currentIndex: number;
    firstOrdinalColumn: TreeCol;
  }

  interface ScrollBar extends Element {}

  interface Grippy extends Element {}

  interface Splitter extends Element {}

  interface ColorPicker extends Element, IDisabled {
    color: string;
  }

  interface Command extends Element, ILabel {
    oncommand(): any;
  }

  interface XULWindow extends Window {
    document: XMLDocument;
    arguments: any;
    openDialog: (
      target: string,
      type: string,
      params: string,
      extraParams?: object,
    ) => XULWindow;
  }

  interface XULEvent extends Event {
    target: Element;
  }
}
