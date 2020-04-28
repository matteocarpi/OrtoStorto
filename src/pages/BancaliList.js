import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
    // db.allDocs({ include_docs: true }).then(resp => setBancali(resp.rows)).catch(setBancaliError);
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
      <Layout>

        <h1 className={styles.title}>Bancali</h1>
        {loading &&
          <>
            <p>Loading...</p>
            <Link className={styles.createNew} to="/new-bancale">Crea Nuovo Bancale</Link>
          </>
        }

        {!loading && bancali &&
        <>
          <Link className={styles.createNew} to="/new-bancale">Crea Nuovo Bancale</Link>
          <section className={styles.bancali}>
            {bancali.map((bancale, i) => {
              return (
                <Link onClick={() => history.push(`bancale-${bancale.number}`)} to={`/bancale-${bancale.number}`} key={i} className={styles.bancale}>
                  <h2>{bancale.number}</h2>
                  <p>{bancale.family}</p>
                </Link>
              );
            })}
              

            {bancaliError && <p style={{ color: 'red' }}>Ops... something went wrong</p>}
          </section>
            
        </>
        }

        <Switch>
          <Route path="/bancale-:number" children={<Bancale />} />
        </Switch>
            
            
      </Layout>
    </Router>
  );
};

export default Bancali;