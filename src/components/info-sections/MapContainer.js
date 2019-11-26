import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.size = React.createRef();
  }

  render(props) {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: this.props.currentPlace.lat,
          lng: this.props.currentPlace.lng
        }}
        center={{
          lat: this.props.currentPlace.lat,
          lng: this.props.currentPlace.lng
        }}></Map>
    );
  }
}
const mapStateToProps = state => ({
  currentPlace: state.places.current
});

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapContainer)
);
