import * as uuid4 from 'uuid/v4'
import * as actionTypes from "./actionTypes";
import {DOCUMENT_LIST_URI} from "../const";

export const createPath = (path, color = 'black') => ({
    type: actionTypes.CREATE_PATH,
    id: uuid4(),
    path,
    color
});

export const deletePath = (pathId) => ({
    type: actionTypes.DELETE_PATH,
    id: pathId
});

export const updatePath = (id, path) => ({
    type: actionTypes.UPDATE_PATH,
    id,
    path
});

export const setEditedPath = (path, color = '#000000') => ({
   type: actionTypes.SET_EDITED_PATH,
   path: path,
   color: color
});


export const changeZoom = (zoom, cursorX, cursorY) => ({
    type: actionTypes.CHANGE_ZOOM,
    zoom,
    cursorX,
    cursorY
});

export const shiftCanvas = (shiftX, shiftY) => ({
    type: actionTypes.SHIFT_CANVAS,
    shiftX,
    shiftY
});

export const fetchDocuments = () => ({
    type: actionTypes.FETCH_DOCUMENTS
});

export const itemsFetchDataSuccess = (items) => {
    return {
        type: actionTypes.ITEMS_FETCH_DATA_SUCCESS,
        items: items.documents
    };
};

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

export const fetchPaths = (id) => {
    return (dispatch) => {
        fetch(DOCUMENT_LIST_URI + '/' + id + '/paths/')
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                dispatch({
                    type: actionTypes.FETCH_PATHS,
                    paths: data.paths.map(path => ({
                        id: 1,
                        path: path,
                        color: 'black'
                    }))
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const editOn = () => ({
    type: actionTypes.EDIT_ON
});

export const editOff = () => ({
    type: actionTypes.EDIT_OFF
});

export const editToggle = () => ({
    type: actionTypes.TOGGLE_EDIT
});