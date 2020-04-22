import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Dashboard';
import NewBancale from './actions/NewBancale';
import Bancali from './pages/Bancali';
import { PouchDB } from 'react-pouchdb';

function App() {
  return (
    <PouchDB name="ortoStorto">
      <Suspense fallback="...loading">

        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/new-bancale" component={NewBancale} />
            <Route exact path="/bancali" component={Bancali} />
          </div>
        </Router>
      </Suspense>
    </PouchDB>
  );
}

export default App;
