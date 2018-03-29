const assert = require('assert');
const pathReducers = require('./../../src/reducers/paths');
const actionTypes = require('./../../src/actions/actionTypes');


describe('Paths reducer tests', function() {
    it('Create new path for empty state', function() {
        const action = {type: actionTypes.CREATE_PATH, id: 1, color: 'black', path: [
            [50, 50, 1],
            [200, 50, 1]]
        };
        const actual = pathReducers([], action);
        const expected = [{id: 1, color: 'black', path:
            [[50, 50, 1],
                [200, 50, 1]]
        }];
        assert.deepEqual(actual, expected);
    });
    it('Delete path from the state', function() {
        const action = {type: actionTypes.DELETE_PATH, id: 1};
        const state = [
            {
                id: 1,
                color: 'black',
                path: [
                    [50, 50, 1],
                    [200, 50, 1]]
            }
        ];
        const actual = pathReducers(state, action);
        const expected = [];
        assert.deepEqual(actual, expected);
    });
    it('Update the existing path', function () {
        const action = {
            type: actionTypes.UPDATE_PATH,
            id: 1,
            path: [
                [200, 50, 1]
            ]
        };
        const state = [
            {
                id: 1,
                color: 'black',
                path: [
                    [50, 50, 1],
                    [200, 50, 1]
                ]
            }
        ];
        const actual = pathReducers(state, action);
        const expected = [
            {
                id: 1,
                color: 'black',
                path: [
                    [200, 50, 1]
                ]
            }
        ];
        assert.deepEqual(actual, expected);
    });
    it('Fetch paths successful from the back-end test', function () {
        const state = [
            {
                id: 1,
                color: 'black',
                path: [
                    [50, 50, 1],
                    [200, 50, 1]
                ]
            }
        ];
        const fetchedPaths = [
            {
                id: 1,
                color: 'black',
                path: [
                    [100, 50, 1],
                    [200, 50, 1]
                ]
            },
            {
                id: 2,
                color: 'black',
                path: [
                    [100, 50, 1],
                    [100, 50, 1]
                ]
            }
        ];
        const action = {
            type: actionTypes.FETCH_PATHS,
            paths: fetchedPaths
        };
        const actual = pathReducers(state, action);
        const expected = fetchedPaths;
        assert.deepEqual(actual, expected);
    });
    it('Add path to non-empty state', function () {
        const state = [
            {
                id: 1,
                color: 'black',
                path: [
                    [50, 50, 1],
                    [200, 50, 1]
                ]
            }
        ];
        const action = {type: actionTypes.CREATE_PATH, id: 2, color: 'black', path: [
                [200, 200, 1]
                ]
        };
        const actual = pathReducers(state, action);
        const expected = [
            {
                id: 1,
                color: 'black',
                path:[
                    [50, 50, 1],
                    [200, 50, 1]
                ]
            },
            {
                id: 2,
                color: 'black',
                path:[
                    [200, 200, 1],
                ]
            }
        ];
        assert.deepEqual(actual, expected);
    });
});
