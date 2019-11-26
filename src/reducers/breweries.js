import { GET_BREWERIES, BREWERIES_ERROR, RESET_BREWERIES } from '../constants';

const initialState = {
  breweries: [],
  isLoading: true,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_BREWERIES:
      return {
        ...state,
        breweries: [],
        isLoading: true,
        isError: false
      };
    case GET_BREWERIES:
      return {
        ...state,
        breweries: action.payload,
        isLoading: false,
        isError: false
      };
    case BREWERIES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};
