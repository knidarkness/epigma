import React from 'react';

import DrawingArea from './DrawingArea/DrawingArea';
import ToolbarMenu from './ToolbarMenu/ToolbarMenu';

import './drawingPage.scss';

export default (props) => (
    <div>
        <ToolbarMenu store={props.store}/>
        <DrawingArea store={props.store}/>
    </div>
)

