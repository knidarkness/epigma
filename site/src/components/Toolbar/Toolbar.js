import React from 'react';
import {Link} from 'react-router-dom';
import Stats from './../../containers/Stats'

import {EDITOR_MODE} from './../../const';
import {getCenterPoint} from '../../utils.js';

import './Toolbar.scss'

const Header = ({zoom, zoomCanvas, undo, redo, changeMode, mode}) => {
    return (
        <header className="toolbar">
            <Link to='/' className="toolbar__title">Ep</Link>
            <section className="toolbar__items">
                <button className={`toolbar__button toolbar__button_view ${(mode === EDITOR_MODE.VIEW) ? 'toolbar__button_active' : ''}`} onClick={() => changeMode(EDITOR_MODE.VIEW)}/>
                <button className={`toolbar__button toolbar__button_edit ${(mode === EDITOR_MODE.DRAW) ? 'toolbar__button_active' : ''}`} onClick={() => changeMode(EDITOR_MODE.DRAW)}/>
                <button className="toolbar__button toolbar__button_zoom-in" onClick={() => zoomCanvas(getCenterPoint('#canvas'), Math.max(zoom + 0.05, 0.5))}/>
                <button className="toolbar__button toolbar__button_zoom-out" onClick={() => zoomCanvas(getCenterPoint('#canvas'), Math.max(zoom - 0.05, 0.5))}/>
                <button className="toolbar__button toolbar__button_undo" onClick={() => undo()}/>
                <button className="toolbar__button toolbar__button_redo" onClick={() => redo()}/>
            </section>
            <Stats/>
        </header>
    )
};

export default Header;