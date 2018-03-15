import React from 'react';
import {changeZoom} from "../../actions/index";

import './Stats.scss'

const Stats = ({paths, nodes}) => (
    <div className="stats">
        <p className="stats__lines">lines: {paths}</p>
        <p className="stats__nodes">nodes: {nodes}</p>
    </div>
);

export default Stats;