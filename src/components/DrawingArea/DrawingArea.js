import React from 'react';

import './DrawingArea.scss';
import removeDrawable from "../../action/removeDrawable";

export default class DrawingCanvas extends React.Component {
    renderFigures() {
        const {store} = this.props;

        return this.props.store.getState().drawables.map(figure => {
            return (
                <div key={figure.id} onClick={() => {
                    if (confirm(`Are you sure you want to remove the ${figure.shapeType}?`)) {
                        store.dispatch(removeDrawable(figure.id));
                    }
                }}>
                    {figure.shapeType}
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