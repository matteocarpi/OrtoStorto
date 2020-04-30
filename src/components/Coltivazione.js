import React, { useState, useEffect } from 'react';
import { useDB } from '../services/pouchDB';
import { useParams, useHistory, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from '../styles/Coltivazione.module.scss';
import EditColtivazione from '../actions/EditColtivazione';

// eslint-disable-next-line no-unused-vars
import Reactotron from 'reactotron-react-js';

const Coltivazione = () => {
  const db = useDB();

  let history = useHistory();
  let { id, name } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    db.get(id).then(resp => setData(resp));
  }, [db, id]);

  return (
    <Router>
      <div className={styles.wrap}>
        <p>{JSON.stringify(data)}</p>

        <button onClick={() => history.push(`/coltivazioni/${id}/${name}/edit`)}>Modifica Coltivazione</button>

        <button onClick={e => {
          e.preventDefault();
          history.goBack();
        }}>Indietro</button>

        <Switch>
          <Route path={'/coltivazioni/:id/:name/edit'} children={<EditColtivazione />} />
        </Switch>

      </div>
    </Router>
  );
};

export default Coltivazione;