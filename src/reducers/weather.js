import * as consts from '../constants';

const initialState = {
  weathData: '',
  isLoading: true,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case consts.GET_WEATHER:
      return {
        ...state,
        weathData: action.payload,
        isLoading: false,
        isError: false
      };
    case consts.WEATHER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};
