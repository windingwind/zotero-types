// Gecko DOM augmentations available in unprivileged plugin scopes.
// Subset of types/gecko/ — only the parts relevant to plugin development.

interface XULElementTagNameMap {
  box: XULBoxElement;
  button: XULButtonElement;
  checkbox: XULCheckboxElement;
  colorpicker: XULColorPickerElement;
  command: XULCommandElement;
  deck: XULDeckElement;
  description: XULDescriptionElement;
  grippy: XULGrippyElement;
  groupbox: XULGroupBoxElement;
  label: XULLabelElement;
  listitem: XULListItemElement;
  menu: XULMenuElement;
  menubar: XULMenuBarElement;
  menuitem: XULMenuItemElement;
  menulist: XULMenuListElement;
  menupopup: XULMenuPopupElement;
  menuseparator: XULMenuSeparatorElement;
  popup: XULPopupElement;
  progressmeter: XULProgressMeterElement;
  radio: XULRadioElement;
  radiogroup: XULRadioGroupElement;
  scrollbar: XULScrollBarElement;
  separator: XULSeparatorElement;
  spacer: XULSpacerElement;
  splitter: XULSplitterElement;
  statusbar: XULStatusBarElement;
  statusbarpanel: XULStatusBarPanelElement;
  tab: XULTabElement;
  tabbox: XULTabBoxElement;
  tabpanel: XULTabPanelElement;
  tabpanels: XULTabPanelsElement;
  tabs: XULTabsElement;
  textbox: XULTextBoxElement;
  toolbar: XULToolBarElement;
  toolbarbutton: XULToolBarButtonElement;
  toolbargrippy: XULToolBarGrippyElement;
  toolbaritem: XULToolBarItemElement;
  toolbarpalette: XULToolBarPaletteElement;
  toolbarseparator: XULToolBarSeparatorElement;
  toolbarset: XULToolBarSetElement;
  toolbarspacer: XULToolBarSpacerElement;
  toolbarspring: XULToolBarSpringElement;
  toolbox: XULToolBoxElement;
  tooltip: XULTooltipElement;
  tree: XULTreeElement;
  treecell: XULTreeCellElement;
  treechildren: XULTreeChildrenElement;
  treecol: XULTreeColElement;
  treecols: XULTreeColsElement;
  treeitem: XULTreeItemElement;
  treerow: XULTreeRowElement;
  treeseparator: XULTreeSeparatorElement;
  window: XULWindowElement;
}

interface Document {
  createXULElement<K extends keyof XULElementTagNameMap>(
    tagName: K,
  ): XULElementTagNameMap[K];
  createXULElement(tagName: string): XULElement;
  readonly ownerGlobal: WindowProxy;
}

interface Element {
  readonly ownerGlobal: WindowProxy;
}
