import React, { useState, useEffect } from 'react';
import { useDB } from '../services/pouchDB';
import { useParams, useHistory, Route, Switch } from 'react-router-dom';
import styles from '../styles/Coltivazione.module.scss';
import EditColtivazione from '../actions/EditColtivazione';
import { Typography, CircularProgress, Chip } from '@material-ui/core';

// eslint-disable-next-line no-unused-vars
import Reactotron from 'reactotron-react-js';

const Coltivazione = () => {
  const db = useDB();
  const months = [
    'Gennaio', 
    'Febbraio', 
    'Marzo', 
    'Aprile', 
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre', 
  ];

  let history = useHistory();
  let { id, name } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  
  const deleteCultivation = () => {
    db.get(id)
      .then(doc => {
        doc._deleted = true;
        return doc;
      })
      .then(doc => {
        db.put(doc).catch(e => Reactotron.error(e));
        history.push('/coltivazioni');
      },
      )
      .catch(e => Reactotron.error(e));
  }; 
  useEffect(() => {
    db.get(id).then(resp => {
      setData(resp);
      setLoading(false);
    },
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, id]);

  return (
    <div className={styles.wrap}>
      {loading && <CircularProgress />}
      {data &&
        <div className={styles.wrap}>
          <Typography className={styles.title} variant="h2">{data.name}</Typography>
          <div className={styles.subTitle}>
            <Typography className={styles.subTitleElem} variant="h6">{data.producer}</Typography>
            <Typography className={styles.subTitleElem} variant="h6">
              -
            </Typography>
            <Typography className={styles.subTitleElem} variant="h6">{new Date(data.date).getDay()} {months[new Date(data.date).getMonth()]} {new Date(data.date).getFullYear()}</Typography>
          </div>
          <div className={styles.position}>
            {data.position === 'Semenzaio'
              ?
              <Typography>Semenzaio</Typography>
              :
              data.coordinates.map(coord => {
                return <Chip onClick={() => history.push(`/bancale-${coord}`)} key={coord} label={coord} />;
              })
            }
          </div>
          <Typography variant="h5">{data.alivePlants} Piante</Typography>

          <button onClick={() => history.push(`/coltivazioni/${id}/${name}/edit`)}>Modifica Coltivazione</button>

          <button onClick={() => deleteCultivation()}>Elimina Coltivazione</button>
          <button onClick={e => {
            history.goBack();
          }}>Indietro</button>
        </div>

      }
      <Switch>
        <Route path={'/coltivazioni/:id/:name/edit'} children={<EditColtivazione />} />
      </Switch>
    </div>
  );
};

export default Coltivazione;