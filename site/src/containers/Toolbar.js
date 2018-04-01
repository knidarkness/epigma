import React from 'react';
import { connect } from 'react-redux';
import {changeZoom, enableViewMode, enableDrawMode, enableDeleteMode} from "../actions";

import Toolbar from '../components/Toolbar/Toolbar';
import { ActionCreators } from 'redux-undo';

import {getMode, getZoom} from "../reducers";

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
        mode: getMode(state),
        zoom: getZoom(state)
    }),
    mapDispatchToProps
)(Toolbar);

export default ToolbarContainer;