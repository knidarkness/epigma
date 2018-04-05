import uuid4 from "uuid/v4";
import * as actionTypes from "./actionTypes";

export const createShape = (nodes=[], color = 'black') => ({
    type: actionTypes.CREATE_SHAPE,
    id: uuid4(),
    nodes,
    color
});
export const deleteShape = (id) => ({
    type: actionTypes.DELETE_SHAPE,
    id
});


export const addShapeNode = (shape_id, node) => ({
    type: actionTypes.SHAPE_ADD_NODE,
    shape_id,
    node
});


export const deleteShapeNode = (shape_id, index) => ({
    type: actionTypes.SHAPE_DELETE_NODE,
    shape_id,
    index
});


export const insertShapeNode = (shape_id, index, node) => ({
    type: actionTypes.SHAPE_INSERT_NODE,
    shape_id,
    index,
    node
});


export const updateShapeNode = (shape_id, index, node) => ({
    type: actionTypes.SHAPE_UPDATE_NODE,
    shape_id,
    index,
    node
});

export const setSelectedShape = (nodes, color = "#000000") => ({
    type: actionTypes.SET_SELECTED_SHAPE,
    nodes,
    color
});


export const clearSelectedShape = () => ({
    type: actionTypes.CLEAR_SELECTED_SHAPE
});


export const selectedShapeAddNode = (node) => ({
    type: actionTypes.SELECTED_SHAPE_ADD_NODE,
    node
});

export const selectedShapeInsertNode = (index, node) => ({
    type: actionTypes.SELECTED_SHAPE_INSERT_NODE,
    index,
    node
});

export const selectedShapeDeleteNode = (index) => ({
    type: actionTypes.SELECTED_SHAPE_DELETE_NODE,
    index
});

export const selectedShapeUpdateNode = (index, node) => ({
    type: actionTypes.SELECTED_SHAPE_UPDATE_NODE,
    index,
    node
});

export const zoomTo = (point, zoom) => ({
    type: actionTypes.ZOOM_TO,
    point,
    zoom
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

export const enableMode = (mode) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.ENABLE_MODE,
            mode
        })
        dispatch({
            type: actionTypes.CLEAR_SELECTED_SHAPE
        })
    };
}

export const updateCursorPosition = (x, y) => ({
    type: actionTypes.UPDATE_CURSOR_POSITION,
    x,
    y
});