import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom'
import api from 'api'

api.token = function (token) {
  if (token) {
      localStorage.setItem('token', token)
      return
  }

  return localStorage.getItem('token')
}

ReactDOM.render((
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('root'))



registerServiceWorker();
