const editMode = (state = false, action) => {
    switch (action.type){
        case 'EDIT_ON':
            return true;
        case 'EDIT_OFF':
            return false;
        case 'TOGGLE_EDIT':
            return !state;
        default:
            return state;
    }
};

export default editMode;