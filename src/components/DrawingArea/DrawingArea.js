import React from 'react';

import FigureRectangle from '../FigureRectangle/FigureRectangle';

import './DrawingArea.scss';

export default class DrawingCanvas extends React.Component{
    render () {
        return (
            <div className="drawing-area">
                <FigureRectangle/>
            </div>
        )
    }
}