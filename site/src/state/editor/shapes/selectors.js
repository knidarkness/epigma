export const getAllShapes = state => state.editor.shapes.present;
export const getShapesNum = state => state.editor.shapes.present.length;
export const getNodesNum = state => state.editor.shapes.present.reduce((acc, element) => acc + element.nodes.length, 0);
