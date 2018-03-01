export default (state=[], action) => {
  switch (action.type){
      case 'CREATE':
          return [...state, action.drawableComponent];
      case 'DELETE':
          return [...state.slice(0, action.index), ...state.slice(action.index + 1, state.length)]
  }
};