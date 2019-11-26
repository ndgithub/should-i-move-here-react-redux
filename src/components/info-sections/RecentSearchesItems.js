import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { cityEntered } from '../../actions/places';
import { connect } from 'react-redux';

const StyledButton = withStyles({
  root: {
    borderRadius: 50,
    margin: '10px',
    color: 'white',
    backgroundColor: '#ffffff22',
    border: 'none'
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button);

const RecentSearchesItem = ({ dispatch, place }) => {
  const placeSplit = place.formatted_address.split(',');
  placeSplit.pop();
  const city = placeSplit.join(',');
  return (
    <StyledButton
      className="rec-search-item"
      onClick={() => cityEntered(dispatch, place)}
      variant="outlined">
      {city}
    </StyledButton>
  );
};

export default connect()(RecentSearchesItem);
