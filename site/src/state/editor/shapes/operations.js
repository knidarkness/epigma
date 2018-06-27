import * as actions from './actions';
import { DOCUMENT_LIST_URI } from 'const';
import uuid4 from 'uuid/v4';
const fetchShapes = (documentId) => {
    return (dispatch) => {
        return fetch(`${DOCUMENT_LIST_URI}/${documentId}/shapes/`)
            .then((response) => response.json())
            .then((data) => dispatch(actions.fetchShapesSuccess(data)))
            .catch((err) => dispatch(actions.fetchShapesFailure(err)));
    };
};

const createShape = (documentId, shape) => {
    return (dispatch) => {
        shape = {
            ...shape,
            id: uuid4()
        };

        return fetch(`${DOCUMENT_LIST_URI}/${documentId}/shapes/`, {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify(shape),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(({ status }) => {
                return status === 201
                    ? dispatch(actions.createShapeSuccess(shape))
                    : dispatch(actions.createShapeFailure(`[Error] status code: ${status}`));
            })
            .catch((err) => dispatch(actions.createShapeFailure(err)));
    };
};


const updateShape = (documentId, shape) => {
    return (dispatch) => {
        return fetch(`${DOCUMENT_LIST_URI}/${documentId}/shapes/${shape.id}`, {
            method: 'PUT',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify(shape),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(({ status }) => status === 200
                ? dispatch(actions.updateShapeSuccess(shape))
                : dispatch(actions.updateShapeFailure(`[Error] status code: ${status}`))
            )
            .catch((err) => dispatch(actions.updateShapeFailure(err)));
    };
};

const deleteShape = (documentId, id) => {
    return (dispatch) => {
        return fetch(`${DOCUMENT_LIST_URI}/${documentId}/shapes/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(({ status }) => status === 200
                ? dispatch(actions.deleteShapeSuccess(id))
                : dispatch(actions.deleteShapeFailure(`[Error] status code: ${status}`))
            )
            .catch((err) => dispatch(actions.deleteShapeFailure(err)));
    };
};


const selectShape = actions.selectShape;

export {
    fetchShapes,
    createShape,
    deleteShape,
    updateShape,
    selectShape
};
