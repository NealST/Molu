
let selectedArticle = $state('');

export const getSelectedArticle = function() {
  return selectedArticle;
}

export const setSelectedArticle = function(articleName: string) {
  selectedArticle = articleName;
};
