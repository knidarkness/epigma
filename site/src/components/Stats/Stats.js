import React from 'react';

import './Stats.scss'

const Stats = ({paths, nodes, canvasMode}) => (
    <div className="stats">
        <p className="stats__scale">s: {Math.round(canvasMode.zoom * 100)}%</p>
        <p className="stats__lines">p: {paths}</p>
        <p className="stats__nodes">n: {nodes}</p>
    </div>
);

export default Stats;