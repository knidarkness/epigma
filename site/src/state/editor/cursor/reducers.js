import { combineReducers } from 'redux';
import * as types from './types';
import {CURSOR} from 'const';


export const icon = (state = CURSOR.VIEW, action) => {
    switch (action.type) {
    case types.ICON_UPDATE:
        return action.icon;
    default:
        return state;
    }
};


export const position = (state = [0, 0], action) => {
    switch (action.type) {
    case types.POSITION_UPDATE:
        return [action.x, action.y];
    default:
        return state;
    }
};


const cursor = combineReducers({
    position,
    icon
});

export default cursor;