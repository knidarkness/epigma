import { combineReducers } from 'redux'
import paths from './paths';
import canvasMode from './canvasMode';
import edit from './edit';
import editedPath from './editedPath';
import documents from './documents';

const epigmaReducers = combineReducers({
    paths,
    canvasMode,
    edit,
    editedPath,
    documents
});

export default epigmaReducers;