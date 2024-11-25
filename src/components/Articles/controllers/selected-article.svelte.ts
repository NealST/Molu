
let selectedArticle = $state('');

const setSelectedArticle = function(articleName: string) {
  selectedArticle = articleName;
};

export { selectedArticle, setSelectedArticle }
