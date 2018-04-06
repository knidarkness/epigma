import * as actionTypes from 'actions/actionTypes';

const illustration = (state, action) => {
    switch (action.type) {
        case actionTypes.DOCUMENT_CREATE_SUCCESS:
            return {
                id: action.id,
                name: action.name,
                editedAt: action.editedAt
            };
        case actionTypes.DOCUMENT_UPDATE_SUCCESS:
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
        case actionTypes.DOCUMENTS_FETCH_SUCCESS:
            return action.documents.sort((a, b) => b.editedAt - a.editedAt);
        case actionTypes.DOCUMENT_CREATE_SUCCESS:
            return [
                ...state,
                illustration(undefined, action)
            ].sort((a, b) => b.editedAt - a.editedAt);
        case actionTypes.DOCUMENT_DELETE_SUCCESS:
            return state
                .filter((d) => d.id !== action.id);
        case actionTypes.DOCUMENT_UPDATE_SUCCESS:
            return state
                .map(d => d.id === action.id ? illustration(d, action) : d)
                .sort((a, b) => b.editedAt - a.editedAt);
        case actionTypes.DOCUMENTS_FETCH_FAILURE:
        case actionTypes.DOCUMENT_CREATE_FAILURE:
        case actionTypes.DOCUMENT_DELETE_FAILURE:
        case actionTypes.DOCUMENT_UPDATE_FAILURE:
            console.log(action.error_msg)
            return state
        default:
            return state;
    }
};

export default documents;