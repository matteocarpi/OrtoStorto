import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Bancale = (props) => {

  return (
    <div>
      <h1>{props.number}</h1>
      <p>{props.family}</p>
    </div>
  );
};

export default Bancale;

Bancale.propTypes = {
  number: PropTypes.any.isRequired,
  family: PropTypes.string,
};