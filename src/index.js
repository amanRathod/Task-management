import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes';
import FirebaseContext from './utils/context/firebase';
import { firebase, FieldValue } from './firebase/firebase';

require('./styles/style.css');

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
