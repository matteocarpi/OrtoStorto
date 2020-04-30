import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/Coltivazioni.module.scss';
import { useDB } from '../services/pouchDB';
import Layout from '../components/Layout';

import Reactotron from 'reactotron-react-js';

const Coltivazioni = () => {
  const db = useDB();
  const history = useHistory();

  const [coltivazioni, setColtivazioni] = useState();

  coltivazioni && Reactotron.log(coltivazioni[coltivazioni.length]);

  useEffect(() => {

    db.createIndex({
      index: { fields: ['collection'] },
    });
    db.find({
      selector: {
        collection: { $eq: 'coltivazioni' },
      },
    }).then(resp => {
      Reactotron.log('All coltivazioni', resp);
      setColtivazioni(resp.docs);
    });
  }, [db]);

  return (
    <Layout>

      <div className={styles.wrap}>
        <Link className={styles.createNew} to="/nuova-coltivazione">Crea Nuova Coltivazione</Link>

        <h1>Coltivazioni</h1>
      
        {coltivazioni && coltivazioni.map((coltivazione, i) => {
          return (
            <button key={i} onClick={() => history.push(`/coltivazioni/${coltivazione._id}/${coltivazione.name}`)}>

              <p className={styles.cultivation}>
                {coltivazione.name}
              </p>
            </button>

          );
        })}
      </div>
    
    </Layout>
  );
};

export default Coltivazioni;