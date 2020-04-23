import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useDB } from '../services/pouchDB';
import Reactotron from 'reactotron-react-js';
import styles from '../styles/BancaliList.module.scss';

const Bancali = () => {
  const db = useDB();
  const bancali = useDB().allDocs({ include_docs: true });
  Reactotron.log('meme', bancali);
  // const bancali = useFind({
  //   selector: { 
  //     id : { $gte: null },
  //     sort: ['number'],
  //   },
  // },
  // );
  return (
    <Layout>
      <h1 className={styles.title}>Bancali</h1>
      <section className={styles.bancali}>
        {bancali.map((bancale, i) => {
          return (
            <article key={i} className={styles.bancale}>
              <h2>{bancale.number}</h2>
              <p>{bancale.family}</p>
            </article>
          );
        })}
      </section>
      <Link className={styles.createNew} to="/new-bancale">Crea Nuovo Bancale</Link>
    </Layout>
  );
};

export default Bancali;