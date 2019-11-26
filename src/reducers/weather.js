import { GET_WEATHER, WEATHER_ERROR, RESET_WEATHER } from '../constants';

const initialState = {
  weathData: '',
  isLoading: true,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_WEATHER:
      return {
        ...state,
        weathData: '',
        isLoading: true,
        isError: false
      };
    case GET_WEATHER:
      return {
        ...state,
        weathData: action.weathData,
        isLoading: false,
        isError: false
      };
    case WEATHER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};
