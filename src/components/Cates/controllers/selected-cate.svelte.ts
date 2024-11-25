let selectedCate = $state("");

const setSelectedCate = function(newCate: string) {
  selectedCate = newCate;
}

export { selectedCate, setSelectedCate }
