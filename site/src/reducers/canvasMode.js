const defaultState = {
    canvasShift: {
        x: 0,
        y: 0
    },
    zoom: 1
};

const canvasMode = (state = defaultState, action) => {
    switch (action.type){
        case 'SHIFT_CANVAS':
            return {
                canvasShift: {
                    x: state.canvasShift.x + action.shiftX,
                    y: state.canvasShift.y + action.shiftY
                },
                zoom: state.zoom
            };
        case 'CHANGE_ZOOM':
            return {
                canvasShift: {
                    x: state.canvasShift.x,
                    y: state.canvasShift.y
                },
                zoom: state.zoom + action.deltaZoom
            };
        default:
            return state;
    }
};

export default canvasMode;