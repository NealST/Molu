// format markdown utils

import type { IBlockStateItem } from "../../blocks/types";

const getStrongHtml = function (text: string) {
  return `<strong class="molu-content-item molu-strong">${text}</strong>`;
};

const getEmHtml = function (text: string) {
  return `<em class="molu-content-item molu-em">${text}</em>`;
};

const getInlineCodeHtml = function (text: string) {
  return `<code class="molu-content-item molu-inline-code">${text}</code>`;
};

const getImageHtml = function (imgUrl: string) {
  return `<img class="molu-content-item molu-image" src="${imgUrl}"></img>`;
};

const getLinkHtml = function (label: string, url: string) {
  return `<a class="molu-content-item molu-link" href="${url}">${label}</a>`;
};

const getPlainHtml = function (text: string) {
  return `<span class="molu-content-item molu-plain">${text}</span>`;
};

const getUnderlineHtml = function (text: string) {
  return `<u class="molu-content-item molu-underline">${text}</u>`;
};

const getMarkHtml = function (text: string) {
  return `<mark class="molu-content-item molu-mark">${text}</mark>`;
};

export const md2htmlRules = {
  strong: {
    // can nest
    beginReg: /(\*\*|__)/,
    reg: /(\*\*|__)(?=\S)([\s\S]*?[^\s\\])(\\*)\1(?!(\*|_))/,
    matchCb(match: string, p1: string, p2: string, p3: string) {
      return getStrongHtml(p2.trim() || p3.trim());
    },
    toState(match: string, p1: string, p2: string, p3: string) {
      return {
        name: "strong",
        text: p2.trim() || p3.trim(),
      };
    },
  },
  em: {
    // can nest
    beginReg: /(\*|_)/,
    reg: /(\*|_)(?=\S)([\s\S]*?[^\s*\\])(\\*)\1(?!\1)/,
    matchCb(match: string, p1: string, p2: string, p3: string) {
      return getEmHtml(p2.trim() || p3.trim());
    },
    toState(match: string, p1: string, p2: string, p3: string) {
      return {
        name: "em",
        text: p2.trim() || p3.trim(),
      };
    },
  },
  inline_code: {
    beginReg: /`{1}([^`]+)/,
    reg: /(`{1,3})([^`]+|.{2,})\1/,
    matchCb(match: string, p1: string, p2: string) {
      return getInlineCodeHtml(p2);
    },
    toState(match: string, p1: string, p2: string) {
      return {
        name: "code",
        text: p2,
      };
    },
  },
  image: {
    beginReg: /(!\[)(.*?)(\\*)\]\(/,
    reg: /(!\[)(.*?)(\\*)\]\((.*)(\\*)\)/,
    matchCb(match: string, p1: string, p2: string, p3: string, p4: string) {
      return getImageHtml(p4);
    },
    toState(match: string, p1: string, p2: string, p3: string, p4: string) {
      return {
        name: "image",
        url: p4,
      };
    },
  },
  link: {
    // can nest
    beginReg: /(\[)((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*?)(\\*)\]\(/,
    reg: /(\[)((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*?)(\\*)\]\((.*)(\\*)\)/,
    matchCb(match: string, p1: string, p2: string, p3: string, p4: string) {
      return getLinkHtml(p2, p4);
    },
    toState(match: string, p1: string, p2: string, p3: string, p4: string) {
      return {
        name: "link",
        text: p2,
        url: p4,
      };
    },
  },
};

export type RuleKeys = keyof typeof md2htmlRules;

export const transfromChild2Html = function (child: IBlockStateItem) {
  const { name, text = "", url = "" } = child;
  let retHtml = "";
  switch (name) {
    case "strong":
      retHtml = getStrongHtml(text);
      break;
    case "em":
      retHtml = getEmHtml(text);
      break;
    case "plain":
      retHtml = getPlainHtml(text);
      break;
    case "underline":
      retHtml = getUnderlineHtml(text);
      break;
    case "mark":
      retHtml = getMarkHtml(text);
      break;
    case "link":
      retHtml = getLinkHtml(text, url);
      break;
    case "code":
      retHtml = getInlineCodeHtml(text);
      break;
  }
  return retHtml;
};

export type CursorInfo = {
  childIndex: number;
  childOffset: number;
};

export const getNewChildren = function (
  oldChildren: IBlockStateItem[],
  cursorInfo: CursorInfo,
  newState: IBlockStateItem
) {
  const { childIndex, childOffset } = cursorInfo;
  const newChildren = ([] as IBlockStateItem[]).concat(oldChildren);
  // at the start position
  if (childOffset === 0) {
    newChildren.splice(childIndex, 0, newState);
    return newChildren;
  }
  const childState = oldChildren[childIndex];
  const { text } = childState;
  // at the end position
  if (childOffset === text?.length) {
    newChildren.splice(childIndex + 1, 0, newState);
    return newChildren;
  }
  // at the middle position
  const preAnchorStr = text?.slice(0, childOffset);
  const afterAnchorStr = text?.slice(childOffset);
  const preAnchorState = {
    ...childState,
    text: preAnchorStr,
  };
  const afterAnchorState = {
    ...childState,
    text: afterAnchorStr,
  };
  // in case the nested children, flatten the children is better
  newChildren.splice(childIndex, 1, preAnchorState, newState, afterAnchorState);
  return newChildren;
};
