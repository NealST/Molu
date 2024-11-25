import { NOTES } from '@/constants';

let selectedNav = $state(NOTES);

export const getSelectedNav = function() {
  return selectedNav;
}

export const setSelectedNav = function(navName: string) {
  selectedNav = navName;
}
