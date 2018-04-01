import React from 'react';
import { connect } from 'react-redux';

import {getAllShapes, getMode, getEdit, getSelectedShape, getViewMatrix} from "../reducers";

import Canvas from '../components/Canvas/Canvas';
import {createShape, deleteShape, updateShape, fetchShapes, setSelectedShape, changeZoom, zoomTo, shiftCanvas, editOff, editToggle, editOn} from "../actions";


const mapStateToProps = (state) => ({
    mode: getMode(state),
    shapes: getAllShapes(state),
    viewMatrix: getViewMatrix(state),
    edit: getEdit(state),
    selectedShape: getSelectedShape(state)
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