import React from 'react';
import styles from '../styles/Sidebar.module.scss';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <h1>Orto Storto</h1> 
      <ul>
        <li><Link to = "/">Dashboard</Link></li>
        <li><Link to = "/bancali">Bancali</Link></li>
        <li><Link to = "/coltivazioni">Coltivazioni</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;