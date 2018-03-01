import {createStore, combineReducers} from 'redux';
import drawableReducer from './drawableReducer';

export const drawables = (state = [], action) => {
    switch (action.type) {
        case 'ADD_DRAWABLE':
            return [
                ...state,
                drawableReducer(undefined, action)
            ];
        case 'REMOVE_DRAWABLE':
            return state
                .map(t => drawableReducer(t, action))
                .filter(el => el !== null);
        default:
            return state;
    }
};


const eventApp = combineReducers({
    drawables
});

export const store = createStore(eventApp);