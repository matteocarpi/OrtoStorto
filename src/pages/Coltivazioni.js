import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Coltivazioni.module.scss';
import { useDB } from '../services/pouchDB';
import Reactotron from 'reactotron-react-js';

const Coltivazioni = () => {
  const db = useDB();
  
  const [coltivazioni, setColtivazioni] = useState();

  useEffect(() => {

    db.createIndex({
      index: { fields: ['collection'] },
    });
    db.find({
      selector: {
        collection: { $eq: 'coltivazioni' },
      },
    }).then(resp => {
      Reactotron.log(resp);
      setColtivazioni(resp.docs);
    });
  }, [db]);

  return (
    <div className={styles.wrap}>
      <Link className={styles.createNew} to="/nuova-coltivazione">Crea Nuova Coltivazione</Link>

      <h1>Coltivazioni</h1>
      
      {coltivazioni && coltivazioni.map((coltivazione, i) => {
        return (
          <p key={i}>
            {JSON.stringify(coltivazione)}
          </p>
        );
      })}
    </div>
  );
};

export default Coltivazioni;