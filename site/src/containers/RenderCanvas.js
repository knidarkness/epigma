import React from 'react';
import { connect } from 'react-redux';

import Canvas from '../components/Canvas/Canvas';

import {createPath, deletePath, updatePath, setEditedPath, changeZoom, shiftCanvas, editOff, editToggle, editOn} from "../actions";

const mapStateToProps = (state) => ({
    paths: state.paths,
    canvasMode: state.canvasMode,
    edit: state.edit,
    editedPath: state.editedPath
});

const mapDispatchToProps = ({
    createPath,
    deletePath,
    updatePath,
    setEditedPath,
    changeZoom,
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