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
                [50, 50, 1],
                [200, 50, 1]
            ]
        };
        const actual = shapes([], action);
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50, 1],
                    [200, 50, 1]
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
                    [50, 50, 1],
                    [200, 50, 1]
                ]
            }
        ];
        const actual = shapes(state, action);
        const expected = [];
        assert.deepEqual(actual, expected);
    });
    it('Update the existing path', function () {
        const action = {
            type: actionTypes.UPDATE_SHAPE,
            id: 1,
            nodes: [
                [200, 50, 1]
            ]
        };
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50, 1],
                    [200, 50, 1]
                ]
            }
        ];
        const actual = shapes(state, action);
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [200, 50, 1]
                ]
            }
        ];
        assert.deepEqual(actual, expected);
    });
    it('Fetch shapes successful from the back-end test', function () {
        const state = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [50, 50, 1],
                    [200, 50, 1]
                ]
            }
        ];
        const fetchedPaths = [
            {
                id: 1,
                color: 'black',
                nodes: [
                    [100, 50, 1],
                    [200, 50, 1]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes: [
                    [100, 50, 1],
                    [100, 50, 1]
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
                    [50, 50, 1],
                    [200, 50, 1]
                ]
            }
        ];
        const action = {
            type: actionTypes.CREATE_SHAPE, 
            id: 2, 
            color: 'black', 
            nodes: [
                [200, 200, 1]
            ]
        };
        const actual = shapes(state, action);
        const expected = [
            {
                id: 1,
                color: 'black',
                nodes:[
                    [50, 50, 1],
                    [200, 50, 1]
                ]
            },
            {
                id: 2,
                color: 'black',
                nodes:[
                    [200, 200, 1],
                ]
            }
        ];
        assert.deepEqual(actual, expected);
    });
});
