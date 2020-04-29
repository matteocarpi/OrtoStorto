import React, { useState, useEffect } from 'react';
import { useDB } from '../services/pouchDB';
import { useParams, useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

// eslint-disable-next-line no-unused-vars
import Reactotron from 'reactotron-react-js';

const Coltivazione = () => {
  const db = useDB();

  let history = useHistory();
  let { id } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    db.get(id).then(resp => setData(resp));
  }, [db, id]);

  return (
    <Layout>
      <div>
        <p>{JSON.stringify(data)}</p>
        <button onClick={e => {
          e.preventDefault();
          history.goBack();
        }}>Indietro</button>
      </div>
    </Layout>
  );
};

export default Coltivazione;