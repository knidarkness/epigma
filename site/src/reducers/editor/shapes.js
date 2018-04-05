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

        case actionTypes.SHAPE_ADD_NODE:
            return {
                ...state,
                nodes: [...state.nodes, action.node]
            };

        case actionTypes.SHAPE_INSERT_NODE:
            return {
                ...state,
                nodes: [
                    ...state.nodes.slice(0, action.index),
                    action.node,
                    ...state.nodes.slice(action.index)
                ]
            };
    
        case actionTypes.SHAPE_DELETE_NODE:
            return {
                ...state,
                nodes: state.nodes.filter((node, i) => i !== action.index)
            }            
        case actionTypes.SHAPE_UPDATE_NODE:
            return {
                ...state,
                nodes: state.nodes.map((node, i) => i !== action.index ? node : action.node)
            }

        default:
            return state; 
    }
}

export const shapes = (state = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_SHAPES:
            return action.shapes;
        case actionTypes.CREATE_SHAPE:
            return [
                ...state,
                shape(undefined, action)
            ];
        case actionTypes.DELETE_SHAPE:
            return state.filter(p => p.id !== action.id);
        case actionTypes.SHAPE_ADD_NODE:
        case actionTypes.SHAPE_INSERT_NODE:
        case actionTypes.SHAPE_DELETE_NODE:
        case actionTypes.SHAPE_UPDATE_NODE:
            return state.map(p => (p.id === action.shape_id) ? shape(p, action) : p);
        default:
            return state;
    }
};


const undoableShapes = undoable(shapes, {
    filter: includeAction([
        actionTypes.CREATE_SHAPE,
        actionTypes.UPDATE_SHAPE,
        actionTypes.SHAPE_ADD_NODE,
        actionTypes.SHAPE_INSERT_NODE,
        actionTypes.DELETE_SHAPE,
        actionTypes.SHAPE_UPDATE_NODE
    ])
});

export default undoableShapes;