import React from 'react';

import './ToolbarMenu.scss';
import createShape from "../../actions/createShape";
import changeMode from "../../actions/changeMode";


const ToolbarMenu = (props) => (
    <div className="toolbar-menu">
        <button className="toolbar-menu__tool" onClick={() => {
            props.store.dispatch(createShape());
        }}>R
        </button>
    </div>
);


export default ToolbarMenu;