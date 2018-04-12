import React from 'react';
import v4 from 'uuid/v4';

const renderShape = (shape) => {
    if (shape.nodes.length === 0) {
        return;
    }
    const shapeNodesPath = shape.nodes
        .reduce((prev, current) => `${prev }${current[0]},${current[1]} `, '');

    return <polyline data-shape-index={shape.id} className="shape" key={v4()} points={shapeNodesPath}
        style={{fill: 'none', stroke: shape.color, strokeWidth: '3'}}/>;
};

const renderAllShapes = (shapes) => shapes.map((shape, id) => renderShape(shape, id));

const renderShapeNodes = (selectedShape, shapes) => shapes
    .filter(shape => selectedShape === shape.id)
    .map(shape => shape.nodes.map((point, i) => <circle data-node-index={i} cx={point[0]} cy={point[1]} r="5" key={v4()} stroke="black"
        strokeWidth="3" fill="red"/>)
    );

export const createSVG = (selectedShape, shapes) => (
    <g>
        {renderAllShapes(shapes)}
        {renderShapeNodes(selectedShape, shapes)}
    </g>
);