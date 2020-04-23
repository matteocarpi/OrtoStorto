import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useDB } from '../services/pouchDB';
import Reactotron from 'reactotron-react-js';
import styles from '../styles/BancaliList.module.scss';

const Bancali = () => {
  const db = useDB();

  const [bancali, setBancali] = useState();
  const [bancaliError, setBancaliError] = useState();

  useEffect(() => {
    db.allDocs({ include_docs: true }).then(resp => setBancali(resp.rows)).catch(setBancaliError);
  }, [db]);

  Reactotron.log(bancali);

  return (
    <Layout>
      <h1 className={styles.title}>Bancali</h1>
      {bancali == null ? <p>Loading...</p>
        :
        
        <section className={styles.bancali}>
          {bancali.map((b, i) => {
            const bancale = b.doc;
            return (
              <article key={i} className={styles.bancale}>
                <h2>{bancale.number}</h2>
                <p>{bancale.family}</p>
              </article>
            );
          })}
          {bancaliError && <p style={{ color: 'red' }}>Ops... something went wrong</p>}
        </section>
      }
      <Link className={styles.createNew} to="/new-bancale">Crea Nuovo Bancale</Link>
    </Layout>
  );
};

export default Bancali;