import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, useParams, useHistory, Switch, Route } from 'react-router-dom';
import { useDB } from '../services/pouchDB';
import Reactotron from 'reactotron-react-js';
import EditBancale from '../actions/EditBancale';

const Bancale = () => {
  let history = useHistory();
  
  const db = useDB();
  const [bancaleError, setBancaleError] = useState();
  const [bancaleData, setBancaleData] = useState();
  Reactotron.log(bancaleData);
  
  bancaleError && Reactotron.error('Error loading bancale', bancaleError);
  let { number } = useParams();

  useEffect(() => {
    db.createIndex({
      index: { fields: ['collection', 'number'] },
    }).catch(e => Reactotron.error(e));
        
    db.find({
      selector: {
        collection: 'bancali',
        number: { $eq: number },
      },
    }).then(resp => setBancaleData(resp.docs[0])).catch(setBancaleError);
  }, [db, number]);


  return (
    <Router>
      <div>
        <h1>Bancale Numero: {number}</h1>

        <p>{JSON.stringify(bancaleData)}</p>

        <button onClick={() => history.push(`/bancale-${number}/edit`)}>Modifica Bancale</button>
        <button onClick={() => history.push('/bancali')}>Torna a tutti i bancali</button>

        <Switch>
          <Route path={'bancale-:number/edit'} children={<EditBancale />} />
        </Switch>

      </div>
    </Router>
  );
};

export default Bancale;

Bancale.propTypes = {
  number: PropTypes.any.isRequired,
  family: PropTypes.string,
  width: PropTypes.number,
  length: PropTypes.number,
};