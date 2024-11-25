let selectedCate = $state("");

export const getSelectedCate = function() {
  return selectedCate;
}

export const setSelectedCate = function(newCate: string) {
  selectedCate = newCate;
}
