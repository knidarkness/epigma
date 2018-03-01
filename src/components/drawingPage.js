import React from 'react';

import DrawingArea from './DrawingArea/DrawingArea';
import ToolbarMenu from './ToolbarMenu/ToolbarMenu';

import './drawingPage.scss';

export default class DrawingPage extends React.Component{
    constructor(props){
        super(props);
    }

    render () {
        return (
            <div>
                <ToolbarMenu/>
                <DrawingArea/>
            </div>
        )
    }
}
