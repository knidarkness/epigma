import * as actionTypes from '../../actions/actionTypes';
import Matrix from '../../utils/matrix.js';

const defaultState = {
    zoom: 1,
    viewMatrix: Matrix.identity()
};


const viewMatrix = (state = defaultState, action) => {
    let newZoom;
    switch (action.type) {
        case actionTypes.SHIFT_CANVAS:
            return {
                zoom: state.zoom,
                viewMatrix: state.viewMatrix.translate(action.shiftX, action.shiftY)
            };
        case actionTypes.ZOOM_TO:
            newZoom = Math.max(state.zoom + action.zoom, 0.5);
            return {
                zoom: newZoom,
                viewMatrix: state.viewMatrix.scaleToPoint(newZoom, action.cursorX, action.cursorY)
            };

        case actionTypes.CHANGE_ZOOM:
            newZoom = Math.max(state.zoom + action.zoom, 0.5);
            const centerX = document.getElementById('canvas').getBoundingClientRect().width / 2; 
            const centerY = document.getElementById('canvas').getBoundingClientRect().height / 2;
            return {
                zoom: newZoom,
                viewMatrix: state.viewMatrix.scaleToPoint(newZoom, centerX, centerY)
            };
        default:
            return state;
    }
};

export default viewMatrix;