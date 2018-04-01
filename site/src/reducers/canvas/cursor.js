import * as actionTypes from '../../actions/actionTypes';
import {EDITOR_MODES, CURSOR} from '../../const';

const defaultState = CURSOR.DRAW;
const cursor = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ENABLE_DRAW_MODE:
            return CURSOR.DRAW;
        case actionTypes.ENABLE_DELETE_MODE:
            return CURSOR.DELETE;
        case actionTypes.ENABLE_VIEW_MODE:        
            return CURSOR.VIEW;
        case actionTypes.ENABLE_EDIT_MODE:       
            return CURSOR.EDIT;
        default:
            return state;
    }
};

export default cursor;