import React from 'react';
import RecentSearchesItem from './info-sections/RecentSearchesItems';
import { connect } from 'react-redux';

const RecentSearches = ({ recSearches }) => {
  return (
    <div className="rec-search-container">
      {recSearches
        ? recSearches.map((place, i) => (
            <RecentSearchesItem key={i} place={place} />
          ))
        : 'There are no recent searches'}
    </div>
  );
};
const mapStateToProps = state => ({
  recSearches: state.places.history
});
export default connect(mapStateToProps)(RecentSearches);
