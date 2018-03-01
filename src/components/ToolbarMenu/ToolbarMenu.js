import React from 'react';

import './ToolbarMenu.scss';
import createDrawable from "../../helpers/createDrawable";


export default class HeaderMenu extends React.Component{
    render () {
        const {store} = this.props;

        return (
            <div className="toolbar-menu">
                <button className="toolbar-menu__tool" onClick={() => {
                    store.dispatch(createDrawable('line'));
                }}>L</button>
                <button className="toolbar-menu__tool" onClick={() => {
                    store.dispatch(createDrawable('rectangle'));
                }}>R</button>
            </div>
        )
    }
}