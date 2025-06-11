/// <reference path="./gecko.d.ts" />

/** @deprecated - use XUL element interfaces directly */
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

  /** @deprecated - use XULElement */
  interface Element extends XULElement {}

  /** @deprecated - use XULDescriptionElement */
  interface Description extends XULDescriptionElement {}

  /** @deprecated - use XULLabelElement */
  interface Label extends XULLabelElement {}

  /** @deprecated - use XULTextBoxElement */
  interface Textbox extends XULTextBoxElement {}

  /** @deprecated - use XULCheckboxElement */
  interface Checkbox extends XULCheckboxElement {}

  /** @deprecated - use XULRadioElement */
  interface Radio extends XULRadioElement {}

  /** @deprecated - use XULRadioGroupElement */
  interface RadioGroup extends XULRadioGroupElement {}

  /** @deprecated - use XULGroupBoxElement */
  interface GroupBox extends XULGroupBoxElement {}

  /** @deprecated - use XULStatusBarElement */
  interface StatusBar extends XULStatusBarElement {}

  /** @deprecated - use XULStatusBarPanelElement */
  interface StatusBarPanel extends XULStatusBarPanelElement {}

  /** @deprecated - use XULSeparatorElement */
  interface Separator extends XULSeparatorElement {}

  /** @deprecated - use XULSpacerElement */
  interface Spacer extends XULSpacerElement {}

  /** @deprecated - use XULProgressMeterElement */
  interface ProgressMeter extends XULProgressMeterElement {}

  /** @deprecated - use XULMenuBarElement */
  interface MenuBar extends XULMenuBarElement {}

  /** @deprecated - use XULMenuElement */
  interface Menu extends XULMenuElement {}

  /** @deprecated - use XULMenuPopupElement */
  interface MenuPopup extends XULMenuPopupElement {}

  /** @deprecated - use XULMenuItemElement */
  interface MenuItem extends XULMenuItemElement {}

  /** @deprecated - use XULMenuListElement */
  interface MenuList extends XULMenuListElement {}

  /** @deprecated - use XULMenuSeparatorElement */
  interface MenuSeparator extends XULMenuSeparatorElement {}

  /** @deprecated - use XULTooltipElement */
  interface Tooltip extends XULTooltipElement {}

  /** @deprecated - use XULToolBoxElement */
  interface ToolBox extends XULToolBoxElement {}

  /** @deprecated - use XULToolBarElement */
  interface ToolBar extends XULToolBarElement {}

  /** @deprecated - use XULToolBarPaletteElement */
  interface ToolBarPalette extends XULToolBarPaletteElement {}

  /** @deprecated - use XULToolBarSetElement */
  interface ToolBarSet extends XULToolBarSetElement {}

  /** @deprecated - use XULToolBarButtonElement */
  interface ToolBarButton extends XULToolBarButtonElement {}

  /** @deprecated - use XULToolBarItemElement */
  interface ToolBarItem extends XULToolBarItemElement {}

  /** @deprecated - use XULToolBarSeparatorElement */
  interface ToolBarSeparator extends XULToolBarSeparatorElement {}

  /** @deprecated - use XULToolBarSpacerElement */
  interface ToolBarSpacer extends XULToolBarSpacerElement {}

  /** @deprecated - use XULToolBarSpringElement */
  interface ToolBarSpring extends XULToolBarSpringElement {}

  /** @deprecated - use XULToolBarGrippyElement */
  interface ToolBarGrippy extends XULToolBarGrippyElement {}

  /** @deprecated - use XULBoxElement */
  interface Box extends XULBoxElement {}

  /** @deprecated - use XULDeckElement */
  interface Deck extends XULDeckElement {}

  /** @deprecated - use XULTabElement */
  interface Tab extends XULTabElement {}

  /** @deprecated - use XULTabsElement */
  interface Tabs extends XULTabsElement {}

  /** @deprecated - use XULTabPanelElement */
  interface TabPanel extends XULTabPanelElement {}

  /** @deprecated - use XULTabPanelsElement */
  interface TabPanels extends XULTabPanelsElement {}

  /** @deprecated - use XULTabBoxElement */
  interface TabBox extends XULTabBoxElement {}

  /** @deprecated - use XULButtonElement */
  interface Button extends XULButtonElement {}

  /** @deprecated - use XULListItemElement */
  interface ListItem extends XULListItemElement {}

  /** @deprecated - use XULTreeSeparatorElement */
  interface TreeSeparator extends XULTreeSeparatorElement {}

  /** @deprecated - use XULTreeRowElement */
  interface TreeRow extends XULTreeRowElement {}

  /** @deprecated - use XULTreeCellElement */
  interface TreeCell extends XULTreeCellElement {}

  /** @deprecated - use XULTreeItemElement */
  interface TreeItem extends XULTreeItemElement {}

  /** @deprecated - use XULTreeChildrenElement */
  interface TreeChildren extends XULTreeChildrenElement {}

  /** @deprecated - use XULTreeColElement */
  interface TreeCol extends XULTreeColElement {}

  /** @deprecated - use XULTreeColsElement */
  interface TreeCols extends XULTreeColsElement {}

  /** @deprecated - use XULTreeElement */
  interface Tree extends XULTreeElement {}

  /** @deprecated - use XULScrollBarElement */
  interface ScrollBar extends XULScrollBarElement {}

  /** @deprecated - use XULGrippyElement */
  interface Grippy extends XULGrippyElement {}

  /** @deprecated - use XULSplitterElement */
  interface Splitter extends XULSplitterElement {}

  /** @deprecated - use XULColorPickerElement */
  interface ColorPicker extends XULColorPickerElement {}

  /** @deprecated - use XULCommandElement */
  interface Command extends XULCommandElement {}

  /** @deprecated - use XULWindowElement */
  interface XULWindow extends XULWindowElement {}

  /** @deprecated - use Event */
  interface XULEvent extends Event {}
}

declare interface XULElement
  extends Element,
    ElementCSSInlineStyle,
    GlobalEventHandlers,
    HTMLOrForeignElement,
    OnErrorEventHandlerForNodes,
    TouchEventHandlers {
  width: number | string;
  height: number | string;
  top: number | string;
  left: number | string;
  flex: number | string;
  align: "start" | "center" | "end" | "baseline" | "stretch";
}

declare interface XULDescriptionElement
  extends XULElement,
    XUL.IDisabled,
    XUL.ICrop,
    XUL.IValue {
  control: string;
}

declare interface XULLabelElement extends XULElement, XUL.Description {}

declare interface XULTextBoxElement
  extends XULElement,
    XUL.IValue,
    XUL.ILabel,
    XUL.IDisabled {
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

declare interface XULCheckboxElement
  extends XULElement,
    XUL.ILabel,
    XUL.IDisabled {
  checked: boolean;
}

declare interface XULRadioElement
  extends XULElement,
    XUL.ILabel,
    XUL.IDisabled {
  selected: boolean;
  command: XUL.Command;
}

declare interface XULRadioGroupElement
  extends XULElement,
    XUL.IDisabled,
    XUL.IValue,
    XUL.ISelectedIndex {
  selectedIndex: number;
  selectedItem: XULRadioElement;
  appendItem(label: string, value?: string): XULRadioElement;
  insertItemAt(index: number, label: string, value?: string): XULRadioElement;
  removeItemAt(index: number): XULRadioElement;
}

declare interface XULGroupBoxElement
  extends XULElement,
    XUL.ICrop,
    XUL.ILabel {}

declare interface XULStatusBarElement extends XULElement {}

declare interface XULStatusBarPanelElement extends XULElement, XUL.ILabel {}

declare interface XULSeparatorElement extends XULElement {}

declare interface XULSpacerElement extends XULElement {}

declare interface XULProgressMeterElement extends XULElement {
  mode: "determined" | "undetermined";
  value: number;
}

declare interface XULMenuBarElement extends XULElement {}

declare interface XULMenuElement extends XULElement, XUL.IValue {}

declare interface XULPopupElement extends XULElement {
  // @ts-ignore - Override XULElement open property
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

  /**
   * This read only property indicates whether the popup is open or not. Four values are possible:
   * - closed: The popup is closed and not visible.
   * - open: The popup is open and visible on screen.
   * - showing: A request has been made to open the popup, but it has not yet been shown. This state will occur during the popupshowing event.
   * - hiding: The popup is about to be hidden. This state will occur during the popuphiding event.
   */
  // @ts-ignore - Override XULElement state property
  readonly state: "closed" | "open" | "showing" | "hiding";
}

declare interface XULMenuPopupElement extends XULPopupElement {}

declare interface XULMenuItemElement
  extends XULElement,
    XUL.ICrop,
    XUL.IValue,
    XUL.ILabel,
    XUL.IDisabled {
  command: string | XUL.Command;
  allowEvents: boolean;
  selected: boolean;
}

declare interface XULMenuListElement
  extends XULElement,
    XUL.ICrop,
    XUL.IValue,
    XUL.IDisabled,
    XUL.ILabel,
    XUL.ISelectedIndex {
  selectedItem: XULMenuItemElement;
  itemCount: number;
  description: string;
  open: false;
  readonly inputField: XULTextBoxElement;

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

declare interface XULMenuSeparatorElement extends XULElement {}

declare interface XULTooltipElement extends XULPopupElement, XUL.ILabel {}

declare interface XULToolBoxElement extends XULElement {}

declare interface XULToolBarElement extends XULElement {}

declare interface XULToolBarPaletteElement extends XULElement {}

declare interface XULToolBarSetElement extends XULElement {}

declare interface XULToolBarButtonElement extends XULButtonElement {}

declare interface XULToolBarItemElement extends XULElement {}

declare interface XULToolBarSeparatorElement extends XULElement {}

declare interface XULToolBarSpacerElement extends XULSpacerElement {}

declare interface XULToolBarSpringElement extends XULElement {}

declare interface XULToolBarGrippyElement extends XULGrippyElement {}

declare interface XULBoxElement extends XULElement, XUL.ICrop {
  orient: "horizontal" | "vertical";
  pack: "start" | "center" | "end";
  maxHeight: number;
  minHeight: number;
  maxWidth: number;
  minWidth: number;
}

declare interface XULDeckElement extends XULElement, XUL.ISelectedIndex {
  selectedPanel: XULElement;
  selectedIndex: number;
}

declare interface XULTabElement extends XULElement {
  readonly selected: boolean;
  readonly control: XULTabsElement;
}

declare interface XULTabsElement extends XULElement, XUL.ISelectedIndex {
  itemCount: number;
  selectedItem: XULTabElement;

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
  appendItem(label: string, value: string): XULTabElement;

  /**
   * This method creates a new item and inserts it at the specified position.
   * You may optionally set a value.
   * @returns The new item element is returned.
   */
  insertItemAt(index: number, label: string, value: string): XULTabElement;

  /**
   * Removes the child item in the element at the specified index.
   * @returns The method returns the removed item.
   */
  removeItemAt(index: number): XULTabElement;
}

declare interface XULTabPanelElement extends XULElement {}

declare interface XULTabPanelsElement extends XULElement, XUL.ISelectedIndex {
  selectedPanel: XULElement;
}

declare interface XULTabBoxElement extends XULElement, XUL.ISelectedIndex {
  handleCtrlPageUpDown: boolean;
  handleCtrlTab: boolean;
  accessibleType: number;
  selectedPanel: Element;
  selectedTab: XULTabElement;
  tabs: XULTabsElement;
  tabpanels: XULTabPanelsElement;
}

declare interface XULButtonElement
  extends XULElement,
    XUL.IDisabled,
    XUL.ICrop,
    XUL.ILabel {
  checked: boolean;
  type: string;
  tooltiptext: string;
  autoCheck: boolean;
  checkState: number;
  dlgType: string;
  group: string;
  open: boolean;
}

declare interface XULListItemElement extends XULElement {
  selectedItem: XULElement;
}

/**
 * Used to place a seperator row in a tree.
 */
declare interface XULTreeSeparatorElement extends XULElement, XUL.IProperties {}

/**
 * A single row in a tree. It should be placed inside a treeitem element.
 * Children of the treerow should be treecell elements.
 * If child rows are necessary, they should be placed in a treechildren element inside the parent treeitem.
 */
declare interface XULTreeRowElement extends XULElement, XUL.IProperties {}

/**
 * A single cell in a tree. This element should be placed inside a treerow.
 * You can set the text for the cell using the label attribute.
 */
declare interface XULTreeCellElement
  extends XULElement,
    XUL.IProperties,
    XUL.ILabel {
  mode: "none" | "normal" | "undetermined";
}

/**
 * A treeitem should be placed inside a treechildren element and should contain treerow elements.
 * The treeitem can be clicked by the user to select the row of the tree.
 * The treeitem contains a single row and all of what appear to the user as that row's descendants.
 */
declare interface XULTreeItemElement extends XULElement, XUL.ILabel {
  open: boolean;
}

/**
 * This element is the body of the tree. For content trees, the content will be placed inside this element.
 * This element is also used to define container rows in the tree.
 */
declare interface XULTreeChildrenElement extends XULElement {
  alternatingbackground: boolean;
}

/**
 * A column of a tree.
 * It displays the column header and holds the size and other information about the column.
 * You can also place splitter elements between the columns to allow column resizing.
 * You should always place an id attribute on a treecol element to ensure that the column positioning is handled properly.
 */
declare interface XULTreeColElement extends XULElement, XUL.ICrop, XUL.ILabel {
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
declare interface XULTreeColsElement extends XULElement, XUL.ILabel {
  pickertooltiptext: string;
}

declare interface XULTreeElement extends XULElement {
  disableKeyNavigation: boolean;
  enableColumnDrag: boolean;
  hidecolumnpicker: boolean;
  rows: number;
  selstyle: string;
  seltype: "single" | "multiple";
  currentIndex: number;
  firstOrdinalColumn: XULTreeColElement;
}

declare interface XULScrollBarElement extends XULElement {}

declare interface XULGrippyElement extends XULElement {}

declare interface XULSplitterElement extends XULElement {}

declare interface XULColorPickerElement extends XULElement, XUL.IDisabled {
  color: string;
}

declare interface XULCommandElement extends XULElement, XUL.ILabel {}

// @ts-ignore - Allow extending native Window
declare interface XULWindowElement extends XULElement, Window {
  arguments: any;
  title: string;
  onclose(): any;
}

declare interface GlobalEventHandlers {
  oncommand: ((this: GlobalEventHandlers, ev: Event) => any) | null;
}
