import {createShape, deleteShape, addShapeNode, insertShapeNode, deleteShapeNode, updateShapeNode, fetchShapesSuccess, fetchShapesFailure} from './actions';
import {DOCUMENT_LIST_URI} from 'const';

const fetchShapes = (id) => {
    return (dispatch) => {
        return fetch(DOCUMENT_LIST_URI + '/' + id + '/shapes/')
            .then((response) => response.json())
            .then((data) => dispatch(fetchShapesSuccess(data.shapes)))
            .catch(() => dispatch(fetchShapesFailure()));
    };
};

export {
    fetchShapes,
    createShape,
    deleteShape,
    addShapeNode,
    deleteShapeNode,
    updateShapeNode,
    insertShapeNode
};