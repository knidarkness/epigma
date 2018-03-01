import React from 'react';

import DrawingArea from './DrawingArea/DrawingArea';
import ToolbarMenu from './ToolbarMenu/ToolbarMenu';

import './drawingPage.scss';

export default class DrawingPage extends React.Component{
    render () {
        const {store} = this.props;
        return (
            <div>
                <ToolbarMenu store={store}/>
                <DrawingArea store={store}/>
            </div>
        )
    }
}
