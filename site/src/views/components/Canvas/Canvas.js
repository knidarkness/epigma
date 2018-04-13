import React from 'react';
import * as most from 'most';
import PropTypes from 'prop-types';

import { EDITOR_MODE, CURSOR } from 'const';
import { createSVG } from 'utils/svg';

import Matrix from 'utils/matrix';

import './Canvas.scss';
import API from 'api';

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
            .filter(() => this.props.mode === EDITOR_MODE.DRAW)
            .observe(() => {
                if (this.props.selectedShape !== '') {
                    const newShape = this.props.shapes.filter(shape => shape.id === this.props.selectedShape)[0];
                    if (newShape.nodes.length > 1) {
                        API.createShape(this.props.documentId, newShape);
                    }
                }

                this.props.changeMode(EDITOR_MODE.SELECT);
            });


        keydownEnter // save selected shape
            .filter(() => this.props.mode === EDITOR_MODE.EDIT)
            .observe(() => {
                const newShape = this.props.shapes.filter(shape => shape.id === this.props.selectedShape)[0];
                if (newShape.nodes.length > 1) {
                    API.updateShape(this.props.documentId, newShape);

                }

                this.props.changeMode(EDITOR_MODE.SELECT);
            });

        keydownDelete // delete selected shape
            .filter(() => this.props.mode === EDITOR_MODE.EDIT)
            .observe(() => {
                API.deleteShape(this.props.documentId, this.props.selectedShape);
                this.props.deleteShape(this.props.selectedShape);
                this.props.changeMode(EDITOR_MODE.SELECT);
            });

        mousemove // save cursor position
            .filter(() => this.props.mode === EDITOR_MODE.DRAW)
            .observe(cursor => this.updateCursorPosition(cursor.x, cursor.y));

        click // draw line
            .filter(() => this.props.mode === EDITOR_MODE.DRAW)
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(node => {
                if (this.props.selectedShape === '') {
                    this.props.createShape();
                    this.props.setSelectedShape(this.props.shapes[this.props.shapes.length - 1].id);
                }
                this.props.addShapeNode(this.props.selectedShape, node);
            });

        click // enter edit mode
            .filter(() => this.props.mode === EDITOR_MODE.SELECT)
            .filter(e => this.isShape(e))
            .map(e => e.target.dataset.shapeIndex)
            .observe(shapeId => {
                this.props.changeMode(EDITOR_MODE.EDIT);
                this.props.setSelectedShape(shapeId);
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
            .observe(node => this.props.updateShapeNode(this.props.selectedShape, editNodeIndex, node));

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

    render() {
        const cursor = this.props.cursor;
        const shapes = this.props.shapes
            .map(shape => ({
                ...shape,
                nodes: this.props.mode === EDITOR_MODE.DRAW && shape.id === this.props.selectedShape ? 
                    [...shape.nodes, this.getNormalizedPoint(this.state.cursorPosition)] : 
                    shape.nodes

            }))
            .map(shape => ({
                ...shape,
                nodes: shape.nodes.map(point => this.getOffsetedPoint(point)),
                strokeWidth: shape.strokeWidth * this.props.zoom
            }));

        return (
            <div>
                <svg id="canvas" className="canvas" width="100%" height="100%" style={{ cursor }}>
                    {createSVG(this.props.selectedShape, shapes)}
                </svg>
            </div>
        );
    }
}

Canvas.propTypes = {
    viewMatrix: PropTypes.instanceOf(Matrix),
    clearSelectedShape: PropTypes.func.isRequired,
    fetchShapes: PropTypes.func.isRequired,
    documentId: PropTypes.string.isRequired,
    changeMode: PropTypes.func.isRequired,
    zoom: PropTypes.number.isRequired,
    zoomCanvas: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(Object.values(EDITOR_MODE)),
    selectedShape: PropTypes.string,
    shapes: PropTypes.array.isRequired,
    deleteShape: PropTypes.func.isRequired,
    createShape: PropTypes.func.isRequired,
    setSelectedShape: PropTypes.func.isRequired,
    addShapeNode: PropTypes.func.isRequired,
    updateShapeNode: PropTypes.func.isRequired,
    shiftCanvas: PropTypes.func.isRequired,
    cursor: PropTypes.oneOf(Object.values(CURSOR))
};

export default Canvas;