import React from 'react';

import FigureRectangle from './FigureRectangle';

export default class DrawingCanvas extends React.Component{
    render () {
        return (
            <div>
                <p>Drawing canvas</p>
                <ul>
                    <FigureRectangle/>
                    <FigureRectangle/>
                    <FigureRectangle/>
                </ul>
            </div>
        )
    }
}