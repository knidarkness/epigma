import { combineReducers } from 'redux'
import * as actionTypes from 'actions/actionTypes';
import Matrix from 'utils/matrix.js';

const viewMatrix = (state =  Matrix.identity(), action) => {
    switch (action.type) {
        case actionTypes.CANVAS_SHIFT:
            return state.translate(action.shiftX, action.shiftY)

        case actionTypes.CANVAS_ZOOM:
            return state.scaleToPoint(action.point, action.zoom)
           
        default:
            return state;
    }
};


const zoom = (state = 1, action) => {
    switch (action.type) {
        case actionTypes.CANVAS_ZOOM:
            return action.zoom
        default:
            return state;
    }
};
const canvas = combineReducers({
    zoom,
    viewMatrix
});

export default canvas;