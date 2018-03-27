import React from 'react';
import * as most from 'most'
import v4 from 'uuid/v4';
import {DOCUMENT_LIST_URI} from "../../const";
import mathjs from 'mathjs';

import './Canvas.scss';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
    }

    getOffsetedPoint(point) {
        return mathjs.multiply(this.props.canvasMode.transformMatrix, [point[0],point[1], 1])._data.slice(0,2);
    }

    getNormalizedPoint(point) {
        return mathjs.multiply(mathjs.inv(this.props.canvasMode.transformMatrix), [point[0],point[1], 1])._data.slice(0,2);

    }

    renderPath(path, i = 0) {
        if (path.path.length === 0) return;
        // console.log(path)
        const pathLine = path.path
            .map(point => this.getOffsetedPoint(point))
            .reduce((prev, current) => prev + `${current[0]},${current[1]} `, '');
        return (<polyline data-path-index={i} className="shape" key={i} points={pathLine}
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
            this.props.changeZoom(((e.deltaY > 0) ? 0.01 : -0.01), e.x, e.y);
        });

        keydownEnter
            .observe(() => {
                if (this.props.editedPath.path.length > 0) {
                    let newPath;

                    if (this.props.edit) {
                        newPath = this.props.editedPath.path
                    } else {
                        newPath = this.props.editedPath.path.slice(0, -1)
                    }
                    this.props.editOff();
                    this.props.createPath(newPath);
                    this.props.setEditedPath([]);
                    this.pushPathsToBackend();
                }
            });

        keydownDelete
            .observe(e => {
                this.props.setEditedPath([]);
                this.props.editOff();
                this.pushPathsToBackend();
            });

        doubleclick // animate drawing
            .filter(e => {
                return !(e.target.dataset && 'pathIndex' in e.target.dataset)
            })
            .chain(p => {
                return mousemove
                    .until(keydownEnter)
            })
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(e => this.setTempNode(e[0], e[1]));

        doubleclick // draw line
            .filter(e => {
                return !(e.target.dataset && 'pathIndex' in e.target.dataset)
            })
            .chain(p => {
                this.props.editOff();
                p = this.getNormalizedPoint([p.x, p.y])
                this.addPathNode(p[0],p[1]);
                return click
                    .until(keydownEnter)
            })
            .map(e => this.getNormalizedPoint([e.x, e.y]))
            .observe(e => this.addPathNode(e[0], e[1]));


        doubleclick // enter edit mode
            .filter(e => {
                return e.target.dataset && 'pathIndex' in e.target.dataset;
            })
            .observe(e => {
                this.props.editOn();

                const editPath = this.props.paths[Number(e.target.dataset.pathIndex)];
                this.props.setEditedPath(editPath.path);

                this.props.deletePath(Number(e.target.dataset.pathIndex));
            });

        let editNode = -1;
        mousedown // edit node of the line
            .filter(e => e.target.dataset && 'nodeIndex' in e.target.dataset)
            .chain(md => {
                editNode = Number(md.target.dataset.nodeIndex);
                return mousemove
                    .until(mouseup);
            })
            //.filter(e => e.target.dataset && 'nodeIndex' in e.target.dataset)
            .observe(e => {
                const newEditPath = this.props.editedPath.path;
                newEditPath[editNode] = this.getNormalizedPoint([e.x, e.y]);
                this.props.setEditedPath(newEditPath);
            });

        keydown // scroll canvas
            .map(e => e.code)
            .filter(e => {
                return e === 'ArrowLeft' ||
                    e === 'ArrowRight' ||
                    e === 'ArrowUp' ||
                    e === 'ArrowDown';
            })
            .observe((e) => {
                switch (e) {
                    case 'ArrowLeft':
                        this.props.shiftCanvas(10, 0);
                        break;
                    case 'ArrowRight':
                        this.props.shiftCanvas(-10, 0);
                        break;
                    case 'ArrowUp':
                        this.props.shiftCanvas(0, 10);
                        break;
                    case 'ArrowDown':
                        this.props.shiftCanvas(0, -10);
                        break;
                    default:
                        break;
                }
            });
    }

    undo(){
        this.props.undo();
    }

    render() {
        return (
            <div>
                <svg id="canvas" className="canvas" width="100%" height="100%">
                    {this.renderPath(this.props.editedPath, 0, false)}
                    {this.renderPathNodes(this.props.editedPath.path)}
                    {this.renderAllSaved()}
                </svg>
            </div>
        )
    }
}

export default Canvas;