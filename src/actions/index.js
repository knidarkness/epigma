import * as uuid4 from 'uuid/v4'

export const createPath = (path) => ({
    type: 'CREATE_PATH',
    id: uuid4(),
    path
});

export const deletePath = (pathId) => ({
    type: 'DELETE_PATH',
    id: pathId
});

export const updatePath = (id, path) => ({
    type: 'UPDATE_PATH',
    id,
    path
});

export const changeZoom = (deltaZoom) => ({
    type: 'CHANGE_ZOOM',
    deltaZoom
});

export const shiftCanvas = (shiftX, shiftY) => ({
    type: 'SHIFT_CANVAS',
    shiftX,
    shiftY
});