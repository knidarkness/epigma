import React from 'react';
import { connect } from 'react-redux';

import Canvas from '../components/Canvas/Canvas';
import {createShape, deleteShape, updateShape, fetchShapes, setSelectedShape, changeZoom, zoomTo, shiftCanvas, editOff, editToggle, editOn} from "../actions";

const mapStateToProps = (state) => ({
    mode: state.canvas.mode,
    shapes: state.canvas.shapes.present,
    viewMatrix: state.canvas.viewMatrix.viewMatrix,
    edit: state.canvas.edit,
    selectedShape: state.canvas.selectedShape
});

const mapDispatchToProps = ({
    fetchShapes,
    createShape,
    deleteShape,
    updateShape,
    setSelectedShape,
    changeZoom,
    zoomTo,
    shiftCanvas,
    editToggle,
    editOn,
    editOff
});

const RenderCanvas = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default RenderCanvas;