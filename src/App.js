import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Dashboard';
import NewBancale from './actions/NewBancale';
import Bancali from './pages/BancaliList';
import Sidebar from './components/Sidebar';
import styles from './styles/App.module.scss';
import { PouchDB } from './services/pouchDB';
import Bancale from './components/Bancale';
import EditBancale from './actions/EditBancale';

function App() {
  return (
    <PouchDB name="orto-storto">
      <Router>
        <div className={styles.container}>
          <Sidebar />
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/new-bancale" component={NewBancale} />
            <Route exact path="/bancali" component={Bancali} />
            <Route exact path="/bancale-:number/" children={<Bancale />} />
            <Route exact path="/bancale-:number/edit" children={<EditBancale />} />
          </div>
        </div>
      </Router>
    </PouchDB>
  );
}

export default App;
