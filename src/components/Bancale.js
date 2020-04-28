import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useDB } from '../services/pouchDB';
import Reactotron from 'reactotron-react-js';

const Bancale = () => {
  let history = useHistory();
  
  const db = useDB();
  const [bancaleError, setBancaleError] = useState();
  const [bancaleData, setBancaleData] = useState();

  bancaleError && Reactotron.error('Error loading bancale', bancaleError);
  let { number } = useParams();

  db.createIndex({
    index: { fields: ['collection', 'number'] },
  }).catch(e => Reactotron.error(e));

  db.find({
    selector: {
      collection: 'bancali',
      number: { $eq: number },
    },
  }).then(resp => setBancaleData(resp.docs[0])).catch(setBancaleError);

  return (
    <div>
      <h1>Bancale Numero: {number}</h1>

      <p>{JSON.stringify(bancaleData)}</p>

      <button onClick={() => history.push('bancali')}>Torna a tutti i bancali</button>
    </div>
  );
};

export default Bancale;

Bancale.propTypes = {
  number: PropTypes.any.isRequired,
  family: PropTypes.string,
  width: PropTypes.number,
  length: PropTypes.number,
};