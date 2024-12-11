import htmlTags, { voidHtmlTags } from "html-tags";

interface ITag {
    open: string;
    close: string;
}

/**
 * [genUpper2LowerKeyHash generate constants map hash, the value is lowercase of the key,
 * also translate `_` to `-`]
 */
function genUpper2LowerKeyHash(keys: string[]): Record<string, string> {
    return keys.reduce((acc, key) => {
        const value = key.toLowerCase().replace(/_/g, '-');

        return Object.assign(acc, { [key]: value });
    }, {});
}

/**
 * generate constants map, the value is the key.
 */
function generateKeyHash(keys: string[]): Record<string, string> {
    return keys.reduce((acc, key) => {
        return Object.assign(acc, { [key]: key });
    }, {});
}

export const FORMAT_MARKER_MAP: Record<string, string> = {
    em: '*',
    inline_code: '`',
    strong: '**',
    del: '~~',
    inline_math: '$',
};

export const FORMAT_TAG_MAP: Record<string, ITag> = {
    u: {
        open: '<u>',
        close: '</u>',
    },
    sub: {
        open: '<sub>',
        close: '</sub>',
    },
    sup: {
        open: '<sup>',
        close: '</sup>',
    },
    mark: {
        open: '<mark>',
        close: '</mark>',
    },
};

export const FORMAT_TYPES = [
    'strong',
    'em',
    'del',
    'inline_code',
    'link',
    'image',
    'inline_math',
];

export const EVENT_KEYS = generateKeyHash([
    'Enter',
    'Backspace',
    'Space',
    'Delete',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'Escape',
]);

export const CLASS_NAMES = genUpper2LowerKeyHash([
    'MO_EDITOR',
    'MO_ACTIVE',
    'MO_AUTO_LINK',
    'MO_AUTO_LINK_EXTENSION',
    'MO_BACKLASH',
    'MO_BUG',
    'MO_BULLET_LIST',
    'MO_BULLET_LIST_ITEM',
    'MO_CHECKBOX_CHECKED',
    'MO_CONTAINER_BLOCK',
    'MO_CONTAINER_PREVIEW',
    'MO_CONTAINER_ICON',
    'MO_COPY_REMOVE',
    'MO_DISABLE_HTML_RENDER',
    'MO_EMOJI_MARKED_TEXT',
    'MO_EMOJI_MARKER',
    'MO_EMPTY',
    'MO_FENCE_CODE',
    'MO_FOCUS_MODE',
    'MO_FRONT_MATTER',
    'MO_FRONT_ICON',
    'MO_GRAY',
    'MO_HARD_LINE_BREAK',
    'MO_HARD_LINE_BREAK_SPACE',
    'MO_LINE_END',
    'MO_HEADER_TIGHT_SPACE',
    'MO_HIDE',
    'MO_HIGHLIGHT',
    'MO_HTML_BLOCK',
    'MO_HTML_ESCAPE',
    'MO_HTML_PREVIEW',
    'MO_HTML_TAG',
    'MO_IMAGE_FAIL',
    'MO_IMAGE_BUTTONS',
    'MO_IMAGE_LOADING',
    'MO_EMPTY_IMAGE',
    'MO_IMAGE_MARKED_TEXT',
    'MO_IMAGE_SRC',
    'MO_IMAGE_CONTAINER',
    'MO_INLINE_IMAGE',
    'MO_IMAGE_SUCCESS',
    'MO_IMAGE_UPLOADING',
    'MO_INLINE_IMAGE_SELECTED',
    'MO_INLINE_IMAGE_IS_EDIT',
    'MO_INDENT_CODE',
    'MO_INLINE_FOOTNOTE_IDENTIFIER',
    'MO_INLINE_RULE',
    'MO_LANGUAGE',
    'MO_LANGUAGE_INPUT',
    'MO_LINK',
    'MO_LINK_IN_BRACKET',
    'MO_LIST_ITEM',
    'MO_LOOSE_LIST_ITEM',
    'MO_MATH',
    'MO_MATH_TEXT',
    'MO_MATH_RENDER',
    'MO_RUBY',
    'MO_RUBY_TEXT',
    'MO_RUBY_RENDER',
    'MO_SELECTED',
    'MO_SOFT_LINE_BREAK',
    'MO_MATH_ERROR',
    'MO_MATH_MARKER',
    'MO_MATH_RENDER',
    'MO_MATH_TEXT',
    'MO_MERMAID',
    'MO_MOLTIPLE_MATH',
    'MO_NO_TEXT_LINK',
    'MO_ORDER_LIST',
    'MO_ORDER_LIST_ITEM',
    'MO_OUTPUT_REMOVE',
    'MO_PARAGRAPH',
    'MO_RAW_HTML',
    'MO_REFERENCE_LABEL',
    'MO_REFERENCE_LINK',
    'MO_REFERENCE_MARKER',
    'MO_REFERENCE_TITLE',
    'MO_REMOVE',
    'MO_RUBY',
    'MO_RUBY_RENDER',
    'MO_RUBY_TEXT',
    'MO_SELECTION',
    'MO_SHOW_PREVIEW',
    'MO_SOFT_LINE_BREAK',
    'MO_TASK_LIST',
    'MO_TASK_LIST_ITEM',
    'MO_TASK_LIST_ITEM_CHECKBOX',
    'MO_TIGHT_LIST_ITEM',
    'MO_TOOL_BAR',
    'MO_VEGA_LITE',
    'MO_WARN',
    'MO_SHOW_QUICK_INSERT_HINT',
]);

export const PARAGRAPH_TYPES = [
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'ul',
    'ol',
    'li',
    'figure',
];

export const BRACKET_HASH: Record<string, string> = {
    '{': '}',
    '[': ']',
    '(': ')',
    '*': '*',
    '_': '_',
    '"': '"',
    '\'': '\'',
    '$': '$',
    '~': '~',
};

export const BACK_HASH: Record<string, string> = {
    '}': '{',
    ']': '[',
    ')': '(',
    '*': '*',
    '_': '_',
    '"': '"',
    '\'': '\'',
    '$': '$',
    '~': '~',
};

export const punctuation = [
    '!',
    '"',
    '#',
    '$',
    '%',
    '&',
    '\'',
    '(',
    ')',
    '*',
    '+',
    ',',
    '-',
    '.',
    '/',
    ':',
    ';',
    '<',
    '=',
    '>',
    '?',
    '@',
    '[',
    '\\',
    ']',
    '^',
    '_',
    '`',
    '{',
    '|',
    '}',
    '~',
];

export const LINE_BREAK = '\n';

// export const isInElectron = (window.process as any)?.type === "renderer";
export const IMAGE_EXT_REG = /\.(jpeg|jpg|png|gif|svg|webp)(?=\?|$)/i;
export const isFirefox = (navigator.userAgent.includes('Firefox'));
export const isOsx
  = window && window.navigator && /Mac/.test(window.navigator.userAgent);
export const isWin
  = window
  && window.navigator.userAgent
  && /win32|wow32|win64|wow64/i.test(window.navigator.userAgent);
// http[s] (domain or IPv4 or localhost or IPv6) [port] /not-white-space
export const URL_REG
  = /^http(s)?:\/\/([\w\-.~]+\.[a-z]{2,}|[0-9.]+|localhost|\[[a-f0-9.:]+\])(:\d{1,5})?\/\S+/i;

export const BLOCK_TYPES = [
  'atx-heading',
  'paragraph',
  'diagram',
  'code-block',
  'math-block',
  'table',
  'order-list',
  'bullet-list',
  'task-list',
  'block-quote',
]