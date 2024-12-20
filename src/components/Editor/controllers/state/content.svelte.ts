import { defaultState } from "@/mock/data";
import { uid } from 'uid';
import type { IBlockStateItem } from "../../blocks/types";

const createContentState = function () {
  let data: IBlockStateItem[] = $state.raw(defaultState.map(item => ({
    ...item,
    id: uid(),
  })));

  return {
    get data() {
      return data;
    },
    setData(newData: IBlockStateItem[]) {
      data = newData;
    },
  };
};

export default createContentState();