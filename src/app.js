import React from "react";
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';

const render = () => {
    ReactDOM.render(
        <h1>Hello</h1>, document.getElementById('root'));
};

render();
