import React, { useState, Fragment } from 'react';
import Landing from './components/Landing';
import CityInfo from './components/CityInfo';
import './App.css';
import dotenv from 'dotenv';
import { addToRecSearches } from './apiUtils';
import { LOC_STORE_REC_SEARCHES } from './constants';

if (process.env.NODE_ENV !== 'production') dotenv.config();

const App = () => {
  const [place, setPlace] = useState({
    formatted_address: '',
    lat: '',
    lng: ''
  });

  const [recSearches, setRecSearches] = useState(
    JSON.parse(localStorage.getItem(LOC_STORE_REC_SEARCHES))
  );

  // have entered city in this state
  const updatePlace = place => {
    addToRecSearches(place, setRecSearches);
    setPlace(place);
  };

  return (
    <Fragment>
      {!place.formatted_address ? (
        <Landing updatePlace={updatePlace} recSearches={recSearches} />
      ) : (
        <CityInfo
          updatePlace={updatePlace}
          place={place}
          recSearches={recSearches}
        />
      )}
    </Fragment>
  );
};

export default App;
