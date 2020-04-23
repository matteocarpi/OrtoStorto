import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Dashboard';
import NewBancale from './actions/NewBancale';
import Bancali from './pages/Bancali';
import Sidebar from './components/Sidebar';
import styles from './styles/App.module.scss';

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <Sidebar />
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/new-bancale" component={NewBancale} />
          <Route exact path="/bancali" component={Bancali} />
        </div>
      </div>
    </Router>
  );
}

export default App;
