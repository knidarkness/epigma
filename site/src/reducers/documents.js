const actionTypes = require('../actions/actionTypes');

//import {CREATE_DOCUMENT, DELETE_DOCUMENT, RENAME_DOCUMENT, ITEMS_FETCH_DATA_SUCCESS} from "../actions/actionTypes";


const illustration = (state, action) => {
    switch (action.type) {
        case actionTypes.CREATE_DOCUMENT:
            return {
                id: action.id,
                name: action.name,
                editedAt: action.editedAt
            };
        case actionTypes.DELETE_DOCUMENT:
            return null;
        case actionTypes.RENAME_DOCUMENT:
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
        case actionTypes.ITEMS_FETCH_DATA_SUCCESS:
            return [...action.items]
                .sort((a, b) => b.editedAt - a.editedAt);
        case actionTypes.CREATE_DOCUMENT:
            return [
                ...state,
                illustration(undefined, action)
            ]
                .sort((a, b) => b.editedAt - a.editedAt);
        case actionTypes.DELETE_DOCUMENT:
            return state
                .filter((d) => d.id !== action.id);
        case actionTypes.RENAME_DOCUMENT:
            return state
                .map(p => illustration(p, action))
                .sort((a, b) => b.editedAt - a.editedAt);
        default:
            return state;
    }
};

module.exports = documents;
//export default documents;