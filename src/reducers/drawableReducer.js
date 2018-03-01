export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_DRAWABLE':
            return {
                id: action.id,
                shapeType: action.shapeType,
            };
        case 'REMOVE_DRAWABLE':
            if (state.id !== action.id) {
                return state;
            }
            return null;
    }
};