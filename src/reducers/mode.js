const mode = (state = [], action) => {
    switch (action.type) {
        case 'CHANGE_MODE':
            return {mode: action.mode}
        default:
            return state;
    }
};
export default mode;