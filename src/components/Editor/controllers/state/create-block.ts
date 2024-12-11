// create a block
import type { IBlockStateItem } from "../../blocks/types";
import contentState from './content.svelte';
import { BLOCK_TYPES } from '../config/index';

// todo: support nested block creation
const createBlock = function(newBlock: IBlockStateItem, index: number) {
  const newParentContent = ([] as IBlockStateItem[]).concat(contentState.data);
  newParentContent.splice(index, 0, newBlock);
  contentState.setData(newParentContent);
};

export const createParagraph = function(index: number, text = '') {
  const newParagraph = {
    name: 'paragraph',
    text,
  };
  createBlock(newParagraph, index);
};

export const createHeading = function(index: number, level = 1, text = '') {
  const newHeading = {
    name: "atx-heading",
    meta: {
      level,
    },
    text
  };
  createBlock(newHeading, index);
};
