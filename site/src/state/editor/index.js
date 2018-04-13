import { combineReducers } from 'redux';

import shapes from './shapes';
import mode from './mode';
import cursor from './cursor';
import selectedShape from './selectedShape';
import canvas from './canvas';

const editor = combineReducers({
    shapes,
    mode,
    selectedShape,
    canvas,
    cursor
});



export default editor;