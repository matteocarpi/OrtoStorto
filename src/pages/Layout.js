import React from 'react';
import app from '../services/firestore';

const Dashboard = ({ children }) => {
  return (
    <div>
      {children}
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default Dashboard;