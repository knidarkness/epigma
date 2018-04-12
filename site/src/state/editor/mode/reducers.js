import * as types from './types';
import {EDITOR_MODE} from 'const';
const mode = (state = EDITOR_MODE.SELECT, action) => {
    switch (action.type) {
    case types.ENABLE:
        return action.mode;
    default:
        return state;
    }
};

export default mode;