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
      case 'TOGGLE_D_LINE':
          if (state.appState === 'D_LINE'){
              return {appState: 'OVERVIEW'}
          } else {
              return {appState: 'D_LINE'}
          }
      case 'TOGGLE_D_RECT':
          return {appState: 'D_RECT'};
      default:
          return state;
  }
};


const eventApp = combineReducers({
    shapes,
    mode
});

export const store = createStore(eventApp);