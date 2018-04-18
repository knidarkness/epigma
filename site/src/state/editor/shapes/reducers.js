import * as types from './types';
import undoable, { includeAction } from 'redux-undo';

export const shapes = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_SUCCESS:
            return action.shapes;
        case types.CREATE_SUCCESS:
        case types.UPDATE_SUCCESS:
            return [
                ...state,
                action.shape
            ];
        case types.DELETE_SUCCESS:
        case types.SELECT_SHAPE:
            return state.filter(p => p.id !== action.id);
        case types.FETCH_FAILURE:
        case types.CREATE_FAILURE:
        case types.DELETE_FAILURE:
        case types.UPDATE_FAILURE:
            console.log(action.err);
            return state;
        default:
            return state;
    }
};


const undoableShapes = undoable(shapes, {
    filter: includeAction([
        types.CREATE,
        types.DELETE
    ])
});

export default undoableShapes;