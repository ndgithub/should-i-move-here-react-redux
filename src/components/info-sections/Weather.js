import React, { useEffect } from 'react';
import Loading from '../Loading';
import LineChart from './LineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { getWeather } from '../../actions/weather';

const Weather = ({ dispatch, currentPlace, weathState }) => {
  useEffect(() => {
    getWeather(dispatch, currentPlace);
  }, [currentPlace]);
  return (
    <div className="weather-container section-container">
      <h2 className="section-title">
        {' '}
        <FontAwesomeIcon icon={faSun} /> Yearly Weather
      </h2>
      {weathState.isLoading ? (
        <Loading />
      ) : weathState.isError ? (
        'There was a problem getting the weather'
      ) : (
        <LineChart data={weathState.weathData} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  currentPlace: state.places.current,
  weathState: state.weather
});

export default connect(mapStateToProps)(Weather);
