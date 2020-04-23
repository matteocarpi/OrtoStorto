import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditBancale from '../components/EditBancale';

const Bancale = (props) => {
  const [editBancale, setEditBancale] = useState();

  return (
    <div>
      {editBancale && <EditBancale 
        number= {props.number}
        family= {props.family}
        width= {props.width}
        length= {props.length}
      />}
      {!editBancale && 
        <>
          <h1>Bancale Numero: {props.number}</h1>
          <p>Famiglia: {props.family}</p>
          <p>Larghezza: {props.width}</p>
          <p>Lunghezza: {props.length}</p>
          <button onClick={() => setEditBancale(true)}>Modifica Bancale</button>
        </>
      }
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