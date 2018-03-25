import {CREATE_DOCUMENT, DELETE_DOCUMENT, RENAME_DOCUMENT, ITEMS_FETCH_DATA_SUCCESS} from "../actions/actionTypes";

const illustration = (state, action) => {
    switch (action.type) {
        case CREATE_DOCUMENT:
            return {
                id: action.id,
                name: action.name,
                editedAt: action.editedAt
            };
        case DELETE_DOCUMENT:
            return null;
        case RENAME_DOCUMENT:
            if (state.id === action.id){
                return {
                    id: state.id,
                    name: action.name,
                    editedAt: action.editedAt
                };
            } else {
                return state;
            }
    }
};

const documents = (state=[], action) => {
    switch (action.type){
        case ITEMS_FETCH_DATA_SUCCESS:
            return [...action.items]
                .sort((a, b) => b.editedAt - a.editedAt);
        case CREATE_DOCUMENT:
            return [
                ...state,
                illustration(undefined, action)
            ]
                .sort((a, b) => b.editedAt - a.editedAt);
        case DELETE_DOCUMENT:
            return state
                .filter((d) => d.id !== action.id);
        case RENAME_DOCUMENT:
            return state
                .map(p => illustration(p, action))
                .sort((a, b) => b.editedAt - a.editedAt);
        default:
            return state;
    }
};

export default documents;