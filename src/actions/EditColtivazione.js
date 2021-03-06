import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDB } from '../services/pouchDB';

import Reactotron from 'reactotron-react-js';

const EditColtivazione = () => {
  const db = useDB();
  let { id, name } = useParams();
  let history = useHistory();

  const [bancali, setBancali] = useState();

  const [cultName, setCultName] = useState();
  const [date, setDate] = useState();
  const [type, setType] = useState();
  const [family, setFamily] = useState();
  const [producer, setProducer] = useState();
  const [quantity, setQuantity] = useState();
  const [rowDistance, setRowDistance] = useState();
  const [plantDistance, setPlantDistance] = useState();
  const [ripening, setRipening] = useState();
  const [position, setPosition] = useState();
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    db.get(id).then(resp => {
      Reactotron.log('This Data', resp);
      setCultName(resp.name);
      setProducer(resp.producer);
      setFamily(resp.family);
      setPosition(resp.position);
      setCoordinates(resp.coordinates && resp.coordinates);
      setDate(resp.date);
      setRipening(resp.ripening);
      setQuantity(resp.quantity);
      setRowDistance(resp.rowDistance);
      setPlantDistance(resp.plantDistance);
    }).catch(e => Reactotron.error(e));

    // All bancali
    db.find({
      selector: {
        collection: 'bancali',
      },
    }).then(resp => setBancali(resp.docs));
  }, [db, id]);

  

  const onSubmitHandling = e => {
    e.preventDefault();
    db.get(id)
      .then(doc => {
        Reactotron.log('one');
        doc.name = cultName;
        doc.producer = producer;
        doc.family = family;
        doc.position = position;
        doc.coordinates = coordinates;
        doc.date = date;
        doc.ripening = ripening;
        doc.quantity = quantity;
        doc.rowDistance = rowDistance;
        doc.plantDistance = plantDistance;
        return doc;
      })
      .then(doc => {
        Reactotron.log('two');
        db.put(doc)
          .then(history.push('/coltivazioni'))
          .catch(e => Reactotron.error(e));
      })
      .catch(e => Reactotron.error(e));
  };
  return (
    <div>
      <h1>{name} - {id}</h1>

      <form onSubmit={onSubmitHandling} name="createColtivazione">
        
        <p><label>Nome Varietà</label></p>
        <p><input value={cultName} onChange={e => setCultName(e.target.value)} type="text" name="name"></input></p>

        <p><label>Produttore</label></p>
        <p><input value={producer} onChange={e => setProducer(e.target.value)} type="text" name="producer"></input></p>

        <p><label>Famiglia</label></p>
        <p>
          <select onChange={e => setFamily(e.target.value)} name="family">
            <option value = ""></option>
            <option selected={family === 'Brassicacee'} value= "Brassicacee">Brassicacee</option>
            <option selected={family === 'Composite'} value= "Composite">Composite</option>
            <option selected={family === 'Cucurbitacee'} value= "Cucurbitacee">Cucurbitacee</option>
            <option selected={family === 'Leguminose'} value= "Leguminose">Leguminose</option>
            <option selected={family === 'Liliacee'} value= "Liliacee">Liliacee</option>
            <option selected={family === 'Ombrellifere'} value= "Ombrellifere">Ombrellifere</option>
            <option selected={family === 'Solanacee'} value= "Solanacee">Solanacee</option>
          </select>
        </p>
        
        <div>
          <fieldset id="position" onChange={e => setPosition(e.target.value)}>
            <legend>Posizione</legend>

            <input checked={position === 'Campo'} type="radio" id="field" value="Campo" name="position" />
            <label htmlFor="field">Campo</label>

            <input checked={position === 'Semenzaio'} type="radio" id="semenzaio" value="Semenzaio" name="position" />
            <label htmlFor="semenzaio">Semenzaio</label>
          </fieldset>
        </div>

        <br/>

        {position === 'Campo' && 
          <>
            <label htmlFor="coordinates">Coordinate</label>
            {coordinates && coordinates.map((coordinate, ci) => {
              return (
                <>
                  <select onChange={e => {
                    const value = e.target.value;
                    setCoordinates(coordinates => {
                      const newCoords = coordinates.slice();
                      newCoords[ci] = value;
                      return newCoords;
                    });
                  }
                  } key={ci} id="coordinates">
                    
                    <option value=""></option>
                    {bancali && bancali.map((b, bi) => {
                      return (
                        <option key={bi} selected={coordinate === b.number} value={b.number}>Bancale {b.number}</option>
                      );
                    })}
                  </select>
                  <button onClick={(e) => setCoordinates(coords => {
                    const newCoords = coords.slice();
                    newCoords.splice(ci, 1);
                    return newCoords;
                  })}>Delete</button>
                </>
              );
            }) 
            }
            <button onClick={e => {
              e.preventDefault();
              setCoordinates(c => [...c, '']);
            }}>+</button>
          </>
        }

        <div>

          <fieldset id="type" onChange={e => setType(e.target.value)}>
            <legend>Tipo</legend>

            <input checked={type === 'Semi'} type="radio" id="seed" value="Semi" name="type" />
            <label htmlFor="seed">Seme</label>

            <input checked={type === 'Piantine'} type="radio" id="plant" value="Piantine" name="type" />
            <label htmlFor="plant">Piantina</label>
          </fieldset>
        
        </div>

        {type &&
          <>
            <label htmlFor="quantity">Numero di {type}</label>
            <p><input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" name="quantity" /></p>
          </>
        }

        <label htmlFor="date">Data di {type === 'Piantine' ? 'Trapianto' : 'Semina'}</label>
        <p><input onChange={e => setDate(e.target.value)} id="date" type="date" value={date}></input></p>
        
        <label htmlFor="ripening">Tempo di maturazione</label>
        <p><input onChange={e => setRipening(e.target.value)} id="date" type="number" value={ripening}></input></p>

        <label htmlFor="rowDistance">Distanza tra le file</label>
        <p><input value={rowDistance} onChange={e => setRowDistance(e.target.value)} type="number" name="rowDistance" /></p>
        
        <label htmlFor="plantDistance">Distanza tra le piante</label>
        <p><input value={plantDistance} onChange={e => setPlantDistance(e.target.value)} type="number" name="plantDistance" /></p>

        <button type="submit">Conferma Modifiche</button>

      </form>
    </div>
  );
};

export default EditColtivazione;