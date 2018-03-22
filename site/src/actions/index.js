import * as uuid4 from 'uuid/v4'

export const createPath = (path, color = 'black') => ({
    type: 'CREATE_PATH',
    id: uuid4(),
    path,
    color
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

export const setEditedPath = (path, color = '#000000') => ({
   type: 'SET_EDITED_PATH',
   path: path,
   color: color
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

export const moveTo = (shiftX, shiftY) => ({
    type: 'MOVE_TO',
    shiftX,
    shiftY
});

export const createDocument = (id, name, editedAt) => ({
    type: 'CREATE_DOCUMENT',
    id,
    name,
    editedAt
});

export const deleteDocument = (id) => ({
    type: 'DELETE_DOCUMENT',
    id
});

export const renameDocument = (id, name) => ({
    type: 'RENAME_DOCUMENT',
    id,
    name
});

export const editOn = () => ({
    type: 'EDIT_ON'
});

export const editOff = () => ({
    type: 'EDIT_OFF'
});

export const editToggle = () => ({
    type: 'TOGGLE_EDIT'
});