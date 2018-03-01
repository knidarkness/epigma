let nextShapeId = 0;

export default (path) => {
    return {
        type: 'ADD_SHAPE',
        id: nextShapeId++,
        path:path
    }
}