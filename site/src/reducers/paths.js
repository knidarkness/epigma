//import {CREATE_PATH, FETCH_PATHS, DELETE_PATH, UPDATE_PATH} from "../actions/actionTypes";
//import * as uuid from 'uuid/v4';
const actionTypes = require('../actions/actionTypes');
const uuid = require('uuid/v4');


function path(state, action) {
    switch (action.type){
        case actionTypes.CREATE_PATH:
            return {
                id: action.id,
                path: action.path,
                color: action.color
            };
        case actionTypes.DELETE_PATH:
            if (state.id !== action.id) return state;
            else return null;
        case  actionTypes.UPDATE_PATH:
            if (state.id !== action.id) return state;
            return {
                id: state.id,
                color: state.color,
                path: action.path
            }
    }
}

const paths = (state = [], action) => {
    switch (action.type){
        case actionTypes.FETCH_PATHS:
            return action.paths.map(shape => ({
                id: shape.id,
                path: shape.path,
                color: shape.color
            }));
        case  actionTypes.CREATE_PATH:
            return [
                ...state,
                path(undefined, action)
            ];
        case  actionTypes.DELETE_PATH:
            return state
                .filter((p, id) => {
                    return p.id !== action.id
                });
        case  actionTypes.UPDATE_PATH:
            return state
                .map(p => path(p, action));
        default:
            return state;
    }
};

//const undoablePaths = undoable(paths, {filter: includeAction(['CREATE_PATH', 'DELETE_PATH', 'UPDATE_PATH'])});

module.exports = paths;