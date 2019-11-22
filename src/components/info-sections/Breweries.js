import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import BreweryItem from './BreweryItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { getBreweries } from '../../actions/breweries';

const Breweries = ({ place }) => {
  const [breweryState, setBreweryState] = useState({
    breweries: [],
    isLoading: true,
    isError: false
  });

  useEffect(() => {
    const fetchBreweries = async () => {
      setBreweryState({
        isLoading: true,
        isError: false
      });
      try {
        const res = await getBreweries(place);
        setBreweryState({
          breweries: res,
          isLoading: false,
          isError: false
        });
      } catch (error) {
        console.log(error);
        setBreweryState({
          isLoading: false,
          isError: true
        });
      }
    };
    fetchBreweries();
  }, [place]);

  return (
    <section className="brewery-container section-container">
      <h2 className="section-title">
        {' '}
        <FontAwesomeIcon icon={faBeer} /> Local Breweries
      </h2>
      <div className="breweries-list">
        {breweryState.isLoading ? (
          <Loading />
        ) : breweryState.isError ? (
          'There was a problem getting the local breweries'
        ) : breweryState.breweries.length > 0 ? (
          breweryState.breweries.slice(0, 5).map((brewery, i) => {
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
export default connect(mapStateToProps, { getBreweries })(Breweries);
