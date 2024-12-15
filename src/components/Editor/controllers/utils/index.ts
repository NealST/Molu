export { default as debounce } from './debounce';
export { md2htmlRules, html2mdRules, type RuleKeys } from './format';
export { default as getNodeOffsetInParagraph } from './get-node-offset-in-paragraph';

// get keyboard event press key
export const getKeyboardKey = function(event: KeyboardEvent) {
  // @ts-ignore
  const { key, code, keyIdentifier } = event;
  return keyIdentifier || code || key;
}
