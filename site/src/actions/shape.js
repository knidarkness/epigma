import uuid4 from "uuid/v4";
import {DOCUMENT_LIST_URI} from "const";
import * as actionTypes from "./actionTypes";

export const fetchShapes = (id) => {
    return (dispatch) => {
        fetch(DOCUMENT_LIST_URI + '/' + id + '/shapes/')
            .then((response) => response.json())
            .then((data) => dispatch(fetchShapesSuccess(data.shapes)))
            .catch(() => dispatch(fetchShapesFailure()));
    };
};

export const setSelectedShape = (id) => ({
    type: actionTypes.SELECTED_SHAPE_SET,
    id
});


export const clearSelectedShape = () => ({
    type: actionTypes.SELECTED_SHAPE_CLEAR
});


export const fetchShapesSuccess = (shapes) => ({
    type: actionTypes.SHAPES_FETCH_SUCCESS,
    shapes
});

export const fetchShapesFailure = () => ({
    type: actionTypes.SHAPES_FETCH_FAILURE
});

export const createShape = (id, nodes = [], color = 'black') => ({
    type: actionTypes.SHAPE_CREATE,
    id: id || uuid4(),
    nodes,
    color
});

export const deleteShape = (id) => ({
    type: actionTypes.SHAPE_DELETE,
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
