import {DOCUMENT_LIST_URI} from 'const'

const createShape = (documentId, shape) => {
    const request = new Request(DOCUMENT_LIST_URI + '/' + documentId + '/shapes/', {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify({shapeData:shape}),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    fetch(request).catch(console.error);
};

const updateShape = (documentId, shape) => {
    const request = new Request(DOCUMENT_LIST_URI + '/' + documentId + '/shapes/' + shape.id, {
        method: 'PUT',
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify({shapeData:shape}),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    fetch(request).catch(console.error);
};

const deleteShape = (documentId, id) => {
    const request = new Request(DOCUMENT_LIST_URI + '/' + documentId + '/shapes/' + id, {
        method: 'DELETE',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    fetch(request).catch(console.error);
};


export default {
    createShape,
    updateShape,
    deleteShape
};