import React from 'react';
import MapContainer from './info-sections/MapContainer';
import Weather from './info-sections/Weather';
import Restaurants from './info-sections/Restaurants';
import Breweries from './info-sections/Breweries';
import Header from './info-sections/Header';
import Search from './info-sections/Search';
import RecentSearches from './RecentSearches';

const CityInfo = () => {
  return (
    <div className="main-background">
      <div className="dark-overlay">
        <div className="container">
          <div className="city-info">
            <Header />
            <Search>
              <RecentSearches />
            </Search>
            <Restaurants />
            <Breweries />

            <div className="map-container">
              <MapContainer />
            </div>
            <Weather />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityInfo;
