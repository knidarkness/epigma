import React from 'react';
import * as most from 'most'
import v4 from 'uuid/v4';
import {DOCUMENT_LIST_URI, EDITOR_MODES} from "../../const";
import mathjs from 'mathjs';

import './Canvas.scss';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
    }

    getOffsetedPoint(point) {
        return mathjs.multiply(this.props.viewMatrix, [point[0],point[1], 1])._data.slice(0,2);
    }

    getNormalizedPoint(point) {
        return mathjs.multiply(mathjs.inv(this.props.viewMatrix), [point[0], point[1], 1])._data.slice(0,2);
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

    addShapeNode(x, y) {
        const newSelectedShape = [...this.props.selectedShape.nodes, [x, y]];
        this.props.setSelectedShape(newSelectedShape);
    }

    setTempNode(x, y) {
        const newSelectedShape = this.props.selectedShape.nodes.slice(0, -1);
        this.props.setSelectedShape([...newSelectedShape, [x, y]]);
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
        const keydownDelete = most.fromEvent('keydown', document)
            .filter(e => {
                return e.key === 'Delete' || e.key === 'r'
            });
        const keydownEnter = keydown
            .filter(e => e.key === 'Enter' || e.key === 'Escape')
        ;
        const wheel = most.fromEvent('wheel', document)
            .until(canvasWillUnmount);


        wheel.observe(e => {
            this.props.zoomTo(((e.deltaY > 0) ? 0.01 : -0.01), e.x, e.y);
        });

        keydownEnter
            .observe(() => {
                let newShape;

                if (this.props.edit) {
                    newShape = this.props.selectedShape.nodes
                } else {
                    newShape = this.props.selectedShape.nodes.slice(0, -1)
                }
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
            .filter(e => this.props.mode === EDITOR_MODES.DELETE_MODE)
            .filter(e => e.target.dataset && 'shapeIndex' in e.target.dataset)
            .observe(e => {
                this.props.deleteShape(e.target.dataset.shapeIndex);
                this.pushShapesToBackend();
            });

        click // animate drawing
            .filter(e => this.props.mode === EDITOR_MODES.DRAW_MODE)
            .filter(e => {
                return !(e.target.dataset && 'shapeIndex' in e.target.dataset)
            })
            .chain(p => {
                return mousemove
                    .until(keydownEnter)
            })
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(e => this.setTempNode(e[0], e[1]));

        click // draw line
            .filter(e => this.props.mode === EDITOR_MODES.DRAW_MODE && !alreadyDrawing)
            .filter(e => {
                return !(e.target.dataset && 'shapeIndex' in e.target.dataset)
            })
            .chain(p => {
                alreadyDrawing = true;
                this.props.editOff();
                p = this.getNormalizedPoint([p.x, p.y]);
                this.addShapeNode(p[0],p[1]);
                return click
                    .until(keydownEnter)
            })
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(e => this.addShapeNode(e[0], e[1]));


        click // enter edit mode
            .filter(e => this.props.mode === EDITOR_MODES.DRAW_MODE && !alreadyDrawing)
            .filter(e => e.target.dataset && 'shapeIndex' in e.target.dataset)
            .observe(e => {
                alreadyDrawing = true;
                this.props.editOn();
                const editShape = this.props.shapes.filter(shape => shape.id === e.target.dataset.shapeIndex)[0];
                this.props.setSelectedShape(editShape.nodes);

                this.props.deleteShape(e.target.dataset.shapeIndex);
            });

        let editNode = -1;
        mousedown // edit node of the line
            .filter(e => this.props.mode === EDITOR_MODES.DRAW_MODE)
            .filter(e => e.target.dataset && 'nodeIndex' in e.target.dataset)
            .chain(md => {
                editNode = Number(md.target.dataset.nodeIndex);
                return mousemove
                    .until(mouseup);
            })
            .observe(e => {
                const newSelectedShape = this.props.selectedShape.nodes;
                newSelectedShape[editNode] = this.getNormalizedPoint([e.x, e.y]);
                this.props.setSelectedShape(newSelectedShape);
            });

        mousedown
            .filter(e => this.props.mode === EDITOR_MODES.VIEW_MODE)
            .chain(md => {
                return mousemove
                    .until(mouseup);
            })
            .observe(e => {
               this.props.shiftCanvas(e.movementX, e.movementY);
            });
    }

    render() {
        let activeCursor ;
        switch (this.props.mode){
            case (EDITOR_MODES.DRAW_MODE):
                activeCursor = 'crosshair';
                break;
            case (EDITOR_MODES.VIEW_MODE):
                activeCursor = 'grab';
                break;
            case (EDITOR_MODES.DELETE_MODE):
                activeCursor = 'crosshair';
                break;
            default:
                activeCursor = 'auto';
        }
        return (
            <div>
                <svg id="canvas" className="canvas" width="100%" height="100%" style={{cursor: activeCursor}}>
                    {this.renderShape(this.props.selectedShape, 0, false)}
                    {this.renderShapeNodes(this.props.selectedShape.nodes)}
                    {this.renderAllSaved()}
                </svg>
            </div>
        )
    }
}

export default Canvas;