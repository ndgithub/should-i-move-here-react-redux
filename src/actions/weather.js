import { GET_WEATHER, WEATHER_ERROR, RESET_WEATHER } from '../constants';
import axios from 'axios';

export const getWeather = async (dispatch, currentPlace) => {
  dispatch({
    type: RESET_WEATHER
  });
  try {
    const res = await getWeathData(currentPlace);

    dispatch({
      type: GET_WEATHER,
      weathData: res
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: WEATHER_ERROR
    });
  }
};

export const getWeathData = async ({ lat, lng }) => {
  lat = lat.toString();
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
    const queryDate = lastYear + '-' + month + '-01T12:00:00';
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
    const highs = temps.map(month => month.tempHigh);
    const lows = temps.map(month => month.tempLow);
    return { highs, lows };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
