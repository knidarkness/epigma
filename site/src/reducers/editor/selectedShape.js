import { combineReducers } from 'redux'
import * as actionTypes from '../../actions/actionTypes';

const nodes = (state = [], action) => {
    switch (action.type) {

        case actionTypes.SET_SELECTED_SHAPE:
            return action.nodes;
    
        case actionTypes.CLEAR_SELECTED_SHAPE:
            return [];

        case actionTypes.SELECTED_SHAPE_ADD_NODE:
            return [
                ...state,
                action.node,
            ];

        case actionTypes.SELECTED_SHAPE_INSERT_NODE:
            return [
                ...state.slice(0, action.index),
                action.node,
                ...state.slice(action.index)
            ];
    
        case actionTypes.SELECTED_SHAPE_DELETE_NODE:
            return state.filter((node, i) => i !== action.index);            
    
        case actionTypes.SELECTED_SHAPE_UPDATE_NODE:
            return state.map((node, i) => i !== action.index ? node : action.node );
            
        default:
            return state;
    }
};


const color = (state = '#000000', action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_SHAPE:
            return action.color

        case actionTypes.CLEAR_SELECTED_SHAPE:
            return '#000000'

        default:
            return state;
    }
};

const selectedShape = combineReducers({
    nodes,
    color
});
export default selectedShape;