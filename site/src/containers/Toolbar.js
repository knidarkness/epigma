import React from 'react';
import { connect } from 'react-redux';
import {zoomCanvas} from "../actions/atomic";
import {changeMode} from "../actions/mode"
import Toolbar from '../components/Toolbar/Toolbar';
import { ActionCreators } from 'redux-undo';

import {getMode, getZoom} from "../reducers";

const mapDispatchToProps = ({
    zoomCanvas,
    undo: ActionCreators.undo,
    redo: ActionCreators.redo,
    changeMode,
});

const ToolbarContainer = connect(
    (state) => ({
        mode: getMode(state),
        zoom: getZoom(state)
    }),
    mapDispatchToProps
)(Toolbar);

export default ToolbarContainer;