import { combineReducers } from 'redux'
import * as actionTypes from 'actions/actionTypes';

const selectedShape = (state = -1, action) => {
    switch (action.type) {

        case actionTypes.SELECTED_SHAPE_SET:
            return action.id;
    
        case actionTypes.SELECTED_SHAPE_CLEAR:
            return -1;
            
        default:
            return state;
    }
};

export default selectedShape;