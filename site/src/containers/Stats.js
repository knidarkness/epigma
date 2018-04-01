import React from 'react';
import { connect } from 'react-redux';

import {getZoom, getShapesNum, getNodesNum} from "../reducers";

import Stats from '../components/Stats/Stats';

const mapStateToProps = (state) => ({
    shapes: getShapesNum(state),
    zoom: getZoom(state),
    nodes: getNodesNum(state)
});

const StatsData = connect(
    mapStateToProps
)(Stats);

export default StatsData;