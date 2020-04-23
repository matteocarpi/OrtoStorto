import React from 'react';
import Sidebar from './Sidebar';

// eslint-disable-next-line react/prop-types
const Dashboard = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div>
        {children}
      </div>
    </div>
  );
};

export default Dashboard;