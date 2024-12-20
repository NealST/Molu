// format markdown utils

import type { IBlockStateItem } from '../../blocks/types';

const getStrongHtml = function(text: string) {
  return `<strong class="molu-strong">${text}</strong>`;
}

const getEmHtml = function(text: string) {
  return `<em class="molu-em">${text}</em>`;
}

const getInlineCodeHtml = function(text: string) {
  return `<code class="molu-inline-code">${text}</code>`;
}

const getImageHtml = function(imgUrl: string) {
  return `<img class="molu-image" src="${imgUrl}"></img>`
}

const getLinkHtml = function(label: string, url: string) {
  return `<a class="molu-link" href="${url}">${label}</a>`;
}

const getPlainHtml = function(text: string) {
  return `<span class="molu-plain">${text}</span>`;
}

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
        name: 'strong',
        text: p2.trim() || p3.trim(),
      }
    }
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
        name: 'em',
        text: p2.trim() || p3.trim(),
      }
    }
  },
  inline_code: {
    beginReg: /`{1}([^`]+)/,
    reg: /(`{1,3})([^`]+|.{2,})\1/,
    matchCb(match: string, p1: string, p2: string) {
      return getInlineCodeHtml(p2);
    },
    toState(match: string, p1: string, p2: string) {
      return {
        name: 'code',
        text: p2
      }
    }
  },
  image: {
    beginReg: /(!\[)(.*?)(\\*)\]\(/,
    reg: /(!\[)(.*?)(\\*)\]\((.*)(\\*)\)/,
    matchCb(match: string, p1: string, p2: string, p3: string, p4: string) {
      return getImageHtml(p4);
    },
    toState(match: string, p1: string, p2: string, p3: string, p4: string) {
      return {
        name: 'image',
        url: p4,
      }
    }
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
        name: 'link',
        text: p2,
        url: p4
      }
    }
  },
};

export type RuleKeys = keyof typeof md2htmlRules;

export const transfromChild2Html = function(child: IBlockStateItem) {
  const { name, text = '', url = '' } = child;
  let retHtml = ''
  switch (name) {
    case 'strong':
      retHtml = getStrongHtml(text);
      break;
    case 'em':
      retHtml = getEmHtml(text);
      break;
    case 'plain':
      retHtml = getPlainHtml(text);
      break;
    case 'html':
      retHtml = text;
      break;
    case 'link':
      retHtml = getLinkHtml(text, url);
      break;
    case 'code':
      retHtml = getInlineCodeHtml(text);
      break;
  }
  return retHtml;
}
