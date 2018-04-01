import uuid4 from 'uuid/v4'
import * as actionTypes from "./actionTypes";
import {DOCUMENT_LIST_URI} from "../const";

export const createShape = (nodes, color = 'black') => ({
    type: actionTypes.CREATE_SHAPE,
    id: uuid4(),
    nodes,
    color
});

export const deleteShape = (pathId) => ({
    type: actionTypes.DELETE_SHAPE,
    id: pathId
});

export const updateShape = (id, nodes) => ({
    type: actionTypes.UPDATE_SHAPE,
    id,
    nodes
});

export const setSelectedShape = (nodes, color = '#000000') => ({
    type: actionTypes.SET_SELECTED_SHAPE,
    nodes: nodes,
    color: color
});


export const changeZoom = (zoom) => ({
    type: actionTypes.CHANGE_ZOOM,
    zoom
});

export const zoomTo = (zoom, cursorX, cursorY) => ({
    type: actionTypes.ZOOM_TO,
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

export const fetchShapes = (id) => {
    return (dispatch) => {
        fetch(DOCUMENT_LIST_URI + '/' + id + '/shapes/')
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                dispatch({
                    type: actionTypes.FETCH_SHAPES,
                    shapes: data.shapes.map(shape => ({
                        id: uuid4(),
                        nodes: shape,
                        color: 'black'
                    }))
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const enableDrawMode = () => ({
    type: actionTypes.ENABLE_DRAW_MODE
});

export const enableViewMode = () => ({
    type: actionTypes.ENABLE_VIEW_MODE
});

export const enableDeleteMode = () => ({
    type: actionTypes.ENABLE_DELETE_MODE
});

export const editOn = () => ({
    type: actionTypes.EDIT_ON
});

export const editOff = () => ({
    type: actionTypes.EDIT_OFF
});

export const editToggle = () => ({
    type: actionTypes.TOGGLE_EDIT
});