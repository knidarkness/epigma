import {createStore, combineReducers} from 'redux';
import shapeReducer from './shapes';

const shapes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SHAPE':
            return [
                ...state,
                shapeReducer(undefined, action)
            ];
        case 'REMOVE_SHAPE':
            return state
                .map(t => shapeReducer(t, action))
                .filter(el => el !== null);
        default:
            return state;
    }
};

const mode = (state = [], action) => {
  switch (action.type){
      case 'TOGGLE_DRAW_LINE':
          if (state === 'DRAW_LINE'){
              return 'OVERVIEW'
          } else {
              return 'DRAW_LINE'
          }
      case 'TOGGLE_DRAW_RECT':
          return 'DRAW_RECT';
      default:
          return state;
  }
};


const eventApp = combineReducers({
    shapes,
    mode
});

export const store = createStore(eventApp);
