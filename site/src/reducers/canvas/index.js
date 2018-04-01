import { combineReducers } from 'redux'

import shapes from './shapes';
import edit from './edit';
import mode from './mode';
import cursor from './cursor';
import selectedShape from './selectedShape';
import viewMatrix from './viewMatrix';

const canvas = combineReducers({
    shapes,
    edit,
    mode,
    selectedShape,
    viewMatrix,
    cursor
});



export default canvas;