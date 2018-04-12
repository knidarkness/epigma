import * as types from './types';

export const createDocumentSuccess = (id, name, editedAt) => ({
    type: types.DOCUMENT_CREATE_SUCCESS,
    id,
    name,
    editedAt
});

export const createDocumentFailure = (error_msg) => ({
    type: types.DOCUMENT_CREATE_FAILURE,
    error_msg
});


export const deleteDocumentSuccess = (id) => ({
    type: types.DOCUMENT_DELETE_SUCCESS,
    id
});

export const deleteDocumentFailure = (error_msg) => ({
    type: types.DOCUMENT_DELETE_FAILURE,
    error_msg
});

export const updateDocumentSuccess = (id, name, editedAt) => ({
    type: types.DOCUMENT_UPDATE_SUCCESS,
    id,
    name,
    editedAt
});

export const updateDocumentFailure = (error_msg) => ({
    type: types.DOCUMENT_UPDATE_FAILURE,
    error_msg
});

export const fetchDocumentsSuccess = (documents) => ({
    type: types.DOCUMENTS_FETCH_SUCCESS,
    documents
});

export const fetchDocumentsFailure = (error_msg) => ({
    type: types.DOCUMENTS_FETCH_FAILURE,
    error_msg
});
