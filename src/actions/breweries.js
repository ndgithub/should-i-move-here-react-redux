import axios from 'axios';
import { GET_BREWERIES, BREWERIES_ERROR, RESET_BREWERIES } from '../constants';

export const getBreweries = async (dispatch, { formatted_address }) => {
  dispatch({ type: RESET_BREWERIES });
  try {
    const city = formatted_address.split(',')[0];
    console.log('city', city);
    const res = await axios.get(
      `https://api.openbrewerydb.org/breweries?by_city=${city}`
    );
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
