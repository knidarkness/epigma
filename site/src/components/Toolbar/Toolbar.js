import React from 'react';
import {Link} from 'react-router-dom';
import Stats from './../../containers/Stats'

import {DRAW_MODE, VIEW_MODE, DELETE_MODE} from './../../const';

import './Toolbar.scss'

const Header = ({zoom, changeZoom, undo, redo, enableViewMode, enableDrawMode, editorMode, enableDeleteMode}) => (
    <header className="toolbar">
        <Link to='/' className="toolbar__title">Ep</Link>
        <section className="toolbar__items">
            <button className={`toolbar__button toolbar__button_view ${(editorMode === VIEW_MODE) ? 'toolbar__button_active' : ''}`}  onClick={() => enableViewMode()}/>
            <button className={`toolbar__button toolbar__button_edit ${(editorMode === DRAW_MODE) ? 'toolbar__button_active' : ''}`}  onClick={() => enableDrawMode()}/>
            <button className={`toolbar__button toolbar__button_delete ${(editorMode === DELETE_MODE) ? 'toolbar__button_active' : ''}`}  onClick={() => enableDeleteMode()}/>
            <button className="toolbar__button toolbar__button_zoom-in"  onClick={() => changeZoom(0.05)}/>
            <button className="toolbar__button toolbar__button_zoom-out"  onClick={() => changeZoom(-0.05)}/>
            <button className="toolbar__button toolbar__button_undo"  onClick={() => undo()}/>
            <button className="toolbar__button toolbar__button_redo"  onClick={() => redo()}/>
        </section>
        <Stats/>
    </header>
);

export default Header;