import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDB } from '../services/pouchDB';
import Reactotron from 'reactotron-react-js';
import styles from '../styles/BancaliList.module.scss';
import Bancale from '../components/Bancale';

// @emiliano bovetti <3

const Bancali = ({ history }) => {
  const db = useDB();

  const [loading, setLoading] = useState();
  const [bancali, setBancali] = useState();
  const [bancaliError, setBancaliError] = useState();

  Reactotron.log('Bancali List', bancali);

  
  useEffect(() => {
    
    setLoading(true);

    db.createIndex({
      index: {fields: ['collection', 'number']},
    }).catch(error => Reactotron.error(error));

    db.find({
      selector: {
        collection: 'bancali',
        number: { $gte: null },
      },
      sort: ['number'],
    }).then(resp => {
      setBancali(resp.docs);
      setLoading(false);
    }).catch(setBancaliError);
  }, [db]);


  return (
    <Router>

      <h1 className={styles.title}>Bancali</h1>
      {loading &&
          <>
            <p>Loading...</p>
            <button className={styles.createNew} onClick={() => history.push('/new-bancale')}>Crea Nuovo Bancale</button>
          </>
      }

      {!loading && bancali &&
        <>
          <button className={styles.createNew} onClick={() => history.push('/new-bancale')} to="/new-bancale">Crea Nuovo Bancale</button>
          <section className={styles.bancali}>
            {bancali.map((bancale, i) => {
              return (
                <button onClick={() => history.push(`bancale-${bancale.number}`)} to={`/bancale-${bancale.number}`} key={i} className={styles.bancale}>
                  <h2>{bancale.number}</h2>
                  <p>{bancale.family}</p>
                </button>
              );
            })}
              

            {bancaliError && <p style={{ color: 'red' }}>Ops... something went wrong</p>}
          </section>
            
        </>
      }

      <Switch>
        <Route path="/bancale-:number" children={<Bancale />} />
      </Switch>

    </Router>
  );
};

export default Bancali;