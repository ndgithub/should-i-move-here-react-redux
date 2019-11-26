import {
  GET_RESTAURANTS,
  RESTAURANTS_ERROR,
  RESET_RESTAURANTS
} from '../constants';

const initialState = {
  restaurants: [],
  isLoading: true,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_RESTAURANTS:
      return {
        ...state,
        restaurants: [],
        isLoading: true,
        isError: false
      };
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
        isLoading: false,
        isError: false
      };
    case RESTAURANTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: false
      };
    default:
      return state;
  }
};
