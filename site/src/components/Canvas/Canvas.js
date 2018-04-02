import React from 'react';
import * as most from 'most'
import v4 from 'uuid/v4';
import {DOCUMENT_LIST_URI, EDITOR_MODE} from "../../const";
import Matrix from '../../utils/matrix.js';

import './Canvas.scss';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
    }

    getOffsetedPoint(point) {
        return this.props.viewMatrix.transformPoint(point);
    }

    getNormalizedPoint(point) {
        return this.props.viewMatrix.inverse().transformPoint(point);
    }

    renderShape(shape, i = 0) {
        if (shape.nodes.length === 0) return;
        const shapeNodesPath = shape.nodes
            .map(point => this.getOffsetedPoint(point))
            .reduce((prev, current) => prev + `${current[0]},${current[1]} `, '');
        return (<polyline data-shape-index={shape.id} className="shape" key={i} points={shapeNodesPath}
                          style={{fill: 'none', stroke: shape.color, strokeWidth: '3'}}/>);
    }

    renderAllSaved() {
        return this.props.shapes.map((shape, id) => this.renderShape(shape, id));
    }

    renderShapeNodes(shape) {
        return shape
            .map(point => this.getOffsetedPoint(point))
            .map((point, i) => {
                return <circle data-node-index={i} cx={point[0]} cy={point[1]} r="5" key={v4()} stroke="black"
                            strokeWidth="3" fill="red"/>
        })
    }

    isShape(e){
        return e.target.dataset && 'shapeIndex' in e.target.dataset
    }
    isNode(e){
        return e.target.dataset && 'nodeIndex' in e.target.dataset
    }


    pushShapesToBackend() {
        const request = new Request(DOCUMENT_LIST_URI + '/' + this.props.documentId + '/shapes/', {
            method: 'PUT',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({
                shapes: this.props.shapes
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        fetch(request);
    }

    componentWillUnmount(){
        const canvasWillUnmountEvent = new Event('canvasWillUnmountEvent');
        document.dispatchEvent(canvasWillUnmountEvent);
    }

    componentDidMount() {
        this.props.fetchShapes(this.props.documentId);

        let alreadyDrawing = false;

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


        wheel.observe(e => {
            const newZoom = Math.max(this.props.zoom + ((e.deltaY > 0) ? 0.01 : -0.01), 0.5);
            this.props.zoomTo([e.x, e.y], newZoom);
        });

        keydownEnter
            .observe(() => {
                const newShape = this.props.selectedShape.nodes;

                if (newShape.length > 1){
                    this.props.createShape(newShape);
                    this.pushShapesToBackend();
                }

                this.props.editOff();
                this.props.setSelectedShape([]);

                alreadyDrawing = false;
            });

        keydownDelete
            .observe(e => {
                this.props.setSelectedShape([]);
                this.props.editOff();
                this.pushShapesToBackend();
            });

        click // delete shape
            .filter(e => this.props.mode === EDITOR_MODE.DELETE)
            .filter(e => this.isShape(e))
            .observe(e => {
                this.props.deleteShape(e.target.dataset.shapeIndex);
                this.pushShapesToBackend();
            });

        mousemove 
            .filter(e => this.props.mode === EDITOR_MODE.DRAW)   
            .observe(cursor => this.props.updateCursorPosition(cursor.x, cursor.y));

        click // draw line
            .filter(e => this.props.mode === EDITOR_MODE.DRAW && !alreadyDrawing)
            .filter(e => !this.isShape(e))
            .chain(p => {
                alreadyDrawing = true;
                this.props.editOff();
                let node = this.getNormalizedPoint([p.x, p.y]);
                this.props.selectedShapeAddNode(node);
                return click
                    .until(keydownEnter)
            })
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(node => this.props.selectedShapeAddNode(node));


        click // enter edit mode
            .filter(e => this.props.mode === EDITOR_MODE.DRAW && !alreadyDrawing)
            .filter(e => this.isShape(e))
            .map(e => e.target.dataset.shapeIndex)
            .observe(shapeIndex => {
                alreadyDrawing = true;
                this.props.editOn();
                const editShape = this.props.shapes.filter(shape => shape.id === shapeIndex)[0];
                this.props.setSelectedShape(editShape.nodes);
                this.props.deleteShape(shapeIndex);
            });
        let editNodeIndex = -1
        mousedown // edit node of the line
            .filter(e => this.props.mode === EDITOR_MODE.DRAW)
            .filter(e => this.isNode(e))
            .chain(md => {
                let editNodeIndex = Number(md.target.dataset.nodeIndex);
                return mousemove
                    .until(mouseup);
            })
            .observe(e => {
                this.props.selectedShapeUpdateNode(editNodeIndex, this.getNormalizedPoint([e.x, e.y]));
            });

        mousedown
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
            nodes: (this.props.mode === EDITOR_MODE.DRAW) ? [...this.props.selectedShape.nodes, this.getNormalizedPoint(cursor.position)] : this.props.selectedShape.nodes,
            color: this.props.selectedShape.color
        }
        return (
            <div>
                <svg id="canvas" className="canvas" width="100%" height="100%" style={{cursor: cursor.icon}}>
                    {this.renderShape(selectedShape, 0, false)}
                    {this.renderShapeNodes(selectedShape.nodes)}
                    {this.renderAllSaved()}
                </svg>
            </div>
        )
    }
}

export default Canvas;