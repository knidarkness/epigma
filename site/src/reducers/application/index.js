import { combineReducers } from 'redux';
import documents from './documents';

const application = combineReducers({
    documents,
});

export default application;