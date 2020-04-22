import React, { useEffect,  useState } from 'react';
import app from '../services/pouchDB';

export const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  
  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
    setPending(false);
  }, []);

  if(pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

