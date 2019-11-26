import React, { useEffect } from 'react';
import Loading from '../Loading';
import BreweryItem from './BreweryItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { getBreweries } from '../../actions/breweries';

const Breweries = ({
  dispatch,
  breweries: { breweries, isLoading, isError },
  currentPlace
}) => {
  useEffect(() => {
    getBreweries(dispatch, currentPlace);
  }, [currentPlace]);

  return (
    <section className="brewery-container section-container">
      <h2 className="section-title">
        {' '}
        <FontAwesomeIcon icon={faBeer} /> Local Breweries
      </h2>
      <div className="breweries-list">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          'There was a problem getting the local breweries'
        ) : breweries.length > 0 ? (
          breweries.slice(0, 5).map((brewery, i) => {
            return <BreweryItem key={i} brewery={brewery} />;
          })
        ) : (
          'There are no breweries found'
        )}
      </div>
    </section>
  );
};
const mapStateToProps = state => ({
  breweries: state.breweries,
  currentPlace: state.places.current
});

// const mapDispatchToProps = {
//   getBreweries
// };

export default connect(mapStateToProps, null)(Breweries);
