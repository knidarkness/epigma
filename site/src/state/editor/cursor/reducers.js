import { combineReducers } from 'redux'
import * as modeTypes from 'state/editor/mode/types';
import * as types from './types';
import {CURSOR, EDITOR_MODE} from 'const';


export const icon = (state = CURSOR.VIEW, action) => {
    
    switch (action.type) {
        case modeTypes.ENABLE:
            switch(action.mode) {
                case EDITOR_MODE.DRAW:
                    return CURSOR.DRAW;
                case EDITOR_MODE.VIEW:        
                    return CURSOR.VIEW;
                case EDITOR_MODE.EDIT:
                    return CURSOR.EDIT;
                default:
                    return EDITOR_MODE.DEFAULT;
            }
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