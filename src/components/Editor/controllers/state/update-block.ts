// update a block
import type { IBlockStateItem } from "../../blocks/types";
import contentState from './content.svelte';

const updateBlock = function(newBlock: IBlockStateItem, index: number) {
  const newParentContent = ([] as IBlockStateItem[]).concat(contentState.data);
  newParentContent[index] = newBlock;
  contentState.setData(newParentContent);
};

export default updateBlock;