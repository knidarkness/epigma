import React from 'react';
import * as most from 'most'
import v4 from 'uuid/v4';
import {DOCUMENT_LIST_URI} from "../../const";
import mathjs from 'mathjs';

import './Canvas.scss';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderPaths: [
                {
                    id: 1,
                    color: 'black',
                    path: [
                        [50, 50, 1],
                        [200, 50, 1],
                        [200, 200, 1],
                        [50, 200, 1],
                        [50, 50, 1]

                    ]
                },
                {
                    id: 2,
                    color: 'red',
                    path: [
                        [350, 50, 1],
                        [500, 50, 1],
                        [500, 200, 1],
                        [350, 200, 1],
                        [350, 50, 1]

                    ]
                },
                {
                    id: 3,
                    color: 'green',
                    path: [
                        [200, 250, 1],
                        [350, 250, 1],
                        [350, 400, 1],
                        [200, 400, 1],
                        [200, 250, 1]

                    ]
                }
            ],
            viewportCenter: [
                412,
                260
            ]
        };
    }

    getOffsetedPoint(point) {
        const x = (point[0] + this.props.canvasMode.canvasShift.x) * this.props.canvasMode.zoom;
        const y = (point[1] + this.props.canvasMode.canvasShift.y) * this.props.canvasMode.zoom;
        return [x, y];
    }

    getNormalizedPoint(point) {
        const x = (point[0] / this.props.canvasMode.zoom) - this.props.canvasMode.canvasShift.x;
        const y = (point[1] / this.props.canvasMode.zoom) - this.props.canvasMode.canvasShift.y;
        return [x, y];
    }

    renderPath(path, i = 0) {
        if (path.path.length === 0) return;

        const pathLine = path.path
            .map(point => mathjs.multiply(this.props.canvasMode.transformMatrix, point)._data)
            .reduce((prev, current) => prev + `${current[0]},${current[1]} `, '');
        return (<polyline data-path-index={i} className="shape" key={i} points={pathLine}
                          style={{fill: 'none', stroke: path.color, strokeWidth: '3'}}/>);
    }
    
    renderAllSaved() {
        return this.state.renderPaths.map((path, id) => this.renderPath(path, id));
        //return this.props.paths.map((path, id) => this.renderPath(path, id));
    }

    renderPathNodes(path) {
        return path.map((point, i) => {
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

        wheel
            .observe(e => {
                const mouseOffset = [
                    e.x - this.state.viewportCenter[0],
                    e.y - this.state.viewportCenter[1]
                ];

                this.props.changeZoom(((e.deltaY > 0) ? 0.01 : -0.01), e.x, e.y);
            });

        keydownEnter
            .observe(() => {
                if (this.props.editedPath.path.length > 0) {
                    let newPath;

                    if (this.props.edit) {
                        newPath = this.props.editedPath.path.map(point => {
                            return this.getNormalizedPoint(point);
                        });
                    } else {
                        newPath = this.props.editedPath.path.slice(0, -1).map(point => {
                            return this.getNormalizedPoint(point);
                        });
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
            .map(e => [e.x, e.y])
            .observe(e => this.setTempNode(e[0], e[1]));

        doubleclick // draw line
            .filter(e => {
                return !(e.target.dataset && 'pathIndex' in e.target.dataset)
            })
            .chain(p => {
                this.props.editOff();
                this.addPathNode(p.x, p.y);
                return click
                    .until(keydownEnter)
            })
            .map(e => [e.x, e.y])
            .observe(e => this.addPathNode(e[0], e[1]));


        doubleclick // enter edit mode
            .filter(e => {
                return e.target.dataset && 'pathIndex' in e.target.dataset;
            })
            .observe(e => {
                this.props.editOn();

                const editPath = this.props.paths[Number(e.target.dataset.pathIndex)];
                this.props.setEditedPath(editPath.path.map(point => {
                    return this.getOffsetedPoint(point)
                }));

                this.props.deletePath(Number(e.target.dataset.pathIndex));
            });

        mousedown // edit node of the line
            .filter(e => e.target.dataset && 'nodeIndex' in e.target.dataset)
            .chain(md => {
                return mousemove
                    .until(mouseup);
            })
            .filter(e => e.target.dataset && 'nodeIndex' in e.target.dataset)
            .observe(e => {
                const newEditPath = this.props.editedPath.path;
                newEditPath[Number(e.target.dataset.nodeIndex)] = [e.x, e.y];
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

    render() {
        return (
            <svg id="canvas" className="canvas" width="100%" height="100%">
                {this.renderPath(this.props.editedPath, 0, false)}
                {this.renderPathNodes(this.props.editedPath.path)}
                {this.renderAllSaved()}
            </svg>
        )
    }
}

export default Canvas;