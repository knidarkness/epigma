import * as actionTypes from 'actions/actionTypes';
import {EDITOR_MODE} from 'const';

const mode = (state = EDITOR_MODE.VIEW, action) => {
    switch (action.type) {
        case actionTypes.MODE_ENABLE:
            return action.mode;
        default:
            return state;
    }
};

export default mode;