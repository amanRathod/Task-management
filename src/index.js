import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes';

require('./styles/style.css');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
