import assert from 'assert';
import {shapes as reducer} from 'state/editor/shapes/reducers';
import {shapesOperations} from 'state/editor/shapes';
import * as shapesActions from 'state/editor/shapes/actions';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {DOCUMENT_LIST_URI} from 'const';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Shapes actions tests', () => {
    it('Creates SHAPE_FETCH_SUCCESS when shapes have been successfully fetched', () => {
        fetchMock
            .getOnce(`${DOCUMENT_LIST_URI }/1/shapes/`, { 
                status: 200,
                body: {shapes: [{'id':'1', 'nodes':[[1, 1], [2, 3]], 'color':'black'}]}
            });
  
        const expectedActions = [shapesActions.fetchShapesSuccess([{'id':'1', 'nodes':[[1, 1], [2, 3]], 'color':'black'}])];
        const store = mockStore({});
        const action = shapesOperations.fetchShapes('1');
        const actualActions = store.getActions();

        return store.dispatch(action).then(() => {
            assert.deepEqual(actualActions, expectedActions);
        });
    });
});

describe('Shapes reducer tests', () => {
    it('Create new shape for empty state', () => {
        const shape = {
            id: 1,
            nodes: [
                [50, 50],
                [200, 50]
            ],
            color: 'black',
            strokeWidth: 2
        };
        const actual = reducer([], shapesOperations.createShape(...Object.values(shape)));
        const expected = [shape];
        assert.deepEqual(actual, expected);
    });
    it('Delete shape from the state', () => {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ],
                strokeWidth: 2
            }
        ];
        const actual = reducer(state, shapesOperations.deleteShape(1));
        const expected = [];
        assert.deepEqual(actual, expected);
    });
    it('Fetch shapes successful from the back-end test', () => {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ],
                strokeWidth: 2
            }
        ];
        const fetchedShapes = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [100, 50],
                    [200, 50]
                ],
                strokeWidth: 2

            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [100, 50],
                    [100, 50]
                ],
                strokeWidth: 2
            }
        ];
        const actual = reducer(state, shapesActions.fetchShapesSuccess(fetchedShapes));
        const expected = fetchedShapes;
        assert.deepEqual(actual, expected);
    });
    it('Add shape to non-empty state', () => {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ],
                strokeWidth: 2
            }
        ];
        const shape = {
            id: 2, 
            nodes: [[200, 200]],
            color: 'black',
            strokeWidth: 2
        };
        const actual = reducer(state, shapesOperations.createShape(...Object.values(shape)));
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes:[
                    [50, 50],
                    [200, 50]
                ],
                strokeWidth: 2

            },
            {
                id: 2,
                color: 'black',
                nodes:[[200, 200]],
                strokeWidth: 2
            }
        ];
        assert.deepEqual(actual, expected);
    });
    it('Add node to shape', () => {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ],
                strokeWidth: 2
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [10, 10],
                    [200, 50]
                ],
                strokeWidth: 2

            }
  
        ];
        const actual = reducer(state, shapesOperations.addShapeNode(2, [200, 200]));
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50],
                    [200, 50]
                ],
                strokeWidth: 2
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [10, 10],
                    [200, 50],
                    [200, 200]
                ],
                strokeWidth: 2
            }
  
        ];
        assert.deepEqual(actual, expected);
    });

    it('Update node in a shape', () => {
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
        const actual = reducer(state, shapesOperations.updateShapeNode(2, 1, [200, 200]));
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
    it('Delete node from the shape', () => {
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
        const actual = reducer(state, shapesOperations.deleteShapeNode(2, 1));
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
                nodes: [[10, 10]]
            }
  
        ];
        assert.deepEqual(actual, expected);
    });

    it('Insert node into the shape', () => {
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

        const actual = reducer(state, shapesOperations.insertShapeNode(2, 1, [300, 300]));
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
