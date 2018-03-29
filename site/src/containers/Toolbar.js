import React from 'react';
import { connect } from 'react-redux';
import {changeZoom, enableViewMode, enableDrawMode, enableDeleteMode} from "../actions";

import Toolbar from '../components/Toolbar/Toolbar';
import { ActionCreators } from 'redux-undo';

const mapDispatchToProps = ({
    changeZoom,
    undo: ActionCreators.undo,
    redo: ActionCreators.redo,
    enableDrawMode,
    enableViewMode,
    enableDeleteMode
});

const ToolbarContainer = connect(
    (state) => ({
        editorMode: state.editorMode,
        zoom: state.canvasMode.zoom
    }),
    mapDispatchToProps
)(Toolbar);

export default ToolbarContainer;