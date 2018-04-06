import React from 'react';
import { connect } from 'react-redux';

import {getAllShapes, getMode, getEdit, getZoom, getCursor, getSelectedShape, getViewMatrix} from "reducers";

import Canvas from 'components/Canvas/Canvas';

import * as atomicActions from "actions/atomic";

import * as shapeActions from "actions/shape";

import * as  modeActions from "actions/mode";

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
    fetchShapes: shapeActions.fetchShapes,
    pushShapesToBackend: shapeActions.pushShapesToBackend,
    createShape: shapeActions.createShape,
    deleteShape: shapeActions.deleteShape,
    addShapeNode: shapeActions.addShapeNode, 
    insertShapeNode: shapeActions.insertShapeNode,
    deleteShapeNode: shapeActions.deleteShapeNode, 
    updateShapeNode: shapeActions.updateShapeNode,
    setSelectedShape: shapeActions.setSelectedShape,
    clearSelectedShape: shapeActions.clearSelectedShape,
    selectedShapeInsertNode: shapeActions.selectedShapeInsertNode,
    selectedShapeDeleteNode: shapeActions.selectedShapeDeleteNode,   
    selectedShapeUpdateNode: shapeActions.selectedShapeUpdateNode,   
    selectedShapeAddNode: shapeActions.selectedShapeAddNode,
    zoomCanvas: atomicActions.zoomCanvas,
    shiftCanvas: atomicActions.shiftCanvas,
    changeMode: modeActions.changeMode,
    updateCursorPosition: atomicActions.updateCursorPosition
});

const RenderCanvas = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default RenderCanvas;