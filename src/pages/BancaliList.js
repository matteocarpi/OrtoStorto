import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useDB } from '../services/pouchDB';
import Reactotron from 'reactotron-react-js';
import styles from '../styles/BancaliList.module.scss';
import Bancale from './Bancale';

// @emiliano bovetti <3

const Bancali = () => {
  const db = useDB();

  const [bancali, setBancali] = useState();
  const [bancaliError, setBancaliError] = useState();

  const [focusedBancale, setFocusedBancale] = useState();

  useEffect(() => {
    db.allDocs({ include_docs: true }).then(resp => setBancali(resp.rows)).catch(setBancaliError);
  }, [db]);

  Reactotron.log(bancali);

  return (
    <Layout>
      {focusedBancale && <Bancale
        number="23"
        family="Brassicacee"
      />}

      {!focusedBancale &&
        <h1 className={styles.title}>Bancali</h1>
      }

      {!focusedBancale && bancali == null ? <p>Loading...</p>
        
        :
        !focusedBancale &&
        <>
          <section className={styles.bancali}>
            {bancali.map((b, i) => {
              const bancale = b.doc;
              return (
                <button onClick={() => setFocusedBancale(bancale.number)} key={i} className={styles.bancale}>
                  <h2>{bancale.number}</h2>
                  <p>{bancale.family}</p>
                </button>
              );
            })}
            {bancaliError && <p style={{ color: 'red' }}>Ops... something went wrong</p>}
          </section>
      
          <Link className={styles.createNew} to="/new-bancale">Crea Nuovo Bancale</Link>
        </>
      }
    </Layout>
  );
};

export default Bancali;