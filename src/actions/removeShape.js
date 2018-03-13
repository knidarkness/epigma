const removeShape = (shapeId) => {
    return {
        type: 'SHAPE_REMOVE',
        id: shapeId
    }
}

export default removeShape;