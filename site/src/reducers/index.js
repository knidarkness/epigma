import { combineReducers } from 'redux'
import editor from './editor';
import canvas from './canvas';

const epigmaReducers = combineReducers({
    canvas,
    editor,
});

export default epigmaReducers;