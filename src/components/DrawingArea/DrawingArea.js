import React from 'react';

import './DrawingArea.scss';
import removeDrawable from "../../action/removeDrawable";

export default class DrawingCanvas extends React.Component {
    renderFigures() {
        const {store} = this.props;

        return this.props.store.getState().shapes.map(figure => {
            return (
                <div key={figure.id} onClick={() => {
                    store.dispatch(removeDrawable(figure.id));
                }}>
                    {figure.path}
                </div>
            )
        });
    }

    render() {
        return (
            <div className="drawing-area">
                {this.renderFigures()}
            </div>
        )
    }
}