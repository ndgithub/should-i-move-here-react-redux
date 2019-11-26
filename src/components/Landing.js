import React from 'react';
import RecentSearches from './RecentSearches';
import Search from './info-sections/Search';

const Landing = () => {
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <div className="title">Should I Move Here?</div>
          <div className="sub-title">
            Enter a U.S. city to learn more about your next home : )
          </div>

          <Search>
            <RecentSearches />
          </Search>
        </div>
      </div>
    </div>
  );
};

export default Landing;
