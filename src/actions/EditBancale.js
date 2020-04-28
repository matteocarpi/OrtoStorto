import React, { useState, useEffect } from 'react';
import { useDB } from '../services/pouchDB';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import Reactotron from 'reactotron-react-js';


const EditBancale = (props) => {
  const db = useDB();

  let { number } = useParams();
  const history = useHistory();

  const [error, setError] = useState();

  const [bancaleExists, setBancaleExists] = useState(false);

  const [newBancaleNumber, setNewBancaleNumber] = useState(number);

  const [family, setFamily] = useState();
  const [width, setWidth] = useState();
  const [length, setLength] = useState();


  
  // Submit changes
  const submitEdit = (e) => {
    const area = props.width * props.length;
    e.preventDefault();
    db.createIndex({
      index: { fields: ['collection', 'number'] },
    });

    db.find({
      selector: {
        collection: 'bancali',
        number: number,
      },
    }).then(resp => {
      const id = resp.docs[0]._id;
      const editInfo = {
        _id: id,
        _rev: resp.docs[0]._rev,
        collection: 'bancali',
        number: newBancaleNumber,
        family: family,
        width: width,
        length: length,
        area: area,
      };

      Reactotron.log(resp);
      Reactotron.log('EditData', editInfo);
      return db.put(editInfo);
    }).then(resp => {
      Reactotron.log('Updated Document!', resp);
      history.push('/bancali');
    })
      .catch(e => setError(e));
  };

  useEffect(() => {
    // Fill in with current data

    db.createIndex({
      index: {fields: ['collection', 'number']},
    });
    
    db.find({
      selector: {
        collection: { $eq: 'bancali' },
        number: { $eq: number },
      },
    }).then(resp => {
      const doc = resp.docs[0];
      setFamily(doc.family);
      setWidth(doc.width);
      setLength(doc.length);
    });
    
    // Listen if modified number already exists
    db.find({
      selector: {
        collection: 'bancali',
        number: newBancaleNumber,
      },
    }).then(resp => resp.docs.length && newBancaleNumber !== number ? setBancaleExists(true) : setBancaleExists(false));
    
  }, [db, newBancaleNumber, number]);

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
          <p><input onChange={e => setLength (e.target.value)} value={length} step="any" type="number" name="lunghezza" /></p>
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