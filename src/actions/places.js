import { LOC_STORE_REC_SEARCHES, PLACE_ADDED } from '../constants';

export const cityEntered = (dispatch, placeObj) => {
  console.log('suuuuuup');
  let history = JSON.parse(localStorage.getItem(LOC_STORE_REC_SEARCHES));
  if (history) {
    history.unshift(placeObj);
    if (history.length > 5) history.pop();
  } else {
    history = [placeObj];
  }

  localStorage.setItem(LOC_STORE_REC_SEARCHES, JSON.stringify(history));
  dispatch({
    type: PLACE_ADDED,
    currentPlace: history[0],
    history: history
  });
};
