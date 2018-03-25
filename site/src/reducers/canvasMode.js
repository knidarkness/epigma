import {MOVE_TO, SHIFT_CANVAS, CHANGE_ZOOM} from "../actions/actionTypes";

import mathjs from 'mathjs';

const defaultState = {
    left_corner: {
        x: 0,
        y: 0
    },
    zoom: 1,
    transformMatrix: mathjs.eye(3),
    width:0,
    height:0,

};

const translateMatrix = (x,y) => mathjs.matrix([[1, 0, x],
    [0, 1, y],
    [0, 0, 1]]);

const scaleMatrix = (s) => mathjs.matrix([[s, 0, 0],
    [0, s, 0],
    [0, 0, 1]]);

const canvasMode = (state = defaultState, action) => {
    switch (action.type){
        case MOVE_TO:
            return {
                canvasShift: {
                    x: action.shiftX,
                    y: action.shiftY
                },
                zoom: state.zoom
            };
        case SHIFT_CANVAS:
            return {
                left_corner: {
                    x: state.left_corner.x + action.shiftX,
                    y: state.left_corner.y + action.shiftY
                },
                zoom: state.zoom,
                transformMatrix: mathjs.multiply(state.transformMatrix,
                    translateMatrix(action.shiftX, action.shiftY))
            };
        case 'CHANGE_ZOOM':
            const newZoom = (state.zoom + action.zoom) > 0.5 ? (state.zoom + action.zoom) : 0.5;

            const inv = mathjs.inv(state.transformMatrix);
            const normalizedCursor = mathjs.multiply(inv, [action.cursorX,action.cursorY, 1])._data;

            const translateToCursor = translateMatrix(normalizedCursor[0], normalizedCursor[1]);

            let transformMatrix = mathjs.multiply(translateToCursor, scaleMatrix(newZoom));

            transformMatrix = mathjs.multiply(transformMatrix, translateMatrix(-normalizedCursor[0], -normalizedCursor[1]));
            return {
                zoom: newZoom,
                transformMatrix: transformMatrix
            };
        default:
            return state;
    }
};

export default canvasMode;