import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/Coltivazioni.module.scss';
import { useDB } from '../services/pouchDB';
import Layout from '../components/Layout';
import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const headCells = [
  { id: 'variety', numeric: false, disablePadding: true, label: 'Varietà' },
  { id: 'family', numeric: true, disablePadding: false, label: 'Famiglia' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Data di Semina' },
  { id: 'position', numeric: true, disablePadding: false, label: 'Posizione' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const Coltivazioni = () => {
  const classes = useStyles();
  const db = useDB();

  const history = useHistory();

  const [coltivazioni, setColtivazioni] = useState();
  
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('date');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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
    <>
      <Link className={styles.createNew} to="/nuova-coltivazione">Crea Nuova Coltivazione</Link>

      <div className={styles.wrap}>

        <Typography variant="h1">Coltivazioni</Typography>

        <Paper elevation={3} className={styles.table}>
          <Table
            className={classes.table}
            aria-labelledby="Coltivazioni"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {coltivazioni && stableSort(coltivazioni, getComparator(order, orderBy))
                .map((coltivazione) => {
                  return (
                    <TableRow
                      hover
                      onClick={() => history.push(`/coltivazioni/${coltivazione._id}/${coltivazione.name}`)}
                      key={coltivazione.name}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        {coltivazione.name}
                      </TableCell>
                      <TableCell align="right">{coltivazione.family}</TableCell>
                      <TableCell align="right">{coltivazione.date}</TableCell>
                      <TableCell align="right">
                        {coltivazione.position === 'Semenzaio'
                          ?
                          coltivazione.position
                          :
                          'Bancale ' +
                          coltivazione.coordinates.join(', ')
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
    
      </div>
    </>
  );
};

export default Coltivazioni;