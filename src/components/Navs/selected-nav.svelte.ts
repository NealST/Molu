import { NOTES } from '@/constants';

let selectedNav = $state(NOTES);

const setSelectedNav = function(navName: string) {
  selectedNav = navName;
}

export {selectedNav, setSelectedNav};
