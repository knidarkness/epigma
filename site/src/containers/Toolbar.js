import React from 'react';
import { connect } from 'react-redux';
import {zoomTo, enableMode} from "../actions/atomic";

import Toolbar from '../components/Toolbar/Toolbar';
import { ActionCreators } from 'redux-undo';

import {getMode, getZoom} from "../reducers";

const mapDispatchToProps = ({
    zoomTo,
    undo: ActionCreators.undo,
    redo: ActionCreators.redo,
    enableMode,
});

const ToolbarContainer = connect(
    (state) => ({
        mode: getMode(state),
        zoom: getZoom(state)
    }),
    mapDispatchToProps
)(Toolbar);

export default ToolbarContainer;