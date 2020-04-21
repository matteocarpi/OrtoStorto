import React from 'react';
import Layout from './Layout';
import * as FirestoreService from '../services/firestore';
<<<<<<< HEAD
import Reactotron from 'reactotron-react-js';

const NewBancale = () => {
  const onSubmitHandling = (event) => {
    event.preventDefault();
    Reactotron.log(event.target.elements.number.value, event.target.elements.family.value, event.target.elements.width.value, event.target.elements.lunghezza.value);

    FirestoreService.createBancale(event.target.elements.number.value, event.target.elements.family.value, event.target.elements.width.value, event.target.elements.lunghezza.value);
  };
=======

const NewBancale = () => {
  const onSubmitHandling = (event) => FirestoreService.createBancale(event.target.elements.number.value, event.target.elements.family.value, event.target.elements.width.value, event.target.elements.length.value);
>>>>>>> feat: first draft insert bancale DOESNTWORK

  return (
    <Layout>
      <h1>Nuovo Bancale</h1>

<<<<<<< HEAD
      <form onSubmit={onSubmitHandling} name="createBancale">
=======
      <form name="createBancale">
>>>>>>> feat: first draft insert bancale DOESNTWORK
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
        <p><input type="number" name="width" /></p>
        <p><label>E la lunghezza?</label></p>
<<<<<<< HEAD
        <p><input type="number" name="lunghezza" /></p>
        <button type="submit">Crea Bancale!</button>
=======
        <p><input type="number" name="height" /></p>
        <button onClick={onSubmitHandling}>Crea Bancale!</button>
>>>>>>> feat: first draft insert bancale DOESNTWORK
      </form>
    </Layout>
  );
};

export default NewBancale;