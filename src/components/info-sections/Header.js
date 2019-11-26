import React from 'react';
import { connect } from 'react-redux';

const Header = ({ currentPlace }) => {
  const currentPlaceSplit = currentPlace.formatted_address.split(',');
  currentPlaceSplit.pop();
  const city = currentPlaceSplit.join(',').toUpperCase();
  return (
    <div className="header-container">
      {' '}
      <div className="sub-title">Should I move to... </div>
      {city}
    </div>
  );
};

const mapStateToProps = state => ({ currentPlace: state.places.current });
export default connect(mapStateToProps)(Header);
