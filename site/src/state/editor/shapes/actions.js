import uuid4 from 'uuid/v4';
import * as types from './types';

export const fetchShapesSuccess = (shapes) => ({
    type: types.FETCH_SUCCESS,
    shapes
});

export const fetchShapesFailure = () => ({
    type: types.FETCH_FAILURE
});

export const createShape = (id, nodes = [], color = 'black') => ({
    type: types.CREATE,
    id: id || uuid4(),
    nodes,
    color,
    strokeWidth: 2
});

export const deleteShape = (id) => ({
    type: types.DELETE,
    id
});


export const addShapeNode = (id, node) => ({
    type: types.ADD_NODE,
    id,
    node
});


export const deleteShapeNode = (id, index) => ({
    type: types.DELETE_NODE,
    id,
    index
});


export const insertShapeNode = (id, index, node) => ({
    type: types.INSERT_NODE,
    id,
    index,
    node
});


export const updateShapeNode = (id, index, node) => ({
    type: types.UPDATE_NODE,
    id,
    index,
    node
});
