/* eslint-disable no-undef */
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Reactotron from 'reactotron-react-js';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
});

const db = firebase.firestore();

export const getBancali = (observer) => {
  return db.collection('bancali')
    .onSnapshot(observer);
};

export const createBancale = (number, family, width, length) => {
  console.log('I got called!');
  const area = width * length;
  return db.collection('bancali').add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    number: number,
    family: family,
    width: width,
    length: length, 
    area: area,
  })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
};

export default app;