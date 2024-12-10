// process input
import { getTextContent } from '../utils/index';
import { CLASS_NAMES } from '../config/index';

const inputHandler = function(event: Event) {
  if (event.type === 'compositionstart') {
    return;
  }
  if (/historyUndo|historyRedo/.test((event as InputEvent).inputType)) {
    return;
  }
  const domNode = event.target as Node;
  if (!domNode) {
    return
  }
  const textContent = getTextContent(domNode, [CLASS_NAMES.MO_MATH_RENDER,
    CLASS_NAMES.MO_RUBY_RENDER])
};

export default inputHandler;
