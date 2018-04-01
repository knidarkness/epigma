import { combineReducers } from 'redux'

import shapes from './shapes';
import edit from './edit';
import mode from './mode';
import selectedShape from './selectedShape';
import viewMatrix from './viewMatrix';

const canvas = combineReducers({
    shapes,
    edit,
    mode,
    selectedShape,
    viewMatrix
});



export default canvas;