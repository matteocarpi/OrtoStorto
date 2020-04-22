import React, { useState } from 'react';
import Layout from '../components/Layout';
import * as FirestoreService from '../services/pouchDB';

import Reactotron from 'reactotron-react-js';

const NewBancale = ({ history }) => {
  const onSubmitHandling = (event) => {
    setLoading(true);
    event.preventDefault();

    FirestoreService.createBancale(event.target.elements.number.value, event.target.elements.family.value, event.target.elements.width.value, event.target.elements.lunghezza.value).then(() => {
      setLoading(false);
      history.push('/bancali');
    });
  };

  const [loading, setLoading] = useState(false);

  return (
    
    <Layout>
      <h1>Nuovo Bancale</h1>
      {loading ? <p>Loading...</p>
        : 
        <form onSubmit={onSubmitHandling} name="createBancale">
          <p><label>Qual è il numero di questo Bancale?</label></p>
          <p><input type="number" name="number" /></p>
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
          <p><label>Qual è la larghezza di questo bancale?</label></p>
          <p><input step="any" type="number" name="width" /></p>
          <p><label>E la lunghezza?</label></p>
          <p><input step="any" type="number" name="lunghezza" /></p>
          <button type="submit">Crea Bancale!</button>
        </form>
      }
    </Layout>
  );
};

export default NewBancale;