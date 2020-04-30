import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/Coltivazioni.module.scss';
import { useDB } from '../services/pouchDB';
import Layout from '../components/Layout';

const Coltivazioni = () => {
  const db = useDB();
  const history = useHistory();

  const [coltivazioni, setColtivazioni] = useState();
  
  useEffect(() => {

    db.createIndex({
      index: { fields: [ 'name', 'collection' ] },
    });
    db.find({
      selector: {
        collection: { $eq: 'coltivazioni' },
        name: { $gte: null },
      },
      sort: ['name'],
    }).then(resp => {
      console.log('All coltivazioni', resp);
      setColtivazioni(resp.docs);
    }).catch(e => console.error(e));

  }, [db]);

  return (
    <Layout>

      <div className={styles.wrap}>
        <Link className={styles.createNew} to="/nuova-coltivazione">Crea Nuova Coltivazione</Link>

        <h1>Coltivazioni</h1>
        <table>
          <tbody>
            <th>Name</th>
            <th>Family</th>
            <th>Date</th>
            {coltivazioni && coltivazioni.map((coltivazione, i) => {
              return (

                <tr className={styles.cultivation} key={i} onClick={() => history.push(`/coltivazioni/${coltivazione._id}/${coltivazione.name}`)}>
                  <td>{coltivazione.name}</td>
                  <td>{coltivazione.family}</td>
                  <td>{coltivazione.date}</td>
                </tr>  
              );
            })}

          </tbody>
        </table>
      </div>
    
    </Layout>
  );
};

export default Coltivazioni;