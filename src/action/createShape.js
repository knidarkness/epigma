import React from "react";

let nextShapeId = 0;

const randomPoint = () => {
    const y = Math.random() * window.innerHeight;
    const x = Math.random() * window.innerWidth;
    return {
        x,
        y
    };
};

const randomLine = () => {
    const p1 = randomPoint();
    const p2 = randomPoint();
    return [p1, p2]
};

const random4VerticesShape = () => {
    const vertices =  Array(2).fill(undefined).map(el => randomPoint());
    const offsetX = Math.random() * (window.innerWidth - Math.max(vertices[0].x, vertices[1].x));
    const offsetY = Math.random() * (window.innerHeight - Math.max(vertices[0].y, vertices[1].y));
    vertices.push({
        x: vertices[1].x + offsetX,
        y: vertices[1].y + offsetY
    });
    vertices.push({
        x: vertices[0].x + offsetX,
        y: vertices[0].y + offsetY
    });
    return vertices;
};

export default (shapeType) => {
    let path;
    switch (shapeType){
        case 'LINE':
            path = randomLine();
            break;
        case 'RECTANGLE':
            path = random4VerticesShape();
            break;
        default:
            return undefined;
    }
    return {
        type: 'ADD_SHAPE',
        id: nextShapeId++,
        path:path,
        background: "#"+((1<<24)*Math.random()|0).toString(16)
    }
}