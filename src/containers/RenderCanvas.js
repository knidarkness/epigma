import React from 'react';
import { connect } from 'react-redux';

import Canvas from '../components/Canvas';

const getPaths = (paths) => paths;

const mapStateToProps = (state) => ({
    paths: state.paths
});

const RenderCanvas = connect(mapStateToProps)(Canvas);

export default RenderCanvas;