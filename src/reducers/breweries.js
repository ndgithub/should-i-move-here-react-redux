import * as consts from '../constants';

const initialState = {
  breweries: [],
  isLoading: true,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case consts.GET_POSTS:
      return {
        ...state,
        breweries: action.payload,
        isLoading: false,
        isError: false
      };

    case consts.BREWERIES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};
