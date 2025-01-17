import * as CONST from '../constants';

const initialState = {
  current: '',
  history: JSON.parse(localStorage.getItem(CONST.LOC_STORE_REC_SEARCHES)),
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONST.PLACE_ADDED:
      return {
        current: action.currentPlace,
        history: action.history,
        isLoading: false
      };
    default:
      return state;
  }
};
