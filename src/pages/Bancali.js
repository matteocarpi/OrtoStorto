import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useFind, useDB } from 'react-pouchdb';
import Reactotron from 'reactotron-react-js';

const Bancali = () => {
  const bancali = useFind({
    selector: {
      collection: 'bancali',
    },
  });
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
      <h1>Bancali</h1>
      {bancali.map((bancale, i) => {
        return (
          <>
            <h2 key={i}>{bancale.number}</h2>
            <p>{bancale.family}</p>
          </>
        );
      })}
      <Link to="/new-bancale">Crea Nuovo Bancale</Link>
    </Layout>
  );
};

export default Bancali;