import React, { useState, useEffect } from 'react';
import { useDB } from '../services/pouchDB';
import PropTypes from 'prop-types';
import Reactotron from 'reactotron-react-js';

const EditBancale = (props) => {
  const db = useDB();

  const [error, setError] = useState();

  const [bancaleExists, setBancaleExists] = useState(false);

  const submitEdit = (e) => {
    const area = props.width * props.length;
    e.preventDefault();
    db.get(`bancale:${props.number}`).then(doc => {
      return db.put({
        _id: `bancale:${newBancaleNumber}`,
        _rev: doc._rev,
        number: newBancaleNumber,
        family: props.family,
        width: props.width,
        length: props.length,
        area: area,
      });
    }).then(resp => Reactotron.log('Updated Document!', resp)).catch((e) => setError(e));
  };

  const [newBancaleNumber, setNewBancaleNumber] = useState(props.number);
  const [family, setFamily] = useState(props.family);
  const [width, setWidth] = useState(props.width);
  const [lunghezza, setLunghezza] = useState(props.length);
  
  useEffect(() => {
    db.get(`bancale:${newBancaleNumber}`).then(() => newBancaleNumber !== props.number && setBancaleExists(true)).catch(() => setBancaleExists(false));
    Reactotron.log('Bancale exists', bancaleExists);

  }, [bancaleExists, db, newBancaleNumber, props.number]);

  return (
    <>
      {error ? <p>Ops... Something went wrong... {Reactotron.error(error)} </p> 
        :

        <form onSubmit={submitEdit} name="createBancale">
          <p><label>Qual è il numero di questo Bancale?</label></p>
          <p><input type="text" name="number" value={newBancaleNumber} onChange={e => setNewBancaleNumber(e.target.value)}/></p>
          <p style={{color: 'red', display: bancaleExists ?  'block' : 'none'}}>Questo bancale già esiste, scegli un altro nome...</p>
          <p><label>A che famiglia vuoi assegnare questo bancale?</label></p>
          <p>
            <select value={family} onChange={e => setFamily(e.target.value)} name="family">
              <option value =""></option>
              <option value = "Brassicacee">Brassicacee</option>
              <option value = "Composite">Composite</option>
              <option value = "Cucurbitacee">Cucurbitacee</option>
              <option value = "Leguminose">Leguminose</option>
              <option value = "Liliacee">Liliacee</option>
              <option value = "Ombrellifere">Ombrellifere</option>
              <option value = "Solanacee">Solanacee</option>
            </select>
          </p>
          <p><label>Qual è la lunghezza di questo bancale?</label></p>
          <p><input onChange={e => setLunghezza (e.target.value)} value={lunghezza} step="any" type="number" name="lunghezza" /></p>
          <p><label>E la larghezza?</label></p>
          <p><input onChange={e => setWidth(e.target.value)} value={width} step="any" type="number" name="width" /></p>
          <button type="submit">Aggiorna Bancale!</button>
        </form>
      }
    </>
  );
};

export default EditBancale;

EditBancale.propTypes = {
  number: PropTypes.string,
  family: PropTypes.string,
  width: PropTypes.number,
  length: PropTypes.number,
};