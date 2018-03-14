import React from "react";
import ReactDOM from 'react-dom';

import {createStore,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';

import Editor from './containers/Editor';
import Toolbar from "./containers/Toolbar";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Toolbar/>
            <Editor/>
        </div>
    </Provider>,
    document.getElementById('root')
);
