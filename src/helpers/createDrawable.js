let nextDrawableId = 0;

export default (shapeType) => {
    return {
        type: 'ADD_DRAWABLE',
        id: nextDrawableId++,
        shapeType:shapeType
    }
}