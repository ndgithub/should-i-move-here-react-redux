import * as CONST from '../constants';

const initialState = {
  breweries: [],
  isLoading: true,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONST.GET_BREWERIES:
      return {
        ...state,
        breweries: action.payload,
        isLoading: false,
        isError: false
      };

    case CONST.BREWERIES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};
