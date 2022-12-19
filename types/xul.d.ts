declare namespace XUL {
  class Element extends HTMLElement {
    disabled?: boolean;
    value?: string;
    width?: number;
    height?: number;
    setAttribute(qualifiedName: string, value: string | any): void;
  }

  class Label extends Element {
    value?: string;
  }

  class Textbox extends XUL.Element {
    value?: string;
    readonly?: boolean;
  }

  class Checkbox extends XUL.Element {
    checked?: boolean;
    label?: string;
  }

  class Menuitem extends XUL.Element {
    value?: string;
    label?: string;
  }

  class ProgressMeter extends XUL.Element {}

  class Menupopup extends XUL.Element {
    hidePopup: () => void;
    moveTo: (x: number, y: number) => void;
    position: string;
    showPopup: (
      element: XUL.Element,
      x: number,
      y: number,
      popupType,
      anchor,
      align
    ) => void;
    sizeTo: (width: number, height: number) => void;
  }

  class Menulist extends XUL.Element {
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

  class Box extends XUL.Element {
    maxHeight?: number;
    minHeight?: number;
    maxWidth?: number;
    minWidth?: number;
  }

  class Button extends XUL.Element {
    checked?: boolean;
    type?: string;
    tooltiptext?: string;
  }

  class ListItem extends XUL.Element {
    selectedItem?: XUL.Element;
  }

  class XULWindow extends Window {
    document: XMLDocument;
    arguments: any;
    openDialog: (
      target: string,
      type: string,
      params: string,
      extraParams?: object
    ) => XULWindow;
  }

  class XULEvent extends Event {
    target: XUL.Element;
  }
}
