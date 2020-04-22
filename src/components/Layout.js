import React from 'react';
import app from '../services/pouchDB';

// eslint-disable-next-line react/prop-types
const Dashboard = ({ children }) => {
  return (
    <div>
      {children}
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default Dashboard;