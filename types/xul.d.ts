/// <reference path="zotero.d.ts" />

declare namespace XUL {
  type Crop = 'start' | 'end' | 'center' | 'none';

  interface Element extends HTMLElement {
    width?: number | string;
    height?: number | string;
    top?: number | string;
    left?: number | string;
    flex?: number | string;
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    setAttribute(qualifiedName: string, value: string | any): void;
  }

  interface Description extends Element {
    disabled?: boolean;
    value?: string;
    crop?: Crop;
    control?: string;
  }

  interface Label extends Description { }

  interface Textbox extends Element {
    value?: string;
    readOnly?: boolean;
    maxLength?: number;
    label?: string;
    clickSelectsAll?: boolean;
    defaultValue?: string;
    selectionStart?: number;
    selectionEnd?: number;
    type?: 'autocomplete' | 'number' | 'password' | 'search';
    placeholder?: string;
    size?: number;
    readonly inputField?: HTMLInputElement;
    reset: () => void;
    select: () => void;
    setSelectionRange: (start: number, end: number) => void;
  }

  interface Checkbox extends Element {
    checked?: boolean;
    label?: string;
  }

  interface Radio extends Element {
    selected?: boolean;
    label?: string;
    command?: Command;
  }

  interface ProgressMeter extends Element { }

  interface Menupopup extends Element { }

  interface Menuitem extends Element {
    value: string;
    label: string;
  }

  interface Menulist extends Element {
    selectedItem?: Menuitem;
    value?: string;
    itemCount?: number;
    selectedIndex?: number;
    disabled?: boolean;
    getItemAtIndex?: (i: number) => XUL.Menuitem;
    appendItem?: (
      label: string,
      value?: string,
      description?: string
    ) => XUL.Menuitem;
    insertItemAt: (
      index: number,
      label: string,
      value?: string,
      description?: string
    ) => XUL.Menuitem;
  }

  interface ItemElement extends Element {
    item?: _ZoteroItem;
  }

  interface Box extends Element {
    maxHeight?: number;
    minHeight?: number;
    maxWidth?: number;
    minWidth?: number;
  }

  interface Deck extends Element {
    selectedIndex?: number;
    selectedPanel?: Element;
  }

  interface Tab extends Element {
    readonly selected?: boolean;
    readonly control?: Tabs;
  }

  interface Tabs extends Element {
    selectedIndex?: number;
    itemCount?: number;
    selectedItem?: Tab;

    /**
     * @param dir 
     * If the argument dir is set to 1, the currently selected tab changes to the next tab. 
     * If the argument dir is set to -1, the currently selected tab changes to the previous tab.
     * @param wrap 
     * If the wrap argument is true, the adjustment will wrap around when the first or last tab is reached.
     */
    advanceSelectedTab: (dir: number, wrap: boolean) => void;

    /**
     * Creates a new item and adds it to the end of the existing list of items. 
     * You may optionally set a value. 
     * @returns The function returns the newly created element.
     */
    appendItem: (label: string, value?: string) => Tab;

    /**
     * This method creates a new item and inserts it at the specified position. 
     * You may optionally set a value. 
     * @returns The new item element is returned.
     */
    insertItemAt: (index: number, label: string, value?: string) => Tab;

    /**
     * Removes the child item in the element at the specified index. 
     * @returns The method returns the removed item.
     */
    removeItemAt: (index: number) => Tab;
  }

  interface TabPanels extends Element {
    selectedIndex?: number;
    selectedPanel?: Element;
  }

  interface TabBox extends Element {
    handleCtrlPageUpDown?: boolean;
    handleCtrlTab?: boolean;
    accessibleType?: number;
    selectedIndex?: number;
    selectedPanel?: Element;
    selectedTab?: Tab;
    tabs?: Tabs;
    tabpanels?: TabPanels;
  }

  interface Button extends Element {
    checked?: boolean;
    type?: string;
    tooltiptext?: string;
  }

  interface ListItem extends Element {
    selectedItem?: Element;
  }

  /**
   * Used to place a seperator row in a tree.
   */
  interface TreeSeparator extends Element {
    properties?: string;
  }

  /**
   * A single row in a tree. It should be placed inside a treeitem element. 
   * Children of the treerow should be treecell elements. 
   * If child rows are necessary, they should be placed in a treechildren element inside the parent treeitem.
   */
  interface TreeRow extends Element {
    properties?: string;
  }

  /**
   * A single cell in a tree. This element should be placed inside a treerow. 
   * You can set the text for the cell using the label attribute.
   */
  interface TreeCell extends Element {
    label?: string;
    mode?: 'none' | 'normal' | 'undetermined';
    properties?: string;
  }

  /**
   * A treeitem should be placed inside a treechildren element and should contain treerow elements. 
   * The treeitem can be clicked by the user to select the row of the tree. 
   * The treeitem contains a single row and all of what appear to the user as that row's descendants.
   */
  interface TreeItem extends Element {
    label?: string;
    open?: boolean;
  }

  /**
   * This element is the body of the tree. For content trees, the content will be placed inside this element. 
   * This element is also used to define container rows in the tree.
   */
  interface TreeChildren extends Element {
    alternatingbackground?: boolean;
  }
  
  /**
   * A column of a tree. 
   * It displays the column header and holds the size and other information about the column. 
   * You can also place splitter elements between the columns to allow column resizing. 
   * You should always place an id attribute on a treecol element to ensure that the column positioning is handled properly.
   */
  interface TreeCol extends Element {
    crop?: Crop;
    cycler?: boolean;
    dragging?: boolean;
    fixed?: boolean;
    hideheader?: boolean;
    ignoreincolumnpicker?: boolean;
    label?: string;
    primary?: boolean;
    src?: string;
    type?: 'checkbox' | 'progressmeter' | 'text';
  }

  /**
   * A group of treecol elements. There should one and only one treecols element in a tree.
   */
  interface TreeCols extends Element {
    pickertooltiptext?: string;
  }

  interface Tree extends Element {
    disableKeyNavigation?: boolean;
    enableColumnDrag?: boolean;
    hidecolumnpicker?: boolean;
    rows?: number;
    selstyle?: string;
    seltype?: 'single' | 'multiple';
    currentIndex?: number;
    firstOrdinalColumn?: TreeCol;
  }

  interface Command extends Element {
    label?: string;
    oncommand: () => any;
  }

  interface XULWindow extends Window {
    document: XMLDocument;
    arguments: any;
    openDialog: (
      target: string,
      type: string,
      params: string,
      extraParams?: object
    ) => XULWindow;
  }

  interface XULEvent extends Event {
    target: Element;
  }
}
