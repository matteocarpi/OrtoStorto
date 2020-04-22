import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useDB } from 'react-pouchdb';

import Reactotron from 'reactotron-react-js';

const NewBancale = ({ history }) => {

  const db = useDB();

  const onSubmitHandling = (event) => {
    setLoading(true);
    event.preventDefault();

    const area = event.target.elements.width.value * event.target.elements.lunghezza.value;

    db.put({
      _id: `bancale:${event.target.elements.number.value}`,
      collection: 'bancali',
      number: event.target.elements.number.value,
      family: event.target.elements.family.value,
      width: event.target.elements.width.value,
      length: event.target.elements.lunghezza.value,
      area: area,
    }).then()
      .then((resp) => {
        Reactotron.log(resp);
        setLoading(false);
        history.push('/bancali');
      })
      .catch(e => Reactotron.error(e));
  };

  const [loading, setLoading] = useState(false);


  return (
    
    <Layout>
      <h1>Nuovo Bancale</h1>
      
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