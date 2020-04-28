import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditBancale from '../actions/EditBancale';
import { useParams } from 'react-router-dom';
import { useDB } from '../services/pouchDB';
import Reactotron from 'reactotron-react-js';

const Bancale = () => {
  const db = useDB();
  const [bancaleError, setBancaleError] = useState();
  const [bancaleData, setBancaleData] = useState();

  bancaleError && Reactotron.error('Error loading bancale', bancaleError);
  // const [editBancale, setEditBancale] = useState();
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
      {/* {editBancale ?  <EditBancale 
        number={props.number}
        family={props.family}
        width={props.width}
        length={props.length}
      />
        :
        <>
          <h1>Bancale Numero: {props.number}</h1>
          <p>Famiglia: {props.family}</p>
          <p>Larghezza: {props.width}</p>
          <p>Lunghezza: {props.length}</p>
          <button onClick={() => setEditBancale(true)}>Modifica Bancale</button>
        </>
      } */}
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