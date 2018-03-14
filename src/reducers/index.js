import { combineReducers } from 'redux'
import paths from './paths';
import canvasMode from './canvasMode';

const epigmaReducers = combineReducers({
    paths,
    canvasMode
});

export default epigmaReducers;