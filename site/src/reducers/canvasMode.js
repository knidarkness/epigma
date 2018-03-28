const actionTypes = require('./../actions/actionTypes');
const mathjs = require('mathjs');

const defaultState = {
    zoom: 1,
    transformMatrix: mathjs.eye(3)
};

const translateMatrix = (x,y) => mathjs.matrix([[1, 0, x],
                                                [0, 1, y],
                                                [0, 0, 1]]);

const scaleMatrix = (sx, sy) => mathjs.matrix([[sx, 0, 0],
                                               [0, sy, 0],
                                               [0, 0, 1]]);

const canvasMode = (state = defaultState, action) => {
    switch (action.type){
        case actionTypes.SHIFT_CANVAS:
            return {
                zoom: state.zoom,
                transformMatrix: mathjs.multiply(state.transformMatrix,
                    translateMatrix(action.shiftX, action.shiftY))
            };
        case actionTypes.CHANGE_ZOOM:
            const newZoom = Math.max(state.zoom + action.zoom, 0.5);
    
            const inv = mathjs.inv(state.transformMatrix);
            const normalizedCursor = mathjs.multiply(inv, [action.cursorX,action.cursorY, 1])._data;

            let transformMatrix = translateMatrix(action.cursorX,action.cursorY);
                transformMatrix = mathjs.multiply(transformMatrix, scaleMatrix(newZoom, newZoom));
                transformMatrix = mathjs.multiply(transformMatrix, translateMatrix(-normalizedCursor[0], -normalizedCursor[1]));
            return {
                zoom: newZoom,
                transformMatrix: transformMatrix
            };
        default:
            return state;
    }
};

module.exports = canvasMode;