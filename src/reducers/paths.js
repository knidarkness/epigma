import undoable, { includeAction } from 'redux-undo';


const path = (state, action) => {
    switch (action.type){
        case 'CREATE_PATH':
            return {
                id: action.id,
                path: action.path
            };
        case 'DELETE_PATH':
            if (state.id !== action.id) return state;
            else return null;
        case 'UPDATE_PATH':
            if (state.id !== action.id) return state;
            return {
                id: state.id,
                path: action.path
            }
    }
};

const paths = (state = [], action) => {
    switch (action.type){
        case 'CREATE_PATH':
            return [
                ...state,
                path(undefined, action)
            ];
        case 'DELETE_PATH':
            return state
                .filter(p => path(p, action) !== null);
        case 'UPDATE_PATH':
            return state
                .map(p => path(p, action));
        default:
            return state;
    }
};

//const undoablePaths = undoable(paths, {filter: includeAction(['CREATE_PATH', 'DELETE_PATH', 'UPDATE_PATH'])});

export default paths;