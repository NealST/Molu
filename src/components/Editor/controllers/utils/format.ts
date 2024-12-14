// format markdown utils

export const md2htmlRules = {
  strong: {
    // can nest
    beginReg: /(\*\*|__)/,
    reg: /(\*\*|__)(?=\S)([\s\S]*?[^\s\\])(\\*)\1(?!(\*|_))/g,
    matchCb(match: string, p1: string, p2: string, p3: string) {
      return `<strong class="molu-strong">${p2.trim() || p3.trim()}</strong>`;
    },
  },
  em: {
    // can nest
    beginReg: /(\*|_)/,
    reg: /(\*|_)(?=\S)([\s\S]*?[^\s*\\])(\\*)\1(?!\1)/g,
    matchCb(match: string, p1: string, p2: string, p3: string) {
      return `<em class="molu-em">${p2.trim() || p3.trim()}</em>`;
    },
  },
  inline_code: {
    beginReg: /`{1}([^`]+)/,
    reg: /(`{1,3})([^`]+|.{2,})\1/g,
    matchCb(match: string, p1: string, p2: string) {
      return `<code class="molu-inline-code">${p2}</code>`;
    },
  },
  image: {
    beginReg: /(!\[)(.*?)(\\*)\]\(/,
    reg: /(!\[)(.*?)(\\*)\]\((.*)(\\*)\)/g,
    matchCb(match: string, p1: string, p2: string, p3: string, p4: string) {
      return `<img class="molu-image" src="${p4}"></img>`;
    },
  },
  link: {
    // can nest
    beginReg: /(\[)((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*?)(\\*)\]\(/,
    reg: /(\[)((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*?)(\\*)\]\((.*)(\\*)\)/g,
    matchCb(match: string, p1: string, p2: string, p3: string, p4: string) {
      return `<a class="molu-link" href="${p4}">${p2}</a>`;
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
