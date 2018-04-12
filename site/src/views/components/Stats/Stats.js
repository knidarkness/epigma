import React from 'react';

import PropTypes from 'prop-types';

import './Stats.scss';

const Stats = ({shapes, nodes, zoom}) => (
    <div className="stats">
        <p className="stats__scale">s: {Math.round(zoom * 100)}%</p>
        <p className="stats__lines">shapes: {shapes}</p>
        <p className="stats__nodes">nodes: {nodes}</p>
    </div>
);

Stats.propTypes = {
    shapes: PropTypes.number,
    nodes: PropTypes.number,
    zoom: PropTypes.number
};

export default Stats;