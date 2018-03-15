import React from "react";
import ReactDOM from 'react-dom';

import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { Provider } from 'react-redux';

import reducer from './reducers';

import Editor from './containers/Editor';
import Toolbar from "./containers/Toolbar";

import './app.scss';

const store = createStore(
    reducer,
    applyMiddleware(thunk, logger),
);
ReactDOM.render(
    <Provider store={store}>
        <Editor/>
    </Provider>,
    document.getElementById('root')
);
