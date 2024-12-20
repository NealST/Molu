export { default as debounce } from './debounce';
export { md2htmlRules, type RuleKeys, transfromChild2Html } from './format';
export { default as getChildIndexInParagraph } from './get-child-index';

// get keyboard event press key
export const getKeyboardKey = function(event: KeyboardEvent) {
  // @ts-ignore
  const { key, code, keyIdentifier } = event;
  return keyIdentifier || code || key;
}
