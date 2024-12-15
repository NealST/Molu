// narrowing Note type to Element.
export function isElement(node: Node): node is Element {
  return node.nodeType === Node.ELEMENT_NODE;
}

const getTextContent = function (node: Node, blackList: string[] = []) {
  if (node.nodeType === Node.TEXT_NODE || blackList.length === 0) {
    return node.textContent!;
  }

  let text = "";
  if (
    isElement(node) &&
    blackList.some(
      (className) => node.classList && node.classList.contains(className)
    )
  ) {
    return text;
  }
  
  const childNodes = node.childNodes;
  if (childNodes.length === 0) {
    return text;
  }

  for (const n of childNodes) {
    text += getTextContent(n, blackList);
  }
  return text;
};

const getNodeOffsetInParagraph = function (
  node: Node,
  paragraph: HTMLElement
): number {
  let offset = 0;
  let preSibling: Node | null = node;

  if (node === paragraph) return offset;

  do {
    preSibling = preSibling.previousSibling;
    if (preSibling) {
      offset += getTextContent(preSibling, ["molu-math", "molu-"]).length;
    }
  } while (preSibling);

  return node === paragraph || node.parentNode === paragraph
    ? offset
    : offset + getNodeOffsetInParagraph(node.parentNode!, paragraph);
};

export default getNodeOffsetInParagraph;