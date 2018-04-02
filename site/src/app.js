import React from "react";
import ReactDOM from 'react-dom';

import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';

import reducer from './reducers';

import Editor from './containers/Editor';

import './app.scss';

const store = createStore(
    reducer,
    applyMiddleware(thunk),
);
ReactDOM.render(
    <Provider store={store}>
        <Editor/>
    </Provider>,
    document.getElementById('root')
);
