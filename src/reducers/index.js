import { combineReducers } from 'redux'
import paths from './paths';
import canvasMode from './canvasMode';
import edit from './edit';
import editedPath from './editedPath';

const epigmaReducers = combineReducers({
    paths,
    canvasMode,
    edit,
    editedPath
});

export default epigmaReducers;