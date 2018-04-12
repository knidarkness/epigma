import {selectedShapeOperations} from 'state/editor/selectedShape';
import {enableMode} from './actions';
import { updateCursorIcon } from 'state/editor/cursor/actions';
import { CURSOR } from 'const';

const changeMode = (mode) => {
    return (dispatch) => {
        dispatch(enableMode(mode));
        dispatch(updateCursorIcon(CURSOR[mode]));
        dispatch(selectedShapeOperations.clearSelectedShape());
    };
};
export {
    changeMode
};