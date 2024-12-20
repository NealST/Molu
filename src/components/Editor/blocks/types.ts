export interface IBlockStateItem {
  name: string;
  meta?: any;
  text?: string;
  href?: string;
  id?: string;
  children?: IBlockStateItem[];
};

export interface IBlockProps {
  index: number;
  data: IBlockStateItem;
}
