import React, { useState } from 'react';
import { useDB } from '../services/pouchDB';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';

import Reactotron from 'reactotron-react-js';

const NewColtivazione = () => {
  const db = useDB();
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate.toISOString().substring(0, 10));
  Reactotron.log(date);

  const uuid = uuid4();

  const [type, setType] = useState();

  Reactotron.log(type);

  const onSubmitHandling = e => {
    e.preventDefault();


  };

  return (
    <div>
      <form onSubmit={onSubmitHandling} name="createColtivazione">
        
        <p><label>Nome Varietà</label></p>
        <p><input type="text" name="name"></input></p>

        <p><label>Produttore</label></p>
        <p><input type="text" name="producer"></input></p>

        <p><label>Famiglia</label></p>
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

        <fieldset onChange={e => setType(e.target.value)}>
          <legend>Type</legend>

          <input type="radio" id="kraken" value="Semi" name="type" />
          <label htmlFor="seed">Seme</label>

          <input type="radio" id="plant" value="Piantine" name="type" />
          <label htmlFor="plant">Piantina</label>
        </fieldset>

        {type &&
          <>
            <label htmlFor="quantity">Numero di {type}</label>
            <p><input type="number" name="quantity" /></p>
          </>
        }

        <label htmlFor="date">Data di {type === 'Piantine' ? 'Trapianto' : 'Semina'}</label>
        <p><input onChange={e => setDate(e.target.value)} id="date" type="date" value={date}></input></p>

        <label htmlFor="rowDistance">Distanza tra le file</label>
        <p><input type="number" name="rowDistance" /></p>
        
        <label htmlFor="plantDistance">Distanza tra le piante</label>
        <p><input type="number" name="plantDistance" /></p>


      </form>
    </div>
  );
};

export default NewColtivazione;