import {itemsFetchDataSuccess} from "./atomic";
import {DOCUMENT_LIST_URI} from "../const";
import * as actionTypes from "./actionTypes";

export const itemsFetchData = (url) => {
    return (dispatch) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => {});
    };
};

export const createIllustration = (name) => {
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
            .then(r => {
                r.json()
                    .then((doc) => {
                        dispatch({
                            type: actionTypes.CREATE_DOCUMENT,
                            id: doc.data._id,
                            name: doc.data.name,
                            editedAt: doc.data.editedAt
                        });
                    });
            });
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
            .then(() => {
                dispatch({
                    type: actionTypes.DELETE_DOCUMENT,
                    id
                })
            });
    }
};

export const renameDocument = (id, name) => {
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
            .then(async (result) => {
                const document = await result.json();
                dispatch({
                    type: actionTypes.RENAME_DOCUMENT,
                    id,
                    name,
                    editedAt: document.editedAt
                })
            });
    }
};
