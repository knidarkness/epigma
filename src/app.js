import React from "react";
import ReactDOM from 'react-dom';

import DrawingPage from './components/drawingPage';
import {store} from './reducers';

const render = () => {
    ReactDOM.render(
        <DrawingPage store={store}/>,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
