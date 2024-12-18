import { defaultState } from "@/mock/data";
import type { IBlockStateItem } from "../../blocks/types";

const createContentState = function () {
  let data: IBlockStateItem[] = $state(defaultState);

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