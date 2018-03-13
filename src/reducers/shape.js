const shape = (state = [], action) => {
    switch (action.type) {
        case 'SHAPE_CREATE':
            return {id: action.id}
        default:
            return state;
    }
};

export default shape;