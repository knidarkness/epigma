import React from 'react';
import {changeZoom} from "../../actions/index";

import './Toolbar.scss'

const Header = ({zoom, changeZoom}) => (
    <header className="toolbar">
        <section className="toolbar__group">
            <div className="zoom-control">
                <input className="zoom-control__control" type="button" value="+" onClick={() => changeZoom(0.01)}/>
                <span className="zoom-control__indicator">{Math.round(zoom*100)}%</span>
                <input className="zoom-control__control" type="button" value="-" onClick={() => changeZoom(-0.01)}/>
            </div>
        </section>
    </header>
);

export default Header;