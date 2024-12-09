// process input

const inputHandler = function(event: Event) {
  if (event.type === 'compositionstart') {
    return;
  }
  if (/historyUndo|historyRedo/.test((event as InputEvent).inputType)) {
    return;
  }
  const domNode = event.target;
  
};

export default inputHandler;
