import React from 'react';

import './DrawingArea.scss';
import removeDrawable from "../../helpers/removeDrawable";

export default class DrawingCanvas extends React.Component {
    renderFigures() {
        const {store} = this.props;

        return this.props.store.getState().drawables.map(figure => {
            return (
                <div key={figure.id} onClick={() => {
                    store.dispatch(removeDrawable(figure.id));
                    console.log(store.getState().drawables);
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