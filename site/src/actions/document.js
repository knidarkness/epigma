import {DOCUMENT_LIST_URI} from "../const";
import * as actionTypes from "./actionTypes";

export const fetchDocuments = (url) => {
    return (dispatch) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => dispatch(fetchDocumentsSuccess(data.documents)))
            .catch((err) => dispatch(fetchDocumentsFailure(err)));

    };
};

export const createDocument = (name) => {
    return (dispatch) => {
        const request = new Request(DOCUMENT_LIST_URI, {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({
                name: name
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        fetch(request)
            .then((response) => response.json())
            .then((doc) => dispatch(createDocumentSuccess(doc.data._id, doc.data.name,doc.data.editedAt)))
            .catch((err) => dispatch(createDocumentFailure(err)));
    };
};


export const deleteDocument = (id) => {
    return (dispatch) => {
        const request = new Request(DOCUMENT_LIST_URI + '/' + id, {
            method: 'DELETE',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(() => dispatch(deleteDocumentSuccess(id)))
            .catch((err) => dispatch(deleteDocumentFailure(err)));
    }
};

export const updateDocument = (id, name) => {
    return (dispatch) => {
        const request = new Request(DOCUMENT_LIST_URI + '/' + id, {
            method: 'PATCH',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({
                name: name
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then((response) => response.json())
            .then((data) => dispatch(updateDocumentSuccess(id, name, data.editedAt)))
            .catch((err) => dispatch(updateDocumentFailure(err)));
    }
};

export const createDocumentSuccess = (id, name, editedAt) => ({
    type: actionTypes.DOCUMENT_CREATE_SUCCESS,
    id,
    name,
    editedAt
});

export const createDocumentFailure = (error_msg) => ({
    type: actionTypes.DOCUMENT_CREATE_FAILURE,
    error_msg
});


export const deleteDocumentSuccess = (id) => ({
    type: actionTypes.DOCUMENT_DELETE_SUCCESS,
    id
});

export const deleteDocumentFailure = (error_msg) => ({
    type: actionTypes.DOCUMENT_DELETE_FAILURE,
    error_msg
});

export const updateDocumentSuccess = (id, name, editedAt) => ({
    type: actionTypes.DOCUMENT_UPDATE_SUCCESS,
    id,
    name,
    editedAt
});

export const updateDocumentFailure = (error_msg) => ({
    type: actionTypes.DOCUMENT_UPDATE_FAILURE,
    error_msg
});

export const fetchDocumentsSuccess = (documents) => ({
    type: actionTypes.DOCUMENTS_FETCH_SUCCESS,
    documents
});

export const fetchDocumentsFailure = (error_msg) => ({
    type: actionTypes.DOCUMENTS_FETCH_FAILURE,
    error_msg
});
