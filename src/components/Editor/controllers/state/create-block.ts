// create a block
import type { IBlockStateItem } from "../../blocks/types";
import contentState from './content.svelte';
import { uid } from 'uid';

// todo: support nested block creation
const createBlock = function(newBlock: IBlockStateItem, index: number) {
  const newParentContent = ([] as IBlockStateItem[]).concat(contentState.data);
  console.log('newParentContent', newParentContent);
  newParentContent.splice(index, 0, newBlock);
  contentState.setData(newParentContent);
};

export const createParagraph = function(index: number) {
  const newParagraph = {
    name: 'paragraph',
    id: uid(),
    children: []
  };
  createBlock(newParagraph, index);
};

export const createHeading = function(index: number, level = 1, text = '') {
  const newHeading = {
    name: "heading",
    id: uid(),
    meta: {
      level,
    },
    text
  };
  createBlock(newHeading, index);
};
