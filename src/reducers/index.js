import { combineReducers } from 'redux';
import breweries from './breweries';
import weather from './weather';
import restaurants from './restaurants';

export default combineReducers({
  breweries,
  restaurants,
  weather,
  places
});
