import {createStore, combineReducers} from 'redux';
import drawableReducer from './shapes';

const shapes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SHAPE':
            return [
                ...state,
                drawableReducer(undefined, action)
            ];
        case 'REMOVE_SHAPE':
            return state
                .map(t => drawableReducer(t, action))
                .filter(el => el !== null);
        default:
            return state;
    }
};


const eventApp = combineReducers({
    shapes
});

export const store = createStore(eventApp);