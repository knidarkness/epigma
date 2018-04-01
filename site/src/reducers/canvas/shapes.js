import * as actionTypes from '../../actions/actionTypes';
import undoable, {includeAction} from 'redux-undo'

function shape(state, action) {
    switch (action.type) {
        case actionTypes.CREATE_SHAPE:
            return {
                id: action.id,
                nodes: action.nodes,
                color: action.color
            };
        case actionTypes.DELETE_SHAPE:
            if (state.id !== action.id) return state;
            else return null;
        case  actionTypes.UPDATE_SHAPE:
            if (state.id !== action.id) return state;
            return {
                id: state.id,
                color: state.color,
                nodes: action.nodes
            }
    }
}

export const shapes = (state = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_SHAPES:
            return action.shapes.map(shape => ({
                id: shape.id,
                nodes: shape.nodes,
                color: shape.color
            }));
        case  actionTypes.CREATE_SHAPE:
            return [
                ...state,
                shape(undefined, action)
            ];
        case  actionTypes.DELETE_SHAPE:
            return state
                .filter(p => {
                    return p.id !== action.id
                });
        case  actionTypes.UPDATE_SHAPE:
            return state
                .map(p => shape(p, action));
        default:
            return state;
    }
};


const undoableShapes = undoable(shapes, {filter: includeAction([actionTypes.CREATE_SHAPE, actionTypes.UPDATE_SHAPE, actionTypes.DELETE_SHAPE])});

export default undoableShapes;