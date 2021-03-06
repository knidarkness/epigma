import React from 'react';
import * as most from 'most';
import PropTypes from 'prop-types';

import { EDITOR_MODE, CURSOR } from 'const';
import { createSVG } from 'utils/svg';

import Matrix from 'utils/matrix';
import {distToSegment} from 'utils/utils';

import './Canvas.scss';

/** This is a main component for svg editing */
class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursorPosition: [0, 0]
        };
    }

    getOffsetedPoint(point) {
        return this.props.viewMatrix.transformPoint(point);
    }

    getNormalizedPoint(point) {
        return this.props.viewMatrix.inverse().transformPoint(point);
    }


    isShape(e) {
        return e.target.dataset && 'shapeIndex' in e.target.dataset;
    }

    isNode(e) {
        return e.target.dataset && 'nodeIndex' in e.target.dataset;
    }

    updateCursorPosition(x, y) {
        this.setState({
            cursorPosition: [x, y]
        });
    }

    componentWillUnmount() {
        const canvasWillUnmountEvent = new Event('canvasWillUnmountEvent');
        document.dispatchEvent(canvasWillUnmountEvent);
        this.props.clearSelectedShape();
    }

    componentDidMount() {
        this.props.fetchShapes(this.props.documentId);
        this.props.changeMode(EDITOR_MODE.SELECT);

        const canvas = document.querySelector('#canvas');

        const canvasWillUnmount = most.fromEvent('canvasWillUnmountEvent', document);

        const click = most.fromEvent('click', canvas)
            .until(canvasWillUnmount);
        const doubleclick = most.fromEvent('dblclick', canvas)
            .until(canvasWillUnmount);
        const mousemove = most.fromEvent('mousemove', canvas)
            .until(canvasWillUnmount);
        const mousedown = most.fromEvent('mousedown', canvas)
            .until(canvasWillUnmount);
        const mouseup = most.fromEvent('mouseup', canvas)
            .until(canvasWillUnmount);

        const keydown = most.fromEvent('keydown', document)
            .until(canvasWillUnmount);
        const keydownDelete = keydown
            .filter(e => e.key === 'Delete' || e.key === 'r');
        const keydownEnter = keydown
            .filter(e => e.key === 'Enter' || e.key === 'Escape');
        const wheel = most.fromEvent('wheel', document)
            .until(canvasWillUnmount);


        wheel // zoom
            .observe(e => {
                const newZoom = Math.max(this.props.zoom + ((e.deltaY > 0) ? 0.01 : -0.01), 0.5);
                this.props.zoomCanvas([e.x, e.y], newZoom);
            });

        keydownEnter // save selected shape
            .filter(() => this.props.mode === EDITOR_MODE.DRAW || this.props.mode === EDITOR_MODE.EDIT)
            .observe(() => {
                if (this.props.selectedShape.nodes.length > 1) {
                    if (this.props.mode === EDITOR_MODE.DRAW) {
                        this.props.createShape(this.props.documentId, this.props.selectedShape);
                    } else {
                        this.props.updateShape(this.props.documentId, this.props.selectedShape);
                    }
                }
                this.props.changeMode(EDITOR_MODE.SELECT);
            });

        keydownDelete // delete selected shape
            .filter(() => this.props.mode === EDITOR_MODE.EDIT)
            .observe(() => {
                if (this.props.selectedShape.id) {
                    this.props.deleteShape(this.props.documentId, this.props.selectedShape.id);
                }
                this.props.clearSelectedShape();
                this.props.changeMode(EDITOR_MODE.SELECT);
            });

        mousemove // save cursor position
            .filter(() => this.props.mode === EDITOR_MODE.DRAW)
            .observe(cursor => this.updateCursorPosition(cursor.x, cursor.y));

        click // draw line
            .filter(() => this.props.mode === EDITOR_MODE.DRAW)
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(node => {
                this.props.addSelectedShapeNode(node);
            });

        click // enter edit mode
            .filter(() => this.props.mode === EDITOR_MODE.SELECT)
            .filter(e => this.isShape(e))
            .map(e => e.target.dataset.shapeIndex)
            .observe(shapeId => {
                this.props.changeMode(EDITOR_MODE.EDIT);
                this.props.setSelectedShape(this.props.shapes.filter(shape => shape.id === shapeId)[0]);
                this.props.selectShape(shapeId);
            });

        doubleclick // delete node
            .filter(() => this.props.mode === EDITOR_MODE.EDIT)
            .filter(e => this.isNode(e))
            .observe((e) => {
                this.props.deleteSelectedShapeNode(Number(e.target.dataset.nodeIndex));
            });

        doubleclick // add node
            .filter(() => this.props.mode === EDITOR_MODE.EDIT)
            .filter(e => this.isShape(e))
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(newNode => {
                const nodes = this.props.selectedShape.nodes;
                const left = nodes
                    .map((node, index) => index)
                    .filter((index) => index < nodes.length - 1) // as we work with pairs and don't want to get IndexOutOfArrayBounds
                    .reduce((a, b) => distToSegment(newNode, nodes[a], nodes[a + 1]) < distToSegment(newNode, nodes[b], nodes[b + 1])
                        ? a
                        : b, 0);
                this.props.insertSelectedShapeNode(left + 1, newNode);
            });

        let editNodeIndex = -1;
        mousedown // edit node of the line
            .filter(() => this.props.mode === EDITOR_MODE.EDIT)
            .filter(e => this.isNode(e))
            .chain(md => {
                editNodeIndex = Number(md.target.dataset.nodeIndex);
                return mousemove
                    .until(mouseup);
            })
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(node => this.props.updateSelectedShapeNode(editNodeIndex, node));

        mousedown // drag&drop canvas
            .filter(() => this.props.mode === EDITOR_MODE.VIEW)
            .chain(() => {
                return mousemove
                    .until(mouseup);
            })
            .observe(e => {
                this.props.shiftCanvas(e.movementX, e.movementY);
            });
    }

    transformShape(shape) {
        return {
            ...shape,
            nodes: shape.nodes.map(point => this.getOffsetedPoint(point)),
            strokeWidth: shape.strokeWidth * this.props.zoom
        };
    }

    render() {
        const cursor = this.props.cursor;
        const shapes = this.props.shapes
            .map(shape => this.transformShape(shape));
        const selectedShape = this.transformShape({
            ...this.props.selectedShape,
            nodes: this.props.mode === EDITOR_MODE.DRAW
                ? [...this.props.selectedShape.nodes, this.getNormalizedPoint(this.state.cursorPosition)]
                : this.props.selectedShape.nodes
        });

        return (
            <div>
                <svg id="canvas" className="canvas" width="100%" height="100%" style={{ cursor }}>
                    {createSVG(selectedShape, shapes)}
                </svg>
            </div>
        );
    }
}

Canvas.propTypes = {
    /** A matrix for zoom & canvas shift transformation */
    viewMatrix: PropTypes.instanceOf(Matrix),
    /** Id of currently opened document */
    documentId: PropTypes.string.isRequired,
    /** A Boolean variable to check if currently editing a shape */
    changeMode: PropTypes.func.isRequired,
    /** A number to indicate current zoom */
    zoom: PropTypes.number.isRequired,
    /** A variable for current canvas mode */
    mode: PropTypes.oneOf(Object.values(EDITOR_MODE)),
    /** Id of a selected shape on the canvas */
    selectedShape: PropTypes.object.isRequired,
    /** List of all the shapes on the canvas */
    shapes: PropTypes.array.isRequired,
    /** Value of a currently selected cursor */
    cursor: PropTypes.oneOf(Object.values(CURSOR)),

    /** Method to fetch shapes from the back-end */
    fetchShapes: PropTypes.func.isRequired,
    /** Method to remove shape by shapeId */
    deleteShape: PropTypes.func.isRequired,
    /** Method to select a shape by shapeId */
    selectShape: PropTypes.func.isRequired,
    /** Method to create a new shape */
    createShape: PropTypes.func.isRequired,
    /** Method to set a new list of nodes of a shape */
    updateShape: PropTypes.func.isRequired,
    /** Method to set selected shape id */
    setSelectedShape: PropTypes.func.isRequired,
    /** Method to add a new node to the end of the node list of the selected shape */
    addSelectedShapeNode: PropTypes.func.isRequired,
    /** Method to unselect currently selected shape */
    clearSelectedShape: PropTypes.func.isRequired,
    /** Method to pdate selected shape node (coordinates) by nodeId */
    updateSelectedShapeNode: PropTypes.func.isRequired,
    /** Method to delete a node from selected shape by nodeId */
    deleteSelectedShapeNode: PropTypes.func.isRequired,
    /** Method to a node to a selected shape by new node id and coordinates */
    insertSelectedShapeNode: PropTypes.func.isRequired,
    /** Method to shift a canvas by given x and y offset */
    shiftCanvas: PropTypes.func.isRequired,
    /** Method to apply a new zoom action to a canvas */
    zoomCanvas: PropTypes.func.isRequired
};

export default Canvas;