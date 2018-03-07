import React from 'react';

import './ToolbarMenu.scss';
import createDrawable from "../../action/createDrawable";
import appMode from "../../action/appMode";


export default (props) => (
    <div className="toolbar-menu">
        <button className="toolbar-menu__tool" onClick={() => {
            props.store.dispatch(appMode('TOGGLE_D_LINE'));
            console.log(props.store.getState().mode);
        }}>L
        </button>
        <button className="toolbar-menu__tool" onClick={() => {
            props.store.dispatch(createDrawable('RECTANGLE'));
        }}>R
        </button>
    </div>
)
