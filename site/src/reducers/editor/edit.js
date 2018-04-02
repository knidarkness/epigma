import * as actionTypes from '../../actions/actionTypes';

const editMode = (state = false, action) => {
    switch (action.type) {
        case actionTypes.EDIT_ON:
            return true;
        case actionTypes.EDIT_OFF:
            return false;
        case actionTypes.TOGGLE_EDIT:
            return !state;
        default:
            return state;
    }
};

export default editMode;