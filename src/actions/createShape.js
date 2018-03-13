import React from "react";

let nextShapeId = 0;
const createShape = () => {
    return {
        type: 'SHAPE_CREATE',
        id: nextShapeId++
    }
}

export default createShape;