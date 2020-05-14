import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/Coltivazioni.module.scss';
import { useDB } from '../services/pouchDB';
import Layout from '../components/Layout';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Coltivazioni = () => {
  const classes = useStyles();
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

      <Paper className={styles.wrap}>
        <Link className={styles.createNew} to="/nuova-coltivazione">Crea Nuova Coltivazione</Link>

        <h1>Coltivazioni</h1>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Coltivazioni">
            <TableHead>
              <TableRow>
                <TableCell>Varietà</TableCell>
                <TableCell>Famiglia</TableCell>
                <TableCell>Data di Semina</TableCell>
              </TableRow>
            </TableHead>

            {coltivazioni && coltivazioni.map((coltivazione, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{coltivazione.name}</TableCell>
                  <TableCell>{coltivazione.family}</TableCell>
                  <TableCell>{coltivazione.date}</TableCell>
                </TableRow>
              );
            },
            )
            }
          </Table>
        </TableContainer>
        {/* <table>
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
        </table> */}
      </Paper>
    
    </Layout>
  );
};

export default Coltivazioni;