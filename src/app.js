import React from "react";
import ReactDOM from 'react-dom';
import logger from 'redux-logger'
import {createStore,applyMiddleware} from 'redux';
import DrawingPage from './components/drawingPage';
import editorApp from './reducers'
const store = createStore(editorApp, applyMiddleware(logger));

const render = () => {
    ReactDOM.render(
        <DrawingPage store={store}/>, document.getElementById('root'));
};

store.subscribe(render);
render();
