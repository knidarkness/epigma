const actionTypes = require('./../actions/actionTypes');
const mathjs = require('mathjs');

const defaultState = {
    zoom: 1,
    viewMatrix: mathjs.eye(3)
};

const translateMatrix = (x,y) => mathjs.matrix([[1, 0, x],
                                                [0, 1, y],
                                                [0, 0, 1]]);

const scaleMatrix = (sx, sy) => mathjs.matrix([[sx, 0, 0],
                                               [0, sy, 0],
                                               [0, 0, 1]]);

const scaleToPointMatrix = (s, x, y, curViewMatrix) => {
    const normalizedPoint = mathjs.multiply(mathjs.inv(curViewMatrix), [x, y, 1])._data;

    let viewMatrix = translateMatrix(x, y);
        viewMatrix = mathjs.multiply(viewMatrix, scaleMatrix(s, s));
        viewMatrix = mathjs.multiply(viewMatrix, translateMatrix(-normalizedPoint[0], -normalizedPoint[1]));
    return viewMatrix
}

const canvasMode = (state = defaultState, action) => {
    let newZoom;
    switch (action.type){
        case actionTypes.SHIFT_CANVAS:
            return {
                zoom: state.zoom,
                viewMatrix: mathjs.multiply(state.viewMatrix,
                    translateMatrix(action.shiftX, action.shiftY))
            };
        case actionTypes.ZOOM_TO:
            newZoom = Math.max(state.zoom + action.zoom, 0.5);
            return {
                zoom: newZoom,
                viewMatrix: scaleToPointMatrix(newZoom, action.cursorX, action.cursorY, state.viewMatrix)
            };

        case actionTypes.CHANGE_ZOOM:
            newZoom = Math.max(state.zoom + action.zoom, 0.5);
            const centerX = document.getElementById('canvas').getBoundingClientRect().width / 2; 
            const centerY = document.getElementById('canvas').getBoundingClientRect().height / 2;
            return {
                zoom: newZoom,
                viewMatrix: scaleToPointMatrix(newZoom, centerX, centerY, state.viewMatrix)
            };
        default:
            return state;
    }
};

module.exports = canvasMode;