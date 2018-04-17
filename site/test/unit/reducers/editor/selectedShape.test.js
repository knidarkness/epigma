import assert from 'assert';
import { selectedShapeOperations } from 'state/editor/selectedShape';
import reducer from 'state/editor/selectedShape';

describe('Selected shape tests', () => {
    it('Set selected shape', () => {
        const expected = {
            id: 1,
            color: 'black',
            nodes: [
                [50, 50],
                [200, 50]
            ],
            strokeWidth: 2
        };
        const action = selectedShapeOperations.setSelectedShape(expected);
        const state = { nodes: [], strokeWidth: 2 };
        const actual = reducer(state, action);
        assert.deepEqual(expected, actual);
    });
    it('Clear selected shape', () => {
        const state = {
            id: 1,
            color: 'black',
            nodes: [
                [50, 50],
                [200, 50]
            ],
            strokeWidth: 2
        };
        const action = selectedShapeOperations.clearSelectedShape();
        const actual = reducer(state, action);
        const expected = { nodes: [], strokeWidth: 2 };
        assert.deepEqual(expected, actual);
    });

    it('Add node to shape', () => {
        const state = {
            id: 1,
            color: 'black',
            nodes: [
                [50, 50],
                [200, 50]
            ],
            strokeWidth: 2
        };

        const actual = reducer(state, selectedShapeOperations.addSelectedShapeNode([200, 200]));
        const expected = {
            id: 1,
            color: 'black',
            nodes: [
                [50, 50],
                [200, 50],
                [200, 200]
            ],
            strokeWidth: 2
        };
        assert.deepEqual(actual, expected);
    });

    it('Update node in a shape', () => {
        const state = {
            id: 1,
            color: 'black',
            nodes: [
                [50, 50],
                [200, 50]
            ]
        };

        const actual = reducer(state, selectedShapeOperations.updateSelectedShapeNode(0, [200, 200]));
        const expected = {
            id: 1,
            color: 'black',
            nodes: [
                [200, 200],
                [200, 50]
            ]
        };

        assert.deepEqual(actual, expected);
    });
    it('Delete node from the shape', () => {
        const state = {
            id: 1,
            color: 'black',
            nodes: [
                [10, 10],
                [200, 50],
                [300, 50]
            ]
        };

        const actual = reducer(state, selectedShapeOperations.deleteSelectedShapeNode(1));
        const expected = {
            id: 1,
            color: 'black',
            nodes: [
                [10, 10],
                [300, 50]
            ]
        };

        assert.deepEqual(actual, expected);
    });

    it('Insert node into the shape', () => {
        const state = {
            id: 1,
            color: 'black',
            nodes: [
                [10, 10],
                [200, 50]
            ]
        };


        const actual = reducer(state, selectedShapeOperations.insertSelectedShapeNode(1, [300, 300]));
        const expected = {
            id: 1,
            color: 'black',
            nodes: [
                [10, 10],
                [300, 300],
                [200, 50]
            ]
        };

        assert.deepEqual(actual, expected);
    });
});