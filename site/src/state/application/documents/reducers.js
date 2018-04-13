import * as types from './types';

const illustration = (state, action) => {
    switch (action.type) {
    case types.DOCUMENT_CREATE_SUCCESS:
        return {
            id: action.id,
            name: action.name,
            editedAt: action.editedAt
        };
    case types.DOCUMENT_UPDATE_SUCCESS:
        return {
            id: state.id,
            name: action.name,
            editedAt: action.editedAt
        };
    default: 
        return state;
    }
};

const documents = (state=[], action) => {
    switch (action.type) {
    case types.DOCUMENTS_FETCH_SUCCESS:
        return action.documents.sort((a, b) => b.editedAt - a.editedAt);
    case types.DOCUMENT_CREATE_SUCCESS:
        return [
            ...state,
            illustration(undefined, action)
        ].sort((a, b) => b.editedAt - a.editedAt);
    case types.DOCUMENT_DELETE_SUCCESS:
        return state
            .filter((d) => d.id !== action.id);
    case types.DOCUMENT_UPDATE_SUCCESS:
        return state
            .map(d => d.id === action.id ? illustration(d, action) : d)
            .sort((a, b) => b.editedAt - a.editedAt);
    case types.DOCUMENTS_FETCH_FAILURE:
    case types.DOCUMENT_CREATE_FAILURE:
    case types.DOCUMENT_DELETE_FAILURE:
    case types.DOCUMENT_UPDATE_FAILURE:
        console.log(action.error_msg);
        return state;
    default:
        return state;
    }
};

export default documents;