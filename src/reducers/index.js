import {combineReducers} from 'redux';
import mode from './mode';
import shapes from './shapes';

const editorApp = combineReducers({shapes, mode});
export default editorApp;