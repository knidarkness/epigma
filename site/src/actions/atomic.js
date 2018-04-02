import uuid4 from "uuid/v4";
import * as actionTypes from "./actionTypes";

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

export const selectedShapeAddNode = (node, index = 0) => ({
    type: actionTypes.SELECTED_SHAPE_ADD_NODE,
    node,
    index
});

export const selectedShapeDeleteNode = (index) => ({
    type: actionTypes.SELECTED_SHAPE_DELETE_NODE,
    index
});

export const selectedShapeUpdateNode = (node, index) => ({
    type: actionTypes.SELECTED_SHAPE_UPDATE_NODE,
    node,
    index
});

export const changeZoom = (zoom) => ({
    type: actionTypes.CHANGE_ZOOM,
    zoom
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

export const updateCursorPosition = (x, y) => ({
    type: actionTypes.UPDATE_CURSOR_POSITION,
    x,
    y
});