
import * as types from './types';

export const zoomCanvas = (point, zoom) => ({
    type: types.ZOOM,
    point,
    zoom
});

export const shiftCanvas = (shiftX, shiftY) => ({
    type: types.SHIFT,
    shiftX,
    shiftY
});
