import shape from './shape';
const shapes = (state = [], action) => {
    switch (action.type) {
        case 'SHAPE_CREATE':
            return [
                ...state,
                shape(undefined, action)
            ];
        case 'SHAPE_REMOVE':
            return state.filter(el => el.id !== action.id);
        default:
            return state;
    }
};

export default shapes;