import React from 'react';

import './DrawingArea.scss';
import removeDrawable from "../../action/removeShape";

export default class DrawingCanvas extends React.Component {
    alertCoord () {
        if(this.props.store.getState().mode.appState === 'D_LINE'){
            alert('draw mode');
        }
    }

    renderPath(figure) {
        const path = figure.path;
        let pathLine = '';
        pathLine += `M${path[0].x} ${path[0].y}`;
        for (let i in path){
            pathLine += `L${path[i].x} ${path[i].y}`;
        }
        pathLine += ' Z';
        console.log(figure.background);
        return (<path className="shape" onDoubleClick={() => {this.props.store.dispatch(removeDrawable(figure.id));}} key={figure.id} d={pathLine} fill={figure.background} strokeWidth="2"/>);
    }

    renderFigures() {
        return this.props.store.getState().shapes.map(figure => {
            return this.renderPath(figure);
        });
    }

    render() {
        return (
            <svg className="drawing-area" onClick={() => this.alertCoord()}>
                {this.renderFigures()}
            </svg>
        )
    }
}