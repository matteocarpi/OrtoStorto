import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Coltivazioni.module.scss';

const Coltivazioni = () => {

  return (
    <div className={styles.wrap}>
      <h1>Coltivazioni</h1>
      <Link className={styles.createNew} to="/new-bancale">Crea Nuovo Bancale</Link>
    </div>
  );
};

export default Coltivazioni;