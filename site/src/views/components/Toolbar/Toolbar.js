import React from 'react';
import {Link} from 'react-router-dom';
import Stats from 'views/containers/Stats'

import {EDITOR_MODE} from 'const';
import {getCenterPoint} from 'utils/utils';

import './Toolbar.scss'

const toggleMode = (curMode, mode) => mode == curMode ? EDITOR_MODE.SELECT : mode;

const incZoom = (zoom) => Math.max(zoom + 0.05, 0.5);
const decZoom = (zoom) => Math.max(zoom - 0.05, 0.5);

const Header = ({zoom, zoomCanvas, undo, redo, changeMode, mode}) => {
    return (
        <header className="toolbar">
            <Link to='/' className="toolbar__title">Ep</Link>
            <section className="toolbar__items">
                <button className={`toolbar__button toolbar__button_view ${(mode === EDITOR_MODE.VIEW) ? 'toolbar__button_active' : ''}`} onClick={() => changeMode(toggleMode(mode, EDITOR_MODE.VIEW))}/>
                <button className={`toolbar__button toolbar__button_edit ${(mode === EDITOR_MODE.DRAW) ? 'toolbar__button_active' : ''}`} onClick={() => changeMode(toggleMode(mode, EDITOR_MODE.DRAW))}/>
                <button className="toolbar__button toolbar__button_zoom-in" onClick={() => zoomCanvas(getCenterPoint('#canvas'), incZoom(zoom))}/>
                <button className="toolbar__button toolbar__button_zoom-out" onClick={() => zoomCanvas(getCenterPoint('#canvas'), decZoom(zoom))}/>
                <button className="toolbar__button toolbar__button_undo" onClick={() => undo()}/>
                <button className="toolbar__button toolbar__button_redo" onClick={() => redo()}/>
            </section>
            <Stats/>
        </header>
    )
};

export default Header;