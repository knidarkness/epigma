import * as types from './types';
import {CURSOR} from 'const';


export const cursor = (state = CURSOR.VIEW, action) => {
    switch (action.type) {
        case types.ICON_UPDATE:
            return action.icon;
        default:
            return state;
    }
};

export default cursor;