import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import * as FirestoreService from '../services/pouchDB';
import { Link } from 'react-router-dom';

import Reactotron from 'reactotron-react-js';

const Bancali = () => {
  const [bancaliList, setBancaliList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = FirestoreService.getBancali({
      next: querySnapshot => {
        const updatedBancaliList = 
        querySnapshot.docs.map(docSnapshot => docSnapshot.data());
        setBancaliList(updatedBancaliList);
        setLoading(false);
      },
    });
    return unsubscribe;
  });
  return (
    <Layout>
      <h1>Bancali</h1>
      {loading 
        ? 
        <p>Loading...</p>
        : 
        bancaliList.map((bancale, index) => {
          return <h2 key={index}>{bancale.number}</h2>;
        })}
        <Link to="/new-bancale">Crea Nuovo Bancale</Link>
    </Layout>
  );
};

export default Bancali;