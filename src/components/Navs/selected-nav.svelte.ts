import { NOTES } from '@/constants';

const createSelectedNav = function() {
  let nav = $state(NOTES);
  return {
    get nav() {
      return nav;
    },
    setNav(name: string) {
      nav = name;
    }
  }
};

export default createSelectedNav();
