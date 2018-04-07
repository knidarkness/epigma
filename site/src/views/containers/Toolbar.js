import React from 'react';
import { connect } from 'react-redux';
import {canvasOperations} from "state/editor/canvas";
import {modeOperations} from "state/editor/mode";
import Toolbar from 'views/components/Toolbar/Toolbar';
import { ActionCreators } from 'redux-undo';

import { canvasSelectors } from "state/editor/canvas";
import { modeSelectors } from "state/editor/mode";

const mapStateToProps = (state) => ({
    mode: modeSelectors.getMode(state),
    zoom: canvasSelectors.getZoom(state)
});

const mapDispatchToProps = ({
    zoomCanvas: canvasOperations.zoomCanvas,
    undo: ActionCreators.undo,
    redo: ActionCreators.redo,
    changeMode: modeOperations.changeMode,
});

const ToolbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);

export default ToolbarContainer;