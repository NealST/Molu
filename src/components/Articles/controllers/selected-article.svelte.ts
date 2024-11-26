
const createSelectedArticle = function() {
  let article = $state('');

  return {
    get article() {
      return article;
    },
    setArticle(name: string) {
      article = name;
    }
  }
}

export default createSelectedArticle()
