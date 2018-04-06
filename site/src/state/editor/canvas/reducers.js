import { combineReducers } from 'redux'
import Matrix from './utils/matrix.js';
import * as types from './types';

const viewMatrix = (state =  Matrix.identity(), action) => {
    switch (action.type) {
        case types.SHIFT:
            return state.translate(action.shiftX, action.shiftY)

        case types.ZOOM:
            return state.scaleToPoint(action.point, action.zoom)
           
        default:
            return state;
    }
};


const zoom = (state = 1, action) => {
    switch (action.type) {
        case types.ZOOM:
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