import * as types from './types';

const selectedShape = (state = -1, action) => {
    switch (action.type) {

    case types.SET:
        return action.id;
    
    case types.CLEAR:
        return -1;
            
    default:
        return state;
    }
};

export default selectedShape;