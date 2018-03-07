export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_SHAPE':
            return {
                id: action.id,
                path: action.path,
                background: action.background
            };
        case 'REMOVE_SHAPE':
            if (state.id !== action.id) {
                return state;
            }
            return null;
    }
};
