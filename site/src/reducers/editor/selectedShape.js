import { combineReducers } from 'redux'
import * as actionTypes from '../../actions/actionTypes';

const selectedShape = (state = -1, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_SHAPE:
            return action.id;

        case actionTypes.CLEAR_SELECTED_SHAPE:
            return -1;

        default:
            return state;
    }
};


export default selectedShape;