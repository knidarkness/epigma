import uuid4 from "uuid/v4";
import * as actionTypes from "./actionTypes";



export const zoomCanvas = (point, zoom) => ({
    type: actionTypes.CANVAS_ZOOM,
    point,
    zoom
});


export const shiftCanvas = (shiftX, shiftY) => ({
    type: actionTypes.CANVAS_SHIFT,
    shiftX,
    shiftY
});



export const updateCursorPosition = (x, y) => ({
    type: actionTypes.CURSOR_POSITION_UPDATE,
    x,
    y
});