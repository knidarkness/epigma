import { combineReducers } from 'redux'
import * as actionTypes from '../../actions/actionTypes';
import Matrix from '../../utils/matrix.js';


const viewMatrix = (state =  Matrix.identity(), action) => {
    switch (action.type) {
        case actionTypes.SHIFT_CANVAS:
            return state.translate(action.shiftX, action.shiftY)

        case actionTypes.ZOOM_TO:
            return state.scaleToPoint(action.point, action.zoom)

        case actionTypes.CHANGE_ZOOM:
            const center = [document.getElementById('canvas').getBoundingClientRect().width / 2, 
                            document.getElementById('canvas').getBoundingClientRect().height / 2];
            return state.scaleToPoint(center, action.zoom)
            
        default:
            return state;
    }
};


const zoom = (state = 1, action) => {
    switch (action.type) {
        case actionTypes.ZOOM_TO:
        case actionTypes.CHANGE_ZOOM:
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