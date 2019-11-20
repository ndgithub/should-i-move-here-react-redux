import * as CONST from '../constants';

const initialState = {
  restaurants: [],
  isLoading: true,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONST.GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        isLoading: false,
        isError: false
      };
    case CONST.RESTAURANTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: false
      };
    default:
      return state;
  }
};
