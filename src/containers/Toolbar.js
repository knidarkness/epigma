import React from 'react';
import { connect } from 'react-redux';
import {changeZoom} from "../actions";

import Toolbar from './../components/Toolbar';

const mapDispatchToProps = ({
    changeZoom
});

const ToolbarContainer = connect(
    (state) => ({}),
    mapDispatchToProps
)(Toolbar);

export default ToolbarContainer;