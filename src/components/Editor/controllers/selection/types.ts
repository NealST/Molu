export interface INodeOffset {
  offset: number;
}

// TODO: @JOCS, optimization of Cursor type, split it into for getCursor return type and setSelection params type?
export interface ICursor {
  start?: INodeOffset | null;
  end?: INodeOffset | null;
  block?: HTMLSpanElement;
  path?: (string | number)[];
  // The same as TSelection
  anchor?: INodeOffset | null;
  focus?: INodeOffset | null;
  anchorBlock?: HTMLSpanElement;
  anchorPath?: (string | number)[];
  focusBlock?: HTMLSpanElement;
  focusPath?: (string | number)[];
  isCollapsed?: boolean;
  isSelectionInSameBlock?: boolean;
  direction?: string;
  type?: string;
}

// Only used for selection.getSelection return type.
export interface ISelection {
  anchor: INodeOffset;
  focus: INodeOffset;
  anchorBlock: HTMLSpanElement;
  anchorPath: (string | number)[];
  focusBlock: HTMLSpanElement;
  focusPath: (string | number)[];
  isCollapsed: boolean;
  isSelectionInSameBlock: boolean;
  direction: string;
  type: string;
}
