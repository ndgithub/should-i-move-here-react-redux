import axios from 'axios';
import { GET_BREWERIES, BREWERIES_ERROR } from '../constants';

export const getBreweries = ({ formatted_address }) => async dispatch => {
  try {
    const city = formatted_address.split(',')[0];
    const res = await axios.get(`https://api.openbrewerydb.org/breweries?
by_city=${city}`);
    dispatch({
      type: GET_BREWERIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: BREWERIES_ERROR
    });
  }
};
