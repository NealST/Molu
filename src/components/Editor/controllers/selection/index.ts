import { isElement } from "../utils";
import type { ICursor, INodeOffset, ISelection } from './types';

const getCursorCoords = function () {
  const sel = document.getSelection();
  let range;
  let rect = null;
  if (sel?.rangeCount) {
    range = sel.getRangeAt(0).cloneRange();
    if (range.getClientRects) {
      // range.collapse(true)
      let rects: DOMRectList | null = range.getClientRects();
      if (rects.length === 0) {
        rects =
          range.startContainer && isElement(range.startContainer)
            ? range.startContainer.getClientRects()
            : null;
      }

      if (rects?.length) rect = rects[0];
    }
  }

  return rect;
};

/**
 * topOffset is the line counts above cursor, and bottomOffset is line counts bellow cursor.
 * @param {*} paragraph
 */
export const getCursorYOffset = function (paragraph: HTMLElement) {
  const { y } = getCursorCoords()!;
  const { height, top } = paragraph.getBoundingClientRect();
  const lineHeight = Number.parseFloat(getComputedStyle(paragraph).lineHeight);
  const topOffset = Math.floor((y - top) / lineHeight);
  const bottomOffset = Math.round((top + height - lineHeight - y) / lineHeight);

  return {
    topOffset,
    bottomOffset,
  };
};

export const getSelectionStart = function() {
    const node = document.getSelection()!.anchorNode;
    const startNode
  = node && node.nodeType === Node.TEXT_NODE ? node.parentNode : node;

    return startNode;
}

export const getSelection = function() {
  const selection = document.getSelection();

  if (!selection) {
    return null;
  }
}
