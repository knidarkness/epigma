import React from 'react';

import './ToolbarMenu.scss';
import createDrawable from "../../action/createDrawable";


export default (props) => (
    <div className="toolbar-menu">
        <button className="toolbar-menu__tool" onClick={() => {
            props.store.dispatch(createDrawable('line'));
        }}>L
        </button>
        <button className="toolbar-menu__tool" onClick={() => {
            props.store.dispatch(createDrawable('rectangle'));
        }}>R
        </button>
    </div>
)