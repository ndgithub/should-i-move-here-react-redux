import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { connect } from 'react-redux';
import { cityEntered } from '../../actions/places';

const Search = ({ dispatch, children }) => {
  console.log('hello');
  return (
    <div className="search-container">
      <Autocomplete
        placeholder="Enter a U.S. city"
        style={{ width: '90%' }}
        onPlaceSelected={place => {
          console.log('asdfasdf');
          console.log(place);
          cityEntered(dispatch, {
            formatted_address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
        }}
        types={['(regions)']}
        componentRestrictions={{ country: 'us' }}
      />
      {children}
    </div>
  );
};

export default connect(null, null)(Search);
