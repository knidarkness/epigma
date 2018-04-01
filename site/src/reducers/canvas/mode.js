import * as actionTypes from '../../actions/actionTypes';
import {EDITOR_MODE} from '../../const';

const defaultState = EDITOR_MODE.VIEW;

const mode = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ENABLE_DRAW_MODE:
            return EDITOR_MODE.DRAW;
        case actionTypes.ENABLE_VIEW_MODE:
            return EDITOR_MODE.VIEW;
        case actionTypes.ENABLE_DELETE_MODE:
            return EDITOR_MODE.DELETE;
        default:
            return state;
    }
};

export default mode;