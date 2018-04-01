import * as actionTypes from '../../actions/actionTypes';

//TODO: rename to defaultState
const defaultSelectedShape = {
    nodes: [],
    color: '#000000'
};

const selectedShape = (state = defaultSelectedShape, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_SHAPE:
            return {
                nodes: action.nodes,
                color: action.color
            };
        default:
            return state;
    }
};

export default selectedShape;