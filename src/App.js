import React, { useState, Fragment } from 'react';
import Landing from './components/Landing';
import CityInfo from './components/CityInfo';
import './App.css';
import dotenv from 'dotenv';
import { addToRecSearches } from './apiUtils';
import { LOC_STORE_REC_SEARCHES } from './constants';
import { connect } from 'react-redux';

if (process.env.NODE_ENV !== 'production') dotenv.config();

const App = ({ currentPlace }) => {
  const [recSearches, setRecSearches] = useState(
    JSON.parse(localStorage.getItem(LOC_STORE_REC_SEARCHES))
  );

  // have entered city in this state
  // const updatePlace = place => {
  //   addToRecSearches(place, setRecSearches);
  //   setPlace(place);
  // };

  return (
    <Fragment>
      {!currentPlace ? <Landing recSearches={recSearches} /> : <CityInfo />}
    </Fragment>
  );
};
const mapStateToProps = store => ({
  currentPlace: store.places.current
});
export default connect(mapStateToProps)(App);
