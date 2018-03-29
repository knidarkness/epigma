import React from 'react';
import * as most from 'most'
import v4 from 'uuid/v4';
import {DOCUMENT_LIST_URI, VIEW_MODE, DRAW_MODE, DELETE_MODE} from "../../const";
import mathjs from 'mathjs';

import './Canvas.scss';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
    }

    getOffsetedPoint(point) {
        return mathjs.multiply(this.props.canvasMode.viewMatrix, [point[0],point[1], 1])._data.slice(0,2);
    }

    getNormalizedPoint(point) {
        return mathjs.multiply(mathjs.inv(this.props.canvasMode.viewMatrix), [point[0], point[1], 1])._data.slice(0,2);
    }

    renderPath(path, i = 0) {
        if (path.path.length === 0) return;
        const pathLine = path.path
            .map(point => this.getOffsetedPoint(point))
            .reduce((prev, current) => prev + `${current[0]},${current[1]} `, '');
        return (<polyline data-path-index={path.id} className="shape" key={i} points={pathLine}
                          style={{fill: 'none', stroke: path.color, strokeWidth: '3'}}/>);
    }

    renderAllSaved() {
        return this.props.paths.map((path, id) => this.renderPath(path, id));
    }

    renderPathNodes(path) {
        return path
            .map(point => this.getOffsetedPoint(point))
            .map((point, i) => {
                return <circle data-node-index={i} cx={point[0]} cy={point[1]} r="5" key={v4()} stroke="black"
                            strokeWidth="3" fill="red"/>
        })
    }

    addPathNode(x, y) {
        const newEditPath = [...this.props.editedPath.path, [x, y]];
        this.props.setEditedPath(newEditPath);
    }

    setTempNode(x, y) {
        const newEditPath = this.props.editedPath.path.slice(0, -1);
        this.props.setEditedPath([...newEditPath, [x, y]]);
    }


    pushPathsToBackend() {
        const request = new Request(DOCUMENT_LIST_URI + '/' + this.props.documentId + '/paths/', {
            method: 'PUT',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({
                paths: this.props.paths
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request);
    }

    componentDidMount() {
        this.props.fetchPaths(this.props.documentId);

        let alreadyDrawing = false;
        const canvas = document.querySelector('#canvas');
        const click = most.fromEvent("click", canvas);
        const mousemove = most.fromEvent("mousemove", document);
        const mousedown = most.fromEvent('mousedown', document);
        const mouseup = most.fromEvent('mouseup', document);
        const doubleclick = most.fromEvent("dblclick", canvas);
        const keydown = most.fromEvent('keydown', document);
        const keydownDelete = most.fromEvent('keydown', document)
            .filter(e => {
                return e.key === 'Delete' || e.key === 'r'
            });
        const keydownEnter = keydown
            .filter(e => e.key === 'Enter' || e.key === 'Escape')
        ;
        const wheel = most.fromEvent('wheel', document);

        wheel.observe(e => {
            this.props.zoomTo(((e.deltaY > 0) ? 0.01 : -0.01), e.x, e.y);
        });

        keydownEnter
            .observe(() => {
                let newPath;

                if (this.props.edit) {
                    newPath = this.props.editedPath.path
                } else {
                    newPath = this.props.editedPath.path.slice(0, -1)
                }

                if (newPath.length > 1){
                    this.props.createPath(newPath);
                    this.pushPathsToBackend();
                }

                this.props.editOff();
                this.props.setEditedPath([]);

                alreadyDrawing = false;
            });

        keydownDelete
            .observe(e => {
                this.props.setEditedPath([]);
                this.props.editOff();
                this.pushPathsToBackend();
            });

        click // delete shape
            .filter(e => this.props.editorMode === DELETE_MODE)
            .filter(e => e.target.dataset && 'pathIndex' in e.target.dataset)
            .observe(e => {
                this.props.deletePath(e.target.dataset.pathIndex);
                this.pushPathsToBackend();
            });

        click // animate drawing
            .filter(e => this.props.editorMode === DRAW_MODE)
            .filter(e => {
                return !(e.target.dataset && 'pathIndex' in e.target.dataset)
            })
            .chain(p => {
                return mousemove
                    .until(keydownEnter)
            })
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(e => this.setTempNode(e[0], e[1]));

        click // draw line
            .filter(e => this.props.editorMode === DRAW_MODE && !alreadyDrawing)
            .filter(e => {
                return !(e.target.dataset && 'pathIndex' in e.target.dataset)
            })
            .chain(p => {
                alreadyDrawing = true;
                this.props.editOff();
                p = this.getNormalizedPoint([p.x, p.y]);
                this.addPathNode(p[0],p[1]);
                return click
                    .until(keydownEnter)
            })
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(e => this.addPathNode(e[0], e[1]));


        click // enter edit mode
            .filter(e => this.props.editorMode === DRAW_MODE && !alreadyDrawing)
            .filter(e => e.target.dataset && 'pathIndex' in e.target.dataset)
            .observe(e => {
                alreadyDrawing = true;
                this.props.editOn();
                const editPath = this.props.paths.filter(path => path.id === e.target.dataset.pathIndex)[0];
                this.props.setEditedPath(editPath.path);

                this.props.deletePath(e.target.dataset.pathIndex);
            });

        let editNode = -1;
        mousedown // edit node of the line
            .filter(e => this.props.editorMode === DRAW_MODE)
            .filter(e => e.target.dataset && 'nodeIndex' in e.target.dataset)
            .chain(md => {
                editNode = Number(md.target.dataset.nodeIndex);
                return mousemove
                    .until(mouseup);
            })
            .observe(e => {
                const newEditPath = this.props.editedPath.path;
                newEditPath[editNode] = this.getNormalizedPoint([e.x, e.y]);
                this.props.setEditedPath(newEditPath);
            });

        mousedown
            .filter(e => this.props.editorMode === VIEW_MODE)
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
        switch (this.props.editorMode){
            case (DRAW_MODE):
                activeCursor = 'crosshair';
                break;
            case (VIEW_MODE):
                activeCursor = 'grab';
                break;
            case (DELETE_MODE):
                activeCursor = 'crosshair';
                break;
            default:
                activeCursor = 'auto';
        }
        return (
            <div>
                <svg id="canvas" className="canvas" width="100%" height="100%" style={{cursor: activeCursor}}>
                    {this.renderPath(this.props.editedPath, 0, false)}
                    {this.renderPathNodes(this.props.editedPath.path)}
                    {this.renderAllSaved()}
                </svg>
            </div>
        )
    }
}

export default Canvas;