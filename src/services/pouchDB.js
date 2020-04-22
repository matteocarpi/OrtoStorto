/* eslint-disable no-undef */
import Reactotron from 'reactotron-react-js';

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