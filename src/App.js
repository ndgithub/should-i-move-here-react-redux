import React, { Fragment } from 'react';
import Landing from './components/Landing';
import CityInfo from './components/CityInfo';
import './App.css';
import dotenv from 'dotenv';
import { connect } from 'react-redux';

if (process.env.NODE_ENV !== 'production') dotenv.config();

const App = ({ currentPlace }) => {
  return <Fragment>{!currentPlace ? <Landing /> : <CityInfo />}</Fragment>;
};

const mapStateToProps = store => ({
  currentPlace: store.places.current
});

export default connect(mapStateToProps)(App);
