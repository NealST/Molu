// create a block
import type { IBlockStateItem } from "../../blocks/types";
import contentState from './content.svelte';

// todo: support nested block creation
const createBlock = function(newBlock: IBlockStateItem, index: number) {
  const newParentContent = contentState.data;
  newParentContent.splice(index, 0, newBlock);
  contentState.setData(newParentContent);
};

export const createParagraph = function(index: number) {
  const newParagraph = {
    name: 'paragraph',
    children: []
  };
  createBlock(newParagraph, index);
};

export const createHeading = function(index: number, level = 1, text = '') {
  const newHeading = {
    name: "heading",
    meta: {
      level,
    },
    text
  };
  createBlock(newHeading, index);
};
