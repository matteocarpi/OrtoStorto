import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useDB } from '../services/pouchDB';
import Reactotron from 'reactotron-react-js';
import styles from '../styles/BancaliList.module.scss';
import Bancale from '../components/Bancale';

// @emiliano bovetti <3

const Bancali = () => {
  const db = useDB();

  const [bancali, setBancali] = useState();
  const [bancaliError, setBancaliError] = useState();

  const [focusedBancale, setFocusedBancale] = useState();

  Reactotron.log('Bancali List', bancali);

  
  useEffect(() => {
    // db.allDocs({ include_docs: true }).then(resp => setBancali(resp.rows)).catch(setBancaliError);

    db.createIndex({
      index: {fields: ['collection', 'number']},
    });

    db.find({
      selector: {
        collection: 'bancali',
        number: { $gte: null },
      },
      sort: ['number'],
    }).then(resp => setBancali(resp.docs)).catch(setBancaliError);
  }, [db]);


  return (
    <Layout>
      {focusedBancale &&
      <div>
        <Bancale
          number={focusedBancale.number}
          family={focusedBancale.family}
          width={focusedBancale.width}
          length={focusedBancale.length}
        />
        <button onClick={() => setFocusedBancale(false)}>Torna a tutti i bancali</button>
      </div>
      }

      {!focusedBancale &&
        <h1 className={styles.title}>Bancali</h1>
      }

      {!focusedBancale && !bancali ?
        <>
          <p>Loading...</p>
          <Link className={styles.createNew} to="/new-bancale">Crea Nuovo Bancale</Link>
        </>
        
        :
        
        !focusedBancale &&
        <>
          <section className={styles.bancali}>
            {bancali.map((bancale, i) => {
              return (
                <button onClick={() => setFocusedBancale(bancale)} key={i} className={styles.bancale}>
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