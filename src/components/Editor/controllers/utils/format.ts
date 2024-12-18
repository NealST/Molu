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

const getLinkHtml = function(label: string, href: string) {
  return `<a class="molu-link" href="${href}">${label}</a>`;
}

export const md2htmlRules = {
  strong: {
    // can nest
    beginReg: /(\*\*|__)/,
    reg: /(\*\*|__)(?=\S)([\s\S]*?[^\s\\])(\\*)\1(?!(\*|_))/g,
    matchCb(match: string, p1: string, p2: string, p3: string) {
      return getStrongHtml(p2.trim() || p3.trim());
    },
  },
  em: {
    // can nest
    beginReg: /(\*|_)/,
    reg: /(\*|_)(?=\S)([\s\S]*?[^\s*\\])(\\*)\1(?!\1)/g,
    matchCb(match: string, p1: string, p2: string, p3: string) {
      return getEmHtml(p2.trim() || p3.trim());
    },
  },
  inline_code: {
    beginReg: /`{1}([^`]+)/,
    reg: /(`{1,3})([^`]+|.{2,})\1/g,
    matchCb(match: string, p1: string, p2: string) {
      return getInlineCodeHtml(p2);
    },
  },
  image: {
    beginReg: /(!\[)(.*?)(\\*)\]\(/,
    reg: /(!\[)(.*?)(\\*)\]\((.*)(\\*)\)/g,
    matchCb(match: string, p1: string, p2: string, p3: string, p4: string) {
      return getImageHtml(p4);
    },
  },
  link: {
    // can nest
    beginReg: /(\[)((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*?)(\\*)\]\(/,
    reg: /(\[)((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*?)(\\*)\]\((.*)(\\*)\)/g,
    matchCb(match: string, p1: string, p2: string, p3: string, p4: string) {
      return getLinkHtml(p2, p4);
    },
  },
};

export type RuleKeys = keyof typeof md2htmlRules;

export const html2mdRules = {
  strong: {
    reg: /<strong(\s+)class="molu-strong">([^<]+)<\/strong>/g,
    matchCb(match: string, p1: string, p2: string) {
      return `**${p2}**`;
    },
  },
  em: {
    reg: /<em(\s+)class="molu-em">([^<]+)<\/em>/g,
    matchCb(match: string, p1: string, p2: string) {
      return `*${p2}*`;
    },
  },
  inline_code: {
    reg: /<code(\s+)class="molu-inline-code">([^<]+)<\/code>/g,
    matchCb(match: string, p1: string, p2: string) {
      return "`" + p2 + "`";
    },
  },
  image: {
    reg: /<img(\s+)class="molu-image"(\s+)src="([^"]+)"><\/img>/g,
    matchCb(match: string, p1: string, p2: string, p3: string) {
      return `![](${p3})`;
    },
  },
  link: {
    reg: /<a(\s+)class="molu-link"(\s+)href="([^"]+)">([^<]+)<\/a>/g,
    matchCb(match: string, p1: string, p2: string, p3: string, p4: string) {
      return `[${p4}](${p3})`;
    },
  },
};

export const transfromChild2Html = function(child: IBlockStateItem) {
  const { name, text = '', href = '' } = child;
  let retHtml = ''
  switch (name) {
    case 'strong':
      retHtml = getStrongHtml(text);
      break;
    case 'em':
      retHtml = getEmHtml(text);
      break;
    case 'plain':
    case 'html':
      retHtml = text;
      break;
    case 'link':
      retHtml = getLinkHtml(text, href);
      break;
    case 'code':
      retHtml = getInlineCodeHtml(text);
      break;
  }
  return retHtml;
}
