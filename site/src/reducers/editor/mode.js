import * as actionTypes from '../../actions/actionTypes';
import {EDITOR_MODE} from '../../const';

const mode = (state = EDITOR_MODE.VIEW, action) => {
    switch (action.type) {
        case actionTypes.ENABLE_DRAW_MODE:
            return EDITOR_MODE.DRAW;
        case actionTypes.ENABLE_VIEW_MODE:
            return EDITOR_MODE.VIEW;
        case actionTypes.ENABLE_EDIT_MODE:
            return EDITOR_MODE.EDIT;
        default:
            return state;
    }
};

export default mode;