import { CLASS_NAMES } from "../config";

// narrowing Note type to Element.
export const isElement = function (node: Node): node is Element {
  return node.nodeType === Node.ELEMENT_NODE;
};

export const getTextContent = function (node: Node, blackList: string[]) {
  const isTextNode = node.nodeType === Node.TEXT_NODE;
  if (isTextNode || blackList.length === 0) {
    return node.textContent;
  }
  let text = "";
  // @ts-ignore
  const nodeClassList = node.classList;
  if (
    isElement(node) &&
    blackList.some(
      (className) => nodeClassList && nodeClassList.contains(className)
    )
  ) {
    return text;
  }
  if (isTextNode) {
    text += node.textContent;
  } else if (
    isElement(node) &&
    nodeClassList.contains(`${CLASS_NAMES.MO_INLINE_IMAGE}`)
  ) {
    // handle inline image
    const raw = node.getAttribute("data-raw");
    const imageContainer = node.querySelector(
      `.${CLASS_NAMES.MU_IMAGE_CONTAINER}`
    );
    const hasImg = imageContainer!.querySelector("img");
    const childNodes = imageContainer!.childNodes;
    if (childNodes.length && hasImg) {
      for (const child of childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE && child.nodeName === "IMG")
          text += raw;
        else if (child.nodeType === Node.TEXT_NODE) text += child.textContent;
      }
    } else {
      text += raw;
    }
  } else {
    const childNodes = node.childNodes;

    for (const n of childNodes) text += getTextContent(n, blackList);
  }

  return text;
};
