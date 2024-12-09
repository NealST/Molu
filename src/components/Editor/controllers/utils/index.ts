// narrowing Note type to Element.
export function isElement(node: Node): node is Element {
    return node.nodeType === Node.ELEMENT_NODE;
}
