import * as types from './types';

export const createDocumentSuccess = (id, name, editedAt) => ({
    type: types.CREATE_SUCCESS,
    id,
    name,
    editedAt
});

export const createDocumentFailure = (err) => ({
    type: types.CREATE_FAILURE,
    err
});


export const deleteDocumentSuccess = (id) => ({
    type: types.DELETE_SUCCESS,
    id
});

export const deleteDocumentFailure = (err) => ({
    type: types.DELETE_FAILURE,
    err
});

export const updateDocumentSuccess = (id, name, editedAt) => ({
    type: types.UPDATE_SUCCESS,
    id,
    name,
    editedAt
});

export const updateDocumentFailure = (err) => ({
    type: types.UPDATE_FAILURE,
    err
});

export const fetchDocumentsSuccess = (documents) => ({
    type: types.FETCH_SUCCESS,
    documents
});

export const fetchDocumentsFailure = (err) => ({
    type: types.FETCH_FAILURE,
    err
});
