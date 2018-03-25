import {SET_EDITED_PATH} from "../actions/actionTypes";

const defaultEditedPath = {
    path: [],
    color: '#000000'
};

const editedPath = (state = defaultEditedPath, action) => {
    switch (action.type){
        case SET_EDITED_PATH:
            return {
                path: action.path,
                color: action.color
            };
        default:
            return state;
    }
};

export default editedPath;