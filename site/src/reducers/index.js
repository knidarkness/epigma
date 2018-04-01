import { combineReducers } from 'redux'
import editor from './editor';
import canvas from './canvas';

const epigmaReducers = combineReducers({
    canvas,
    editor,
});

export const getAllShapes = state => state.canvas.shapes.present;
export const getMode = state => state.canvas.mode;
export const getViewMatrix = state => state.canvas.viewMatrix.viewMatrix;
export const getEdit = state => state.canvas.edit;
export const getSelectedShape = state => state.canvas.selectedShape;

export const getDocuments = state => state.editor.documents;

export const getZoom = state => state.canvas.viewMatrix.zoom;
export const getShapesNum = state => state.canvas.shapes.present.length;
export const getNodesNum = state => state.canvas.shapes.present.reduce((acc, element) => acc + element.nodes.length, 0);

export default epigmaReducers;