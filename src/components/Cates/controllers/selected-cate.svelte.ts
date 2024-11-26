const createSelectedCate = function() {
  let cate = $state('');

  return {
    get cate() {
      return cate;
    },
    setCate: (newCate: string) => {
      cate = newCate;
    }
  }
}

export default createSelectedCate();
