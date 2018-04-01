import * as actionTypes from '../../actions/actionTypes';
import {EDITOR_MODES} from '../../const';

const defaultState = EDITOR_MODES.VIEW_MODE;

const mode = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ENABLE_DRAW_MODE:
            return EDITOR_MODES.DRAW_MODE;
        case actionTypes.ENABLE_VIEW_MODE:
            return EDITOR_MODES.VIEW_MODE;
        case actionTypes.ENABLE_DELETE_MODE:
            return EDITOR_MODES.DELETE_MODE;
        default:
            return state;
    }
};

export default mode;