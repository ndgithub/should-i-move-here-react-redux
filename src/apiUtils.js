import axios from 'axios';

export const getRestInfo = async place => {
  try {
    const zomLocInfo = await getZomLocInfo(place);
    const zomRestInfo = await getZomRestInfo(zomLocInfo);
    return zomRestInfo;
  } catch (error) {
    console.log(error);
    throw error;
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
    for (let i = 0; i < 10; i++) {
      let rest = res.data.best_rated_restaurant[i].restaurant;
      let name = rest.name;
      let rating = rest.user_rating.aggregate_rating;
      let priceRange = rest.price_range;
      let cuisines = rest.cuisines;
      rests.push({ name, rating, priceRange, cuisines });
    }
    return { rests };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBreweries = async ({ formatted_address }) => {
  try {
    const city = formatted_address.split(',')[0];
    const res = await axios.get(`https://api.openbrewerydb.org/breweries?
by_city=${city}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getWeathData = async ({ lat, lng }) => {
  console.log('lat', lat);
  console.log('ssuuuuuuuup');
  lat = lat.toString();
  console.log('lat', lat);
  lng = lng.toString();
  const date = new Date();
  const lastYear = (date.getFullYear() - 1).toString();
  let month = '0';

  let key = process.env.REACT_APP_DARK_SKY_API_KEY;
  const promises = [];

  for (var i = 1; i < 13; i++) {
    if (i < 10) {
      month = '0' + i;
    } else {
      month = i;
    }
    const queryDate = lastYear + '-' + month + '-15' + 'T12:00:00';
    const queryURL =
      'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' +
      key +
      '/' +
      lat +
      ',' +
      lng +
      ',' +
      queryDate;
    promises.push(
      axios.get(queryURL, {
        headers: {
          crossDomain: true
        }
      })
    );
  }
  try {
    const responses = await Promise.all(promises);
    let temps = responses.map(month => ({
      time: month.data.currently.time,
      tempHigh: month.data.daily.data[0].temperatureHigh,
      tempLow: month.data.daily.data[0].temperatureLow
    }));
    temps.sort((a, b) => {
      return a.time - b.time;
    });
    return temps;
  } catch (error) {
    console.log(error);
    throw error;
  }

  //   Promise.all(promises)
  //     .then(values => {
  //       console.log(values);
  //       let temps = values.map(month => ({
  //         time: month.data.currently.time,
  //         tempHigh: month.data.daily.data[0].temperatureHigh,
  //         tempLow: month.data.daily.data[0].temperatureLow
  //       }));
  //       temps.sort((a, b) => {
  //         return a.time - b.time;
  //       });
  //       return temps;
  //     })
  //     .catch(error => console.log(error));
};
