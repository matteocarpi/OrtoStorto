import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, useParams, useHistory, Switch, Route } from 'react-router-dom';
import { useDB } from '../services/pouchDB';
import Reactotron from 'reactotron-react-js';
import EditBancale from '../actions/EditBancale';
import {
  Card,
  Button,
  Typography,
  Divider,
  CircularProgress,
  List,
  ListItem,
  Link,
} from '@material-ui/core';
import styles from '../styles/Bancale.module.scss';

const Bancale = () => {
  let history = useHistory();
  
  const db = useDB();
  const [bancaleError, setBancaleError] = useState();
  const [data, setData] = useState();
  
  const [loading, setLoading] = useState(true);

  bancaleError && Reactotron.error('Error loading bancale', bancaleError);
  let { number } = useParams();

  useEffect(() => {
    db.createIndex({
      index: { fields: ['collection', 'number'] },
    }).catch(e => Reactotron.error(e));
        
    db.find({
      selector: {
        collection: 'bancali',
        number: { $eq: number },
      },
    }).then(resp => {
      setData(resp.docs[0]);
      setLoading(false);
    },
    )
      .catch(setBancaleError);
  }, [db, number]);


  return (
    <Router>
      <div>
        <Typography variant="h2">Bancale {number}</Typography>
        <Typography variant="h5">{data && data.family}</Typography>
        
        
        {loading && <CircularProgress/>}
        
        {data && 
          <div className={styles.info}>
        
            <Card className={styles.card}>
              <Typography variant="h6">Dimensioni</Typography>
              <Divider></Divider>
              <Typography>Larghezza: {data.width}m</Typography>
              <Typography>Lunghezza: {data.length}m</Typography>
              <Typography>{`Area: ${data.area}m\u00b2`}</Typography>
              
            </Card>
            
            <Card className={styles.card}>
            
              <Typography variant="h6">
                {
                  data.guests.length > 0 ? 
                    data.guests < 2 ? 'Coltivazione'
                      :
                      'Coltivazioni'
                    :
                    'Spazio Libero!'
                }
              </Typography>
              <Divider></Divider>
              <List>
                {data.guests.map(guest => {
                  return (
                    <ListItem key={guest.id}>
                      <ListItem>
                        <Link href={`/coltivazioni/${guest.id}/${guest.name}`} >
                      
                      - {guest.name}
                        </Link>
                      </ListItem>
                    </ListItem>
                  );
                })}
              </List>
              
            </Card>
            <p>{JSON.stringify(data)}</p>
          </div>
        }

        <Button variant="contained" onClick={() => history.push(`/bancale-${number}/edit`)}>Modifica Bancale</Button>
        <Button variant="outlined" onClick={() => history.push('/bancali')}>Torna a tutti i bancali</Button>

        <Switch>
          <Route path={'bancale-:number/edit'} children={<EditBancale />} />
        </Switch>

      </div>
    </Router>
  );
};

export default Bancale;

Bancale.propTypes = {
  number: PropTypes.any.isRequired,
  family: PropTypes.string,
  width: PropTypes.number,
  length: PropTypes.number,
};