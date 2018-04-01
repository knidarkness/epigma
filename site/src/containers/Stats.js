import React from 'react';
import { connect } from 'react-redux';
import {changeZoom} from "../actions";

import Stats from '../components/Stats/Stats';

const mapStateToProps = (state) => ({
    paths: state.canvas.shapes.present.length,
    canvasMode: state.canvas.viewMatrix,
    nodes:  state.canvas.shapes.present.reduce((acc, element) => acc + element.nodes.length, 0)
});

const StatsData = connect(
    mapStateToProps
)(Stats);

export default StatsData;