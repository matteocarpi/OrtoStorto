import React, { useState } from 'react';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import Reactotron from 'reactotron-react-js';
import { useDB } from '../services/pouchDB';

const NewBancale = ({ history }) => {
  const [bancaleNumber, setBancaleNumber] = useState('');
  const currentBancale = [];
  
  useDB().allDocs({
    selector: {
      _id: `bancale:${bancaleNumber}`,
    },
  });

  Reactotron.log(bancaleNumber);
  const onSubmitHandling = (event) => {
    event.preventDefault();

    const area = event.target.elements.width.value * event.target.elements.lunghezza.value;

    
  //   db.put({
  //     _id: `bancale:${event.target.elements.number.value}`,
  //     collection: 'bancali',
  //     number: bancaleNumber,
  //     family: event.target.elements.family.value,
  //     width: event.target.elements.width.value,
  //     length: event.target.elements.lunghezza.value,
  //     area: area,
  //   }).then()
  //     .then((resp) => {
  //       Reactotron.log(resp);
  //       history.push('/bancali');
  //     })
  //     .catch(e => Reactotron.error(e));
  };


  return (
    
    <Layout>
      <h1>Nuovo Bancale</h1>
      
      <form onSubmit={onSubmitHandling} name="createBancale">
        <p><label>Qual è il numero di questo Bancale?</label></p>
        <p><input type="text" name="number" value={bancaleNumber} onChange={e => setBancaleNumber(e.target.value)}/></p>
        <p style={{color: 'red', display: currentBancale.length === 0 ? 'none' : 'block'}}>Questo bancale già esiste, scegli un altro nome...</p>
        <p><label>A che famiglia vuoi assegnare questo bancale?</label></p>
        <p>
          <select name="family">
            <option value = ""></option>
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
        <p><input step="any" type="number" name="lunghezza" /></p>
        <p><label>E la larghezza?</label></p>
        <p><input step="any" type="number" name="width" /></p>
        <button type="submit">Crea Bancale!</button>
      </form>
    </Layout>
  );
};

export default NewBancale;

NewBancale.propTypes = {
  history: PropTypes.node,
};