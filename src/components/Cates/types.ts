interface INav {
  label: string;
  path: string;
}

export interface ICateItem {
  // cate type,maybe input or cate
  type: string;
  // cate name
  name: string;
}

export interface IProps {
  // current selected nav
  navInfo: INav;
  // select a cate
  onCateSelect: (catePath: string) => void;
}
