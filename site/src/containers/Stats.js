import React from 'react';
import { connect } from 'react-redux';
import {changeZoom} from "../actions";

import Stats from '../components/Stats/Stats';

const mapStateToProps = (state) => ({
    paths: state.paths.length,
    nodes:  state.paths.reduce((acc, element) => acc + element.path.length, 0)
});

const StatsData = connect(
    mapStateToProps
)(Stats);

export default StatsData;