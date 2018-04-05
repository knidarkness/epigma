import React from 'react';
import { connect } from 'react-redux';

import {getAllShapes, getMode, getEdit, getZoom, getCursor, getSelectedShape, getViewMatrix} from "../reducers";

import Canvas from '../components/Canvas/Canvas';
import {createShape, deleteShape, deleteShapeNode, insertShapeNode, addShapeNode, updateShapeNode, setSelectedShape, clearSelectedShape, changeZoom, zoomTo, shiftCanvas, enableMode, updateCursorPosition} from "../actions/atomic";
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
    fetchShapes,
    pushShapesToBackend,
    createShape,
    deleteShape,
    addShapeNode, 
    insertShapeNode,
    deleteShapeNode, 
    updateShapeNode,
    setSelectedShape,
    clearSelectedShape,
    zoomTo,
    shiftCanvas,
    enableMode,
    updateCursorPosition
});

const RenderCanvas = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default RenderCanvas;