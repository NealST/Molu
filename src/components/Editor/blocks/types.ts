export interface IBlockStateItem {
  name: string;
  text?: string;
  meta?: any;
  children?: IBlockStateItem[];
};

export interface IBlockProps {
  index: number;
  data: IBlockStateItem;
}
