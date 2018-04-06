import {selectedShapeOperations} from "state/editor/selectedShape"
import {enableMode} from './actions'

const changeMode = (mode) => {
    return (dispatch) => {
        dispatch(enableMode(mode))
        dispatch(selectedShapeOperations.clearSelectedShape())
    };
}
export {
    changeMode
}