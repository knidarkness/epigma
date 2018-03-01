export default (drawableId) => {
    return {
        type: 'REMOVE_DRAWABLE',
        id: drawableId
    }
}