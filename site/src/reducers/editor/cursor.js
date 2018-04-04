import { combineReducers } from 'redux'
import * as actionTypes from '../../actions/actionTypes';
import {CURSOR} from '../../const';


export const icon = (state = CURSOR.VIEW, action) => {
    switch (action.type) {
        case actionTypes.ENABLE_DRAW_MODE:
            return CURSOR.DRAW;
        case actionTypes.ENABLE_VIEW_MODE:        
            return CURSOR.VIEW;
        case actionTypes.ENABLE_EDIT_MODE:
            return CURSOR.EDIT;
        default:
            return state;
    }
};


export const position = (state = [0, 0], action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CURSOR_POSITION:
            return [action.x, action.y];
        default:
            return state;
    }
};


const cursor = combineReducers({
    position,
    icon
});

export default cursor;