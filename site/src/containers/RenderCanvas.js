import React from 'react';
import { connect } from 'react-redux';

import {getAllShapes, getMode, getEdit, getZoom, getCursor, getSelectedShape, getViewMatrix} from "../reducers";

import Canvas from '../components/Canvas/Canvas';
import {createShape, deleteShape, updateShape, setSelectedShape, selectedShapeAddNode, selectedShapeDeleteNode, selectedShapeUpdateNode, changeZoom, zoomTo, shiftCanvas, editOff, editToggle, editOn, updateCursorPosition} from "../actions/atomic";
import {fetchShapes} from "../actions/shape";

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
    createShape,
    deleteShape,
    updateShape,
    setSelectedShape,
    selectedShapeAddNode,
    selectedShapeDeleteNode,
    selectedShapeUpdateNode,
    changeZoom,
    zoomTo,
    shiftCanvas,
    editToggle,
    editOn,
    editOff,
    updateCursorPosition
});

const RenderCanvas = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default RenderCanvas;