import React from 'react';
import { connect } from 'react-redux';

import Canvas from '../components/Canvas/Canvas';
import {createPath, deletePath, updatePath, fetchPaths, setEditedPath, changeZoom, shiftCanvas, moveTo, editOff, editToggle, editOn} from "../actions";

const mapStateToProps = (state) => ({
    editorMode: state.editorMode,
    paths: state.paths.present,
    canvasMode: state.canvasMode,
    edit: state.edit,
    editedPath: state.editedPath
});

const mapDispatchToProps = ({
    fetchPaths,
    createPath,
    deletePath,
    updatePath,
    setEditedPath,
    changeZoom,
    shiftCanvas,
    moveTo,
    editToggle,
    editOn,
    editOff
});

const RenderCanvas = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default RenderCanvas;