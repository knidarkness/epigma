import React from 'react';

import './ToolbarMenu.scss';

export default class HeaderMenu extends React.Component{
    render () {
        return (
            <div className="toolbar-menu">
                <button className="toolbar-menu__tool">L</button>
                <button className="toolbar-menu__tool">R</button>
            </div>
        )
    }
}