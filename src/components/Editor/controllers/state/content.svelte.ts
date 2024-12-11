import { DEFAULT_STATE } from "@/mock/data";
import type { IBlockStateItem } from "../../blocks/types";

const createContentState = function () {
  let data: IBlockStateItem[] = $state.raw(DEFAULT_STATE);

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