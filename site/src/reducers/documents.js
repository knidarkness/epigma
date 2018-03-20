const illustration = (state, action) => {
    switch (action.type) {
        case 'CREATE_DOCUMENT':
            return {
                id: action.id,
                name: action.name,
                editedAt: Date.now()
            };
        case 'DELETE_DOCUMENT':
            return null;
        case 'RENAME_DOCUMENT':
            return {
                id: state.id,
                name: action.name,
                editedAt: Date.now()
            };
    }
};

const documents = (state=[], action) => {
    switch (action.type){
        case 'CREATE_DOCUMENT':
            return [
                ...state,
                illustration(undefined, action)
            ];
        case 'DELETE_DOCUMENT':
            return state
                .filter((d) => d.id !== action.id);
        case 'RENAME_DOCUMENT':
            return state
                .map(p => illustration(p, action));
        default:
            return state;
    }
};

export default documents;