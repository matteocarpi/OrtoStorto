import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div>
        <h1>Dashboard</h1>
        <Link to="/new-bancale">Crea Nuovo Bancale</Link>
        <br></br>
        <Link to="/bancali">Lista dei Bancali</Link>
      </div>
    </Layout>
  );
};

export default Dashboard;