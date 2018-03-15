import React from 'react';
import { connect } from 'react-redux';
import {changeZoom} from "../actions";

import Toolbar from '../components/Toolbar/Toolbar';

const mapDispatchToProps = ({
    changeZoom
});

const ToolbarContainer = connect(
    (state) => ({
        zoom: state.canvasMode.zoom
    }),
    mapDispatchToProps
)(Toolbar);

export default ToolbarContainer;