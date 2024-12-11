// get keyboard event press key
export const getKeyboardKey = function(event: KeyboardEvent) {
  // @ts-ignore
  const { key, code, keyIdentifier } = event;
  return keyIdentifier || code || key;
}
