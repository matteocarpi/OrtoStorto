import React from 'react';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.scss';

// eslint-disable-next-line react/prop-types
const Dashboard = ({ children }) => {
  return (
    <div className={styles.container}>
      <Sidebar className={styles.sideBar}/>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Dashboard;