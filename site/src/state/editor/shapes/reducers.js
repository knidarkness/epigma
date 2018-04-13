import * as types from './types';
import undoable, {includeAction} from 'redux-undo';

function shape(state, action) {
    switch (action.type) {
    case types.CREATE:
        return {
            id: action.id,
            nodes: action.nodes,
            color: action.color,
            strokeWidth: action.strokeWidth
        };

    case types.ADD_NODE:
        return {
            ...state,
            nodes: [...state.nodes, action.node]
        };

    case types.INSERT_NODE:
        return {
            ...state,
            nodes: [
                ...state.nodes.slice(0, action.index),
                action.node,
                ...state.nodes.slice(action.index)
            ]
        };
    
    case types.DELETE_NODE:
        return {
            ...state,
            nodes: state.nodes.filter((node, i) => i !== action.index)
        };            
    case types.UPDATE_NODE:
        return {
            ...state,
            nodes: state.nodes.map((node, i) => i !== action.index ? node : action.node)
        };
    
    default:
        return state; 
    }
}

export const shapes = (state = [], action) => {
    switch (action.type) {
    case types.FETCH_SUCCESS:
        return action.shapes;
    case types.CREATE:
        return [
            ...state,
            shape(undefined, action)
        ];
    case types.DELETE:
        return state.filter(p => p.id !== action.id);            
    case types.ADD_NODE:
    case types.INSERT_NODE:
    case types.DELETE_NODE:
    case types.UPDATE_NODE:
        return state.map(p => (p.id === action.id) ? shape(p, action) : p);
    case types.FETCH_FAILURE:
        console.log(action.error_msg);
        return state;

    default:
        return state;
    }
};


const undoableShapes = undoable(shapes, {
    filter: includeAction([
        types.CREATE,
        types.DELETE,
        types.ADD_NODE,
        types.INSERT_NODE,
        types.DELETE_NODE,
        types.UPDATE_NODE
    ])
});

export default undoableShapes;