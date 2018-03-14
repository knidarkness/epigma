import React from 'react';
import * as most from 'most'
import v4 from 'uuid/v4';

class Canvas extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            editLine: [],
            paths: [],
            canvasProperties: {
                canvasShift: {
                    x: 0,
                    y: 0,
                },
                zoom: 1
            },
            edit: false
        };
    }

    getOffsetedPoint (point) {
        const x = (point[0] + this.state.canvasProperties.canvasShift.x) * this.state.canvasProperties.zoom;
        const y = (point[1] + this.state.canvasProperties.canvasShift.y) * this.state.canvasProperties.zoom;
        return [x, y];
    }

    getNormalizedPoint (point) {
        const x = (point[0] / this.state.canvasProperties.zoom) - this.state.canvasProperties.canvasShift.x;
        const y = (point[1] / this.state.canvasProperties.zoom) - this.state.canvasProperties.canvasShift.y;
        return [x, y];
    }

    renderPath(path, i=0, offset=true) {
        if (path.length === 0) return;
        let pathLine = '';
        for (let i in path){
            if (offset) {
                const offsetedPoint = this.getOffsetedPoint(path[i]);
                pathLine += `${offsetedPoint[0]},${offsetedPoint[1]} `;
            } else {
                pathLine += `${path[i][0]},${path[i][1]} `;
            }
        }
        return (<polyline data-path-index={i} className="shape" key={i} points={pathLine} style={{fill: 'none', stroke:'black', strokeWidth:'3'}}/>);
    }

    renderAllSaved() {
        return this.state.paths.map((path, id) => this.renderPath(path, id));
    }

    renderPathNodes(path) {
        return path.map((point, i) => {
            return <circle data-node-index={i} cx={point[0]} cy={point[1]} r="5" key={v4()} stroke="black" strokeWidth="3" fill="red"/>
        })
    }

    addPathNode (x, y) {
        const newEditLine = [...this.state.editLine, [x, y]];
        this.setState({editLine: newEditLine});
    }

    setTempNode  (x, y) {
        const newEditLine = this.state.editLine.slice(0, -1);
        this.setState({editLine: [...newEditLine, [x, y]]});
    }

    shiftCanvas (dX, dY){
        this.setState((state, props) => {
            return {
                canvasProperties: {
                    canvasShift: {
                        x: state.canvasProperties.canvasShift.x + dX,
                        y: state.canvasProperties.canvasShift.y + dY
                    },
                    zoom: state.canvasProperties.zoom
                }
            }
        });
    }

    componentDidMount() {
        const click = most.fromEvent("click", document);
        const mousemove = most.fromEvent("mousemove", document);
        const mousedown = most.fromEvent('mousedown', document);
        const mouseup = most.fromEvent('mouseup', document);
        const doubleclick = most.fromEvent("dblclick", document);
        const keydown = most.fromEvent('keydown', document);
        const wheel = most.fromEvent('wheel', document);

        wheel
            .map(e => e.deltaY)
            .observe(e => {
                this.setState((state) => {
                    return {
                        canvasProperties: {
                            canvasShift: {
                                x: state.canvasProperties.canvasShift.x,
                                y: state.canvasProperties.canvasShift.y
                            },
                            zoom: this.state.canvasProperties.zoom + ((e > 0) ? 0.01 : -0.01)
                        }
                    }
                });
            });

        keydown
            .filter(e => e.key === 'Enter' || e.key === 'Escape')
            .map(e => {
                console.log(this.state);
                if (this.state.editLine.length > 0){
                    let newPath;
                    if (this.state.edit){
                        newPath = this.state.editLine.map(point => {
                            return this.getNormalizedPoint(point);
                        });
                    } else {
                        newPath = this.state.editLine.slice(0, -1).map(point => {
                            return this.getNormalizedPoint(point);
                        });
                    }
                    const paths = [...this.state.paths, newPath];
                    this.setState({
                        editLine: [],
                        paths: paths,
                        edit: false
                    });
                }
                return e;
            })
            .observe(console.log);

        const keydownEnter = most.fromEvent("keydown", document)
            .filter(e => e.key === 'Enter')
            .map(e => {
                if (this.state.editLine.length > 0){
                    const newPath = this.state.editLine.slice(0, -1).map(point => {
                        return this.getNormalizedPoint(point);
                    });
                    const paths = [...this.state.paths, newPath];
                    this.setState({
                        editLine: [],
                        paths: paths
                    });
                }
                return e;
            });

        doubleclick // animate drawing
            .filter(e => {return !(e.target.dataset && 'pathIndex' in e.target.dataset)})
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
                this.setState({
                    edit: false
                });
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
                this.setState({
                    edit: true
                });


                console.log(e.target.dataset.pathIndex);
                console.log(e.target.dataset.pathIndex + 1);
                console.log(this.state.paths);

                const paths = [
                    ...this.state.paths.slice(0, Number(e.target.dataset.pathIndex)),
                    ...this.state.paths.slice(Number(e.target.dataset.pathIndex) + 1)
                ];

                console.log(paths);

                const editLine = this.state.paths[Number(e.target.dataset.pathIndex)];
                this.setState({
                    paths: paths,
                    editLine: editLine.map(point => {
                        return this.getOffsetedPoint(point)
                    })
                });
            });

        mousedown // edit node of the line
            .filter(e => e.target.dataset && 'nodeIndex' in e.target.dataset)
            .chain(md => {
                return mousemove
                    .until(mouseup);
            })
            .filter(e => e.target.dataset && 'nodeIndex' in e.target.dataset)
            .observe(e => {
                const newEditLine = this.state.editLine;
                newEditLine[Number(e.target.dataset.nodeIndex)] = [e.x, e.y];
                this.setState({
                    editLine: newEditLine
                });
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
                switch (e){
                    case 'ArrowLeft':
                        this.shiftCanvas(10, 0);
                        break;
                    case 'ArrowRight':
                        this.shiftCanvas(-10, 0);
                        break;
                    case 'ArrowUp':
                        this.shiftCanvas(0, 10);
                        break;
                    case 'ArrowDown':
                        this.shiftCanvas(0, -10);
                        break;
                    default:
                        break;
                }
            });
    }

    render () {
        return (
            <svg id="canvas" width="100%" height="100%">
                {this.renderPath(this.state.editLine, 0, false)}
                {this.renderPathNodes(this.state.editLine)}
                {this.renderAllSaved()}
            </svg>
        )
    }
}

export default Canvas;