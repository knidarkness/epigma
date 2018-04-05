import React from 'react';
import * as most from 'most'
import {EDITOR_MODE} from "../../const";
import {createSVG} from "../../utils/svg";
import './Canvas.scss';


class Canvas extends React.Component {
    getOffsetedPoint(point) {
        return this.props.viewMatrix.transformPoint(point);
    }

    getNormalizedPoint(point) {
        return this.props.viewMatrix.inverse().transformPoint(point);
    }


    isShape(e){
        return e.target.dataset && 'shapeIndex' in e.target.dataset
    }
    isNode(e){
        return e.target.dataset && 'nodeIndex' in e.target.dataset
    }

    componentWillUnmount(){
        const canvasWillUnmountEvent = new Event('canvasWillUnmountEvent');
        document.dispatchEvent(canvasWillUnmountEvent);
        this.props.clearSelectedShape();
    }

    componentDidMount() {
        this.props.fetchShapes(this.props.documentId);
        this.props.enableMode(EDITOR_MODE.VIEW);

        const canvas = document.querySelector('#canvas');

        const canvasWillUnmount = most.fromEvent('canvasWillUnmountEvent', document);

        const click = most.fromEvent("click", canvas)
            .until(canvasWillUnmount);
        const mousemove = most.fromEvent("mousemove", canvas)
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
            this.props.zoomTo([e.x, e.y], newZoom);
        });

        keydownEnter // save selected shape
            .observe(() => {
                const newShape = this.props.selectedShape.nodes;

                if (newShape.length > 1){
                    this.props.createShape(newShape);
                    this.props.pushShapesToBackend(this.props.documentId, this.props.shapes);
                }

                this.props.enableMode(EDITOR_MODE.VIEW);
                this.props.clearSelectedShape();
                console.log(this.props.selectedShape)
            });

        keydownDelete // delete selected shape
            .observe(e => {
                this.props.deleteShape(this.props.selectedShape)
                this.props.clearSelectedShape();
                this.props.enableMode(EDITOR_MODE.VIEW);
                this.props.pushShapesToBackend(this.props.documentId, this.props.shapes);
            });

        mousemove // save cursor position
            .filter(e => this.props.mode === EDITOR_MODE.DRAW)   
            .observe(cursor => this.props.updateCursorPosition(cursor.x, cursor.y));

        click // draw line
            .filter(e => this.props.mode === EDITOR_MODE.DRAW)
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(node => this.props.selectedShapeAddNode(node));

        click // enter edit mode
            .filter(e => this.props.mode !== EDITOR_MODE.DRAW)
            .filter(e => this.isShape(e))
            .map(e => e.target.dataset.shapeIndex)
            .observe(shapeId => {
                this.props.enableMode(EDITOR_MODE.EDIT);
                const editShape = this.props.shapes.filter(shape => shape.id === shapeId)[0];
                this.props.setSelectedShape(editShape.nodes);
                this.props.deleteShape(shapeId);
            });

        let editNodeIndex = -1;
        mousedown // edit node of the line
            .filter(e => this.props.mode === EDITOR_MODE.EDIT)
            .filter(e => this.isNode(e))
            .chain(md => {
                editNodeIndex = Number(md.target.dataset.nodeIndex);
                return mousemove
                    .until(mouseup);
            })
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(node => this.props.selectedShapeUpdateNode(editNodeIndex, node));

        mousedown // drag&drop canvas
            .filter(e => this.props.mode === EDITOR_MODE.VIEW)
            .chain(md => {
                return mousemove
                    .until(mouseup);
            })
            .observe(e => {
               this.props.shiftCanvas(e.movementX, e.movementY);
            });
    }

    render() {
        const cursor = this.props.cursor;
        const selectedShape = {
            nodes: (this.props.mode === EDITOR_MODE.DRAW && this.props.selectedShape.length !==0) ? [...this.props.selectedShape.nodes, this.getNormalizedPoint(cursor.position)] : this.props.selectedShape.nodes,
            color: this.props.selectedShape.color
        };

        selectedShape.nodes = selectedShape.nodes.map(point => this.getOffsetedPoint(point));

        const shapes = this.props.shapes
            .map(shape => ({
                ...shape,
                nodes: shape.nodes.map(point => this.getOffsetedPoint(point)),
            }));

        return (
            <div>
                <svg id="canvas" className="canvas" width="100%" height="100%" style={{cursor: cursor.icon}}>
                {createSVG(selectedShape, shapes)}
                </svg>
            </div>
        )
    }
}

export default Canvas;