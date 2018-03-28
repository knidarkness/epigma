const actionTypes = require('./../actions/actionTypes');
const editorModes = require('./../const');

const defaultState = editorModes.DRAW_MODE;

const editorMode = (state = defaultState, action) => {
    switch (action.type){
        case actionTypes.ENABLE_DRAW_MODE:
            return editorModes.DRAW_MODE;
        case actionTypes.ENABLE_VIEW_MODE:
            return editorModes.VIEW_MODE;
        case actionTypes.ENABLE_DELETE_MODE:
            return editorModes.DELETE_MODE;
        default:
            return state;
    }
};

module.exports = editorMode;