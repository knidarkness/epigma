import {createDocumentSuccess, createDocumentFailure, deleteDocumentSuccess, deleteDocumentFailure, updateDocumentSuccess, updateDocumentFailure, fetchDocumentsSuccess, fetchDocumentsFailure} from './actions';
import {DOCUMENT_LIST_URI} from 'const';

const fetchDocuments = () => {
    return (dispatch) => {
        return fetch(DOCUMENT_LIST_URI)
            .then((response) => response.json())
            .then((data) => dispatch(fetchDocumentsSuccess(data.documents)))
            .catch((err) => dispatch(fetchDocumentsFailure(err)));

    };
};

const createDocument = (name) => {
    return (dispatch) => {
        return fetch(DOCUMENT_LIST_URI, {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({
                name: name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((doc) => dispatch(createDocumentSuccess(doc.data._id, doc.data.name,doc.data.editedAt)))
            .catch((err) => dispatch(createDocumentFailure(err)));
    };
};


const deleteDocument = (id) => {
    return (dispatch) => {
        return fetch(DOCUMENT_LIST_URI + '/' + id, {
            method: 'DELETE',
            mode: 'cors',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => dispatch(deleteDocumentSuccess(id)))
            .catch((err) => dispatch(deleteDocumentFailure(err)));
    };
};

const updateDocument = (id, name) => {
    return (dispatch) => {
        return fetch(DOCUMENT_LIST_URI + '/' + id, {
            method: 'PATCH',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({
                name: name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((doc) => dispatch(updateDocumentSuccess(doc.data.id, doc.data.name, doc.data.editedAt)))
            .catch((err) => dispatch(updateDocumentFailure(err)));
    };
};

export{
    fetchDocuments,
    createDocument,
    deleteDocument,
    updateDocument
};