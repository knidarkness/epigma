import * as types from './types';

const initialState = { nodes: [], strokeWidth: 2 };

const selectedShape = (state = initialState, action) => {
    switch (action.type) {

    case types.SET:
        return {
            ...action.shape
        };

    case types.CLEAR:
        return initialState;

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
        return (state.nodes.length === 2)
            ? state
            : {
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
};

export default selectedShape;