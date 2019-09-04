/*eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import configureStore from './stores/configureStore';
import App from './components/App';
import {loadData} from './actions/LoadActions';

import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

const socket = io.connect('http://localhost:3000');
const store = configureStore();
store.dispatch(loadData(socket));

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('app')
);
