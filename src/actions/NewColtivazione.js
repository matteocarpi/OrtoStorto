import React, { useState, useEffect } from 'react';
import { useDB } from '../services/pouchDB';
import Layout from '../components/Layout';
import { v4 as uuid4 } from 'uuid';
import { useHistory } from 'react-router-dom';

import Reactotron from 'reactotron-react-js';

const NewColtivazione = () => {
  const db = useDB();
  const history = useHistory();

  const currentDate = new Date();
  
  const [bancali, setBancali] = useState();
  Reactotron.log('bancali', bancali);

  const [coordinatesNumber, setCoordinatesNumber] = useState(0);

  const [name, setName] = useState();
  const [date, setDate] = useState(currentDate.toISOString().substring(0, 10));
  const [type, setType] = useState();
  const [family, setFamily] = useState();
  const [producer, setProducer] = useState();
  const [quantity, setQuantity] = useState();
  const [rowDistance, setRowDistance] = useState();
  const [plantDistance, setPlantDistance] = useState();
  const [ripening, setRipening] = useState();
  const [position, setPosition] = useState();
  const [coordinates, setCoordinates] = useState([]);

  Reactotron.log(coordinates);

  const uuid = uuid4();

  let coordinatesBits = [];

  for (let i = 0; i <= coordinatesNumber; i++) {
    coordinatesBits.push('bit');
  }

  Reactotron.log(type);

  useEffect(() => {
    db.createIndex({
      index: { fields: ['collection'] },
    });
    db.find({
      selector: {
        collection: 'bancali',
      },
    }).then(resp => setBancali(resp.docs));
  }, [db]);

  const onSubmitHandling = e => {
    e.preventDefault();

    db.put({
      _id: uuid,
      collection: 'coltivazioni',
      name: name,
      family: family, 
      producer: producer,
      quantity: quantity,
      rowDistance: rowDistance,
      plantDistance: plantDistance,
      position: position,
      alivePlants: quantity,
      coordinates: coordinates,
    }).then(resp => {
      Reactotron.log(resp);
      history.push('/coltivazioni');
    });
  };

  return (
    <Layout>
      <form onSubmit={onSubmitHandling} name="createColtivazione">
        
        <p><label>Nome Varietà</label></p>
        <p><input onChange={e => setName(e.target.value)} type="text" name="name"></input></p>

        <p><label>Produttore</label></p>
        <p><input onChange={e => setProducer(e.target.value)} type="text" name="producer"></input></p>

        <p><label>Famiglia</label></p>
        <p>
          <select onChange={e => setFamily(e.target.value)} name="family">
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
        
        <div>
          <fieldset id="position" onChange={e => setPosition(e.target.value)}>
            <legend>Posizione</legend>

            <input type="radio" id="field" value="Campo" name="position" />
            <label htmlFor="field">Campo</label>

            <input type="radio" id="semenzaio" value="Semenzaio" name="position" />
            <label htmlFor="semenzaio">Semenzaio</label>
          </fieldset>
        </div>

        <br/>

        {position === 'Campo' && 
          <>
            <label htmlFor="coordinates">Coordinate</label>
            {coordinatesBits.map((bit, i) => {
              return (
                <>
                  <select onChange={e => {
                    const value = e.target.value;
                    setCoordinates(old => [...old, value]);
                  }
                  } key={i} id="coordinates">
                    
                    <option value=""></option>
                    {bancali.map((b, i) => {
                      return (
                        <option key={i} value={b.number}>Bancale {b.number}</option>
                      );
                    })}
                  </select>
                </>
              );
            }) 
            }
            <button onClick={e => {
              e.preventDefault();
              setCoordinatesNumber(coordinatesNumber + 1);
            }}>+</button>
            <button onClick={e => {
              e.preventDefault();
              coordinatesNumber >= 1 && setCoordinatesNumber(coordinatesNumber - 1);
            }}>-</button>
          </>
        }

        <div>

          <fieldset id="type" onChange={e => setType(e.target.value)}>
            <legend>Tipo</legend>

            <input type="radio" id="seed" value="Semi" name="type" />
            <label htmlFor="seed">Seme</label>

            <input type="radio" id="plant" value="Piantine" name="type" />
            <label htmlFor="plant">Piantina</label>
          </fieldset>
        
        </div>

        {type &&
          <>
            <label htmlFor="quantity">Numero di {type}</label>
            <p><input onChange={e => setQuantity(e.target.value)} type="number" name="quantity" /></p>
          </>
        }

        <label htmlFor="date">Data di {type === 'Piantine' ? 'Trapianto' : 'Semina'}</label>
        <p><input onChange={e => setDate(e.target.value)} id="date" type="date" value={date}></input></p>
        
        <label htmlFor="ripening">Tempo di maturazione</label>
        <p><input onChange={e => setRipening(e.target.value)} id="date" type="number" value={ripening}></input></p>

        <label htmlFor="rowDistance">Distanza tra le file</label>
        <p><input onChange={e => setRowDistance(e.target.value)} type="number" name="rowDistance" /></p>
        
        <label htmlFor="plantDistance">Distanza tra le piante</label>
        <p><input onChange={e => setPlantDistance(e.target.value)} type="number" name="plantDistance" /></p>

        <button type="submit">Inserisci Coltivazione</button>

      </form>
    </Layout>
  );
};

export default NewColtivazione;