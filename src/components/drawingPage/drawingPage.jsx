import React from 'react';

import HeaderMenu from './HeaderMenu/index.jsx';
import DrawingArea from './DrawingArea/DrawingCanvas.jsx';
import ComponentsSidebar from './ComponentsSidebar/ComponentsSidebar.jsx';

export default class DrawingPage extends React.Component{
    constructor(props){
        super(props);
    }

    render () {
        return ([
                <HeaderMenu/>,
                <ComponentsSidebar/>,
                <DrawingArea/>
            ])
    }
}
