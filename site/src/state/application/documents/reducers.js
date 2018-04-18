import * as types from './types';

const illustration = (state, action) => {
    switch (action.type) {
        case types.CREATE_SUCCESS:
            return {
                id: action.id,
                name: action.name,
                editedAt: action.editedAt
            };
        case types.UPDATE_SUCCESS:
            return {
                id: state.id,
                name: action.name,
                editedAt: action.editedAt
            };
        default:
            return state;
    }
};

const documents = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_SUCCESS:
            return action.documents.sort((a, b) => b.editedAt - a.editedAt);
        case types.CREATE_SUCCESS:
            return [
                ...state,
                illustration(undefined, action)
            ].sort((a, b) => b.editedAt - a.editedAt);
        case types.DELETE_SUCCESS:
            return state
                .filter((d) => d.id !== action.id);
        case types.UPDATE_SUCCESS:
            return state
                .map(d => d.id === action.id ? illustration(d, action) : d)
                .sort((a, b) => b.editedAt - a.editedAt);
        case types.FETCH_FAILURE:
        case types.CREATE_FAILURE:
        case types.DELETE_FAILURE:
        case types.UPDATE_FAILURE:
            console.log(action.err);
            return state;
        default:
            return state;
    }
};

export default documents;