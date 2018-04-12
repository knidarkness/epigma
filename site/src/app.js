import React from 'react';
import ReactDOM from 'react-dom';

import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';

import reducer from './state';

import Editor from './views/containers/Editor';

import './app.scss';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);
ReactDOM.render(
    <Provider store={store}>
        <Editor/>
    </Provider>,
    document.getElementById('root')
);
