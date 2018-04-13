import * as types from './types';

const selectedShape = (state = '', action) => {
    switch (action.type) {

    case types.SET:
        return action.id;
    
    case types.CLEAR:
        return '';

            
    default:
        return state;
    }
};

export default selectedShape;