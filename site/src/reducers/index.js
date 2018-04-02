import { combineReducers } from 'redux'
import application from './application';
import editor from './editor';

const epigmaReducers = combineReducers({
    editor,
    application,
});

export const getAllShapes = state => state.editor.shapes.present;
export const getMode = state => state.editor.mode;
export const getCursor = state => state.editor.cursor;
export const getViewMatrix = state => state.editor.canvas.viewMatrix;
export const getEdit = state => state.editor.edit;
export const getSelectedShape = state => state.editor.selectedShape;

export const getDocuments = state => state.application.documents;

export const getZoom = state => state.editor.canvas.zoom;
export const getShapesNum = state => state.editor.shapes.present.length 
            + (state.editor.selectedShape.nodes.length !== 0 ? 1 : 0);

export const getNodesNum = state => 
        state.editor.shapes.present.reduce((acc, element) => acc + element.nodes.length, 0) 
            + state.editor.selectedShape.nodes.length;

export default epigmaReducers;