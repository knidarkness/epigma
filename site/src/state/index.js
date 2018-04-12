import { combineReducers } from 'redux';
import application from './application';
import editor from './editor';

export default combineReducers({
    editor,
    application
});