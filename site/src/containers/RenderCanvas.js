import React from 'react';
import { connect } from 'react-redux';

import {getAllShapes, getMode, getEdit, getZoom, getCursor, getSelectedShape, getViewMatrix} from "../reducers";

import Canvas from '../components/Canvas/Canvas';

import * as atomicActions from "../actions/atomic";

import {fetchShapes, pushShapesToBackend} from "../actions/shape";

const mapStateToProps = (state) => ({
    mode: getMode(state),
    shapes: getAllShapes(state),
    viewMatrix: getViewMatrix(state),
    zoom: getZoom(state),
    edit: getEdit(state),
    selectedShape: getSelectedShape(state),
    cursor: getCursor(state)
});

const mapDispatchToProps = ({
    fetchShapes: fetchShapes,
    pushShapesToBackend: pushShapesToBackend,
    createShape: atomicActions.createShape,
    deleteShape: atomicActions.deleteShape,
    addShapeNode: atomicActions.addShapeNode, 
    insertShapeNode: atomicActions.insertShapeNode,
    deleteShapeNode: atomicActions.deleteShapeNode, 
    updateShapeNode: atomicActions.updateShapeNode,
    setSelectedShape: atomicActions.setSelectedShape,
    clearSelectedShape: atomicActions.clearSelectedShape,
    selectedShapeInsertNode: atomicActions.selectedShapeInsertNode,
    selectedShapeDeleteNode: atomicActions.selectedShapeDeleteNode,   
    selectedShapeUpdateNode: atomicActions.selectedShapeUpdateNode,   
    selectedShapeAddNode: atomicActions.selectedShapeAddNode,
    zoomTo: atomicActions.zoomTo,
    shiftCanvas: atomicActions.shiftCanvas,
    enableMode: atomicActions.enableMode,
    updateCursorPosition: atomicActions.updateCursorPosition
});

const RenderCanvas = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default RenderCanvas;