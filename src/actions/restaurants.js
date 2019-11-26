import {
  RESET_RESTAURANTS,
  GET_RESTAURANTS,
  RESTAURANTS_ERROR
} from '../constants';
import axios from 'axios';

export const getRestInfo = async (dispatch, place) => {
  dispatch({
    type: RESET_RESTAURANTS
  });
  try {
    const zomLocInfo = await getZomLocInfo(place);
    const zomRestInfo = await getZomRestInfo(zomLocInfo);
    dispatch({
      type: GET_RESTAURANTS,
      restaurants: zomRestInfo
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: RESTAURANTS_ERROR
    });
  }
};

// Get location info for Zomato
const getZomLocInfo = async ({ formatted_address, lat, lng }) => {
  const config = {
    headers: { 'user-key': process.env.REACT_APP_ZOMATO_API_KEY }
  };
  const address = formatted_address.replace(' ', '%2C').replace(',', '%20');
  const reqUrl = `https://developers.zomato.com/api/v2.1/locations?query=${address}&lat=${lat}&lon=${lng}`;
  try {
    const locRes = await axios.get(reqUrl, config);
    const zomEntityId = locRes.data.location_suggestions[0].entity_id;
    const zomEntityIdType = locRes.data.location_suggestions[0].entity_type;
    return { zomEntityId, zomEntityIdType };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Use Zomato location info to get restaurant info
const getZomRestInfo = async ({ zomEntityId, zomEntityIdType }) => {
  try {
    const config = {
      headers: { 'user-key': process.env.REACT_APP_ZOMATO_API_KEY }
    };

    const reqUrl = `https://developers.zomato.com/api/v2.1/location_details?entity_id=${zomEntityId}&entity_type=${zomEntityIdType}`;
    const res = await axios.get(reqUrl, config);
    let rests = [];
    for (let i = 0; i < 6; i++) {
      let rest = res.data.best_rated_restaurant[i].restaurant;
      let name = rest.name;
      let rating = rest.user_rating.aggregate_rating;
      let priceRange = rest.price_range;
      let cuisines = rest.cuisines;
      let imgSrc = rest.thumb;
      rests.push({ name, rating, priceRange, cuisines, imgSrc });
    }
    return rests;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
