import React from 'react';
import {changeZoom} from "../../actions/index";

import './Toolbar.scss'

const Header = ({zoom, changeZoom}) => (
    <header className="toolbar">
        <section className="toolbar__item">
            <div className="zoom">
                <input className="zoom__button" type="button" value="+" onClick={() => changeZoom(0.01)}/>
                <span className="zoom__val">{Math.round(zoom*100)}%</span>
                <input className="zoom__button" type="button" value="-" onClick={() => changeZoom(-0.01)}/>
            </div>
        </section>
    </header>
);

export default Header;