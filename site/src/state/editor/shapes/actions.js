import * as types from './types';

export const fetchShapesSuccess = (shapes) => ({
    type: types.FETCH_SUCCESS,
    shapes
});

export const fetchShapesFailure = (err) => ({
    type: types.FETCH_FAILURE,
    err
});

export const createShapeSuccess = (shape) => ({
    type: types.CREATE_SUCCESS,
    shape
});

export const createShapeFailure = (err) => ({
    type: types.CREATE_FAILURE,
    err
});

export const deleteShapeSuccess = (id) => ({
    type: types.DELETE_SUCCESS,
    id
});

export const deleteShapeFailure = (err) => ({
    type: types.DELETE_FAILURE,
    err
});

export const updateShapeSuccess = (shape) => ({
    type: types.UPDATE_SUCCESS,
    shape
});

export const updateShapeFailure = (err) => ({
    type: types.UPDATE_FAILURE,
    err
});

export const selectShape = (id) => ({
    type: types.SELECT_SHAPE,
    id
});