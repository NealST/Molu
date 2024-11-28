// editor config store

type Config = {
  fontSize: number;
  lineHeight: number;
  focusMode: boolean;
  markdown: string;
  // Whether to trim the beginning and ending empty line in code block when open markdown.
  trimUnnecessaryCodeBlockEmptyLines: boolean;
  preferLooseListItem: boolean;
  autoPairBracket: boolean;
  autoPairMarkdownSyntax: boolean;
  autoPairQuote: boolean;
  bulletListMarker: string;
  orderListDelimiter: string;
  tabSize: number;
  codeBlockLineNumbers: boolean;
  // bullet/list marker width + listIndentation, tab or Daring Fireball Markdown (4 spaces) --> list indentation
  listIndentation: number;
  frontmatterType: string;
  sequenceTheme: string; // hand or simple
  mermaidTheme: string; // dark / forest / default
  vegaTheme: string; // excel / ggplot2 / quartz / vox / fivethirtyeight / dark / latimes
  hideQuickInsertHint: boolean;
  hideLinkPopup: boolean;
  autoCheck: boolean;
  // Whether we should set spellcheck attribute on our container to highlight misspelled words.
  // NOTE: The browser is not able to correct misspelled words words without a custom
  spellcheckEnabled: boolean;
  // transform the image to local folder, cloud or just return the local path
  imageAction: any;

  // Markdown extensions
  superSubScript: boolean;
  footnote: boolean;
  isGitlabCompatibilityEnabled: boolean;

  // Whether HTML rendering is disabled or not.
  disableHtml: boolean;
};

const DEFAULT_OPTION: Config = {
  fontSize: 16,
  lineHeight: 1.6,
  focusMode: false,
  markdown: "",
  trimUnnecessaryCodeBlockEmptyLines: false,
  preferLooseListItem: true,
  autoPairBracket: true,
  autoPairMarkdownSyntax: true,
  autoPairQuote: true,
  bulletListMarker: "-",
  orderListDelimiter: ".",
  tabSize: 4,
  codeBlockLineNumbers: false,
  listIndentation: 1,
  frontmatterType: "-",
  sequenceTheme: "hand",
  mermaidTheme: "default",
  vegaTheme: "latimes",
  hideQuickInsertHint: false,
  hideLinkPopup: false,
  autoCheck: false,
  spellcheckEnabled: false,
  imageAction: null,
  superSubScript: false,
  footnote: false,
  isGitlabCompatibilityEnabled: false,
  disableHtml: true,
};

const createConfig = function () {
  let config: Config = $state.raw(DEFAULT_OPTION);

  return {
    get config() {
      return config;
    },
    setConfig(newConfig: Config) {
      config = newConfig;
    },
  };
};

export default createConfig();
