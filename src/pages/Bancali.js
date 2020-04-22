import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useFind } from 'react-pouchdb';
import Reactotron from 'reactotron-react-js';

const Bancali = () => {
  const bancali = useFind({
    selector: {
      name: { $gte: null },
    },
    sort: ['name'],
  },
  );
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