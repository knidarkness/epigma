import React from 'react';

import DrawingArea from './DrawingArea';
import ToolbarMenu from './ToolbarMenu';

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
