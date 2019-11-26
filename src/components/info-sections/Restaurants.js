import React, { useEffect } from 'react';
import Loading from '../Loading';
import RestItem from './RestItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { getRestInfo } from '../../actions/restaurants';

const Restaurants = ({ dispatch, currentPlace, restaurants }) => {
  useEffect(() => {
    getRestInfo(dispatch, currentPlace);
  }, [currentPlace]);

  return (
    <section className="restaurant-container section-container">
      <h2 className="section-title">
        {' '}
        <FontAwesomeIcon icon={faUtensils} /> Top Rated Restaurants
      </h2>
      <div className="restaurant-list">
        {restaurants.isLoading ? (
          <Loading />
        ) : restaurants.isError ? (
          'We had some trouble getting the restaurants'
        ) : (
          restaurants.restaurants.map((rest, i) => {
            return <RestItem key={i} rest={rest} />;
          })
        )}
      </div>
    </section>
  );
};
const mapStateToProps = state => ({
  currentPlace: state.places.current,
  restaurants: state.restaurants
});

export default connect(mapStateToProps)(Restaurants);
