import assert from 'assert';
import {shapes} from "../../../../src/reducers/editor/shapes";
import * as actionTypes from '../../../../src/actions/actionTypes';


describe('Paths reducer tests', function() {
    it('Create new path for empty state', function() {
        const action = {
            type: actionTypes.CREATE_SHAPE,
            id: 1,
            color: 'black',
            nodes: [
                [50, 50],
                [200, 50]
            ]
        };
        const actual = shapes([], action);
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ]
            }
        ];
        assert.deepEqual(actual, expected);
    });
    it('Delete path from the state', function() {
        const action = {type: actionTypes.DELETE_SHAPE, id: 1};
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
        const actual = shapes(state, action);
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
        const fetchedPaths = [
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
        const action = {
            type: actionTypes.FETCH_SHAPES,
            shapes: fetchedPaths
        };
        const actual = shapes(state, action);
        const expected = fetchedPaths;
        assert.deepEqual(actual, expected);
    });
    it('Add path to non-empty state', function () {
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
        const action = {
            type: actionTypes.CREATE_SHAPE, 
            id: 2, 
            color: 'black', 
            nodes: [
                [200, 200]
            ]
        };
        const actual = shapes(state, action);
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
        const action = {
            type: actionTypes.SHAPE_ADD_NODE, 
            shape_id: 2, 
            node: [200, 200]
            
        };
        const actual = shapes(state, action);
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
        const action = {
            type: actionTypes.SHAPE_UPDATE_NODE, 
            shape_id: 2, 
            index: 1,
            node: [200, 200]
        };
        const actual = shapes(state, action);
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
        const action = {
            type: actionTypes.SHAPE_DELETE_NODE, 
            shape_id: 2,
            index: 1
        };
        const actual = shapes(state, action);
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
        const action = {
            type: actionTypes.SHAPE_INSERT_NODE, 
            shape_id: 2,
            index: 1,
            node: [300, 300]
        };
        const actual = shapes(state, action);
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
