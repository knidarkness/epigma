import assert from 'assert';
import {shapes} from "../../../../src/reducers/editor/shapes";
import {createShape, deleteShape, fetchShapesSuccess, addShapeNode, deleteShapeNode, updateShapeNode, insertShapeNode} from "../../../../src/actions/shape";


describe('Paths reducer tests', function() {
    it('Create new path for empty state', function() {
        const shape = {
            id: 1,
            nodes: [
                [50, 50],
                [200, 50]
            ],
            color: 'black'
        };
        const actual = shapes([], createShape(...Object.values(shape)));
        const expected = [shape];
        assert.deepEqual(actual, expected);
    });
    it('Delete path from the state', function() {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            }
        ];
        const actual = shapes(state, deleteShape(1));
        const expected = [];
        assert.deepEqual(actual, expected);
    });
    it('Fetch shapes successful from the back-end test', function () {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            }
        ];
        const fetchedShapes = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [100, 50],
                    [200, 50]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [100, 50],
                    [100, 50]
                ]
            }
        ];
        const actual = shapes(state, fetchShapesSuccess(fetchedShapes));
        const expected = fetchedShapes;
        assert.deepEqual(actual, expected);
    });
    it('Add shape to non-empty state', function () {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            }
        ];
        const shape = {
            id: 2, 
            nodes: [
                [200, 200]
            ],
            color: 'black'

        };
        const actual = shapes(state, createShape(...Object.values(shape)));
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes:[
                    [50, 50],
                    [200, 50]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes:[
                    [200, 200],
                ]
            }
        ];
        assert.deepEqual(actual, expected);
    });
    it('Add node to shape', function () {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [10, 10],
                    [200, 50]
                ]
            }
  
        ];
        const actual = shapes(state, addShapeNode(2, [200, 200]));
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [10, 10],
                    [200, 50],
                    [200, 200]
                ]
            }
  
        ];
        assert.deepEqual(actual, expected);
    });

    it('Update node in a shape', function () {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [10, 10],
                    [200, 50]
                ]
            }
  
        ];
        const actual = shapes(state, updateShapeNode(2, 1, [200,200]));
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [10, 10],
                    [200, 200]
                ]
            }
  
        ];
        assert.deepEqual(actual, expected);
    });
    it('Delete node from the shape', function () {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [10, 10],
                    [200, 50]
                ]
            }
  
        ];
        const actual = shapes(state, deleteShapeNode(2, 1));
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [10, 10]
                ]
            }
  
        ];
        assert.deepEqual(actual, expected);
    });

    it('Insert node into the shape', function () {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [10, 10],
                    [200, 50]
                ]
            }
  
        ];

        const actual = shapes(state, insertShapeNode(2, 1, [300, 300]));
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [10, 10],
                    [300, 300],
                    [200, 50]
                ]
            }
  
        ];
        assert.deepEqual(actual, expected);
    });
});
