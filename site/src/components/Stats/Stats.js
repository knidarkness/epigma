import React from 'react';

import './Stats.scss'

const Stats = ({shapes, nodes, zoom}) => (
    <div className="stats">
        <p className="stats__scale">s: {Math.round(zoom * 100)}%</p>
        <p className="stats__lines">p: {shapes}</p>
        <p className="stats__nodes">n: {nodes}</p>
    </div>
);

export default Stats;