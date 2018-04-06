import * as actionTypes from "./actionTypes";
import {clearSelectedShape} from "./shape"
export const changeMode = (mode) => {
    return (dispatch) => {
        dispatch(enableMode(mode))
        dispatch(clearSelectedShape())
    };
}

export const enableMode = (mode) => {
    return {
        type: actionTypes.MODE_ENABLE,
        mode
    };
};