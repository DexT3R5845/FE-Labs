import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './app';

axios.defaults.baseURL = process.env.API_URL; // for ci&cd and docker purpose

ReactDOM.render(<App/>, document.getElementById('app'));