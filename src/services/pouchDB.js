import React, { createContext, useContext, useState } from 'react';
import PouchDBCtor from 'pouchdb';
  
const PouchDBContext = createContext();
// eslint-disable-next-line react/prop-types
export function PouchDB({ children, ...opts }) {
  const initPouchDB = () => new PouchDBCtor(opts);
  const [db] = useState(initPouchDB);
  return (
    <PouchDBContext.Provider value={db}>
      {children}
    </PouchDBContext.Provider>
  );
}

export function useDB() {
  return useContext(PouchDBContext);
}