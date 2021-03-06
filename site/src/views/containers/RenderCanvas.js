import { connect } from 'react-redux';

import Canvas from 'views/components/Canvas/Canvas';

import { canvasOperations, canvasSelectors } from 'state/editor/canvas';
import { cursorOperations, cursorSelectors } from 'state/editor/cursor';
import { modeOperations, modeSelectors } from 'state/editor/mode';
import { shapesOperations, shapesSelectors } from 'state/editor/shapes';
import { selectedShapeOperations, selectedShapeSelectors } from 'state/editor/selectedShape';


const mapStateToProps = (state) => ({
    mode: modeSelectors.getMode(state),
    shapes: shapesSelectors.getAllShapes(state),
    viewMatrix: canvasSelectors.getViewMatrix(state),
    zoom: canvasSelectors.getZoom(state),
    selectedShape: selectedShapeSelectors.getSelectedShape(state),
    cursor: cursorSelectors.getCursor(state)
});

const mapDispatchToProps = ({
    fetchShapes: shapesOperations.fetchShapes,
    createShape: shapesOperations.createShape,
    updateShape: shapesOperations.updateShape,
    deleteShape: shapesOperations.deleteShape,
    selectShape: shapesOperations.selectShape,
    addSelectedShapeNode: selectedShapeOperations.addSelectedShapeNode,
    insertSelectedShapeNode: selectedShapeOperations.insertSelectedShapeNode,
    deleteSelectedShapeNode: selectedShapeOperations.deleteSelectedShapeNode,
    updateSelectedShapeNode: selectedShapeOperations.updateSelectedShapeNode,
    setSelectedShape: selectedShapeOperations.setSelectedShape,
    clearSelectedShape: selectedShapeOperations.clearSelectedShape,
    zoomCanvas: canvasOperations.zoomCanvas,
    shiftCanvas: canvasOperations.shiftCanvas,
    changeMode: modeOperations.changeMode,
    updateCursorIcon: cursorOperations.updateCursorIcon
});

const RenderCanvas = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default RenderCanvas;