import * as types from './types';
export const setSelectedShape = (shape) => ({
    type: types.SET,
    shape
});

export const clearSelectedShape = () => ({
    type: types.CLEAR
});

export const addSelectedShapeNode = (node) => ({
    type: types.ADD_NODE,
    node
});

export const deleteSelectedShapeNode = (index) => ({
    type: types.DELETE_NODE,
    index
});


export const insertSelectedShapeNode = (index, node) => ({
    type: types.INSERT_NODE,
    index,
    node
});


export const updateSelectedShapeNode = (index, node) => ({
    type: types.UPDATE_NODE,
    index,
    node
});
