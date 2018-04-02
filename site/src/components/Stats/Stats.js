import React from 'react';

import './Stats.scss'

const Stats = ({shapes, nodes, zoom}) => (
    <div className="stats">
        <p className="stats__scale">s: {Math.round(zoom * 100)}%</p>
        <p className="stats__lines">shapes: {shapes}</p>
        <p className="stats__nodes">nodes: {nodes}</p>
    </div>
);

export default Stats;