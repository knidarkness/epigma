import { combineReducers } from 'redux';
import documents from './documents';

const editor = combineReducers({
    documents,
});

export default editor;