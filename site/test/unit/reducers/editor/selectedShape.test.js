import assert from 'assert';
import {selectedShapeOperations} from 'state/editor/selectedShape';
import reducer from 'state/editor/selectedShape';

describe('Selected shape tests', () => {
    it('Set selected shape', () => {
        const expected = 'c0c48410-af5b-46ae-9c3e-aac8cc4c45b1';
        const action = selectedShapeOperations.setSelectedShape(expected);
        const state = -1;
        const actual = reducer(state, action);
        assert.deepEqual(expected, actual);
    });
    it('Clear selected shape', () => {
        const state = 'c0c48410-af5b-46ae-9c3e-aac8cc4c45b1';
        const action = selectedShapeOperations.clearSelectedShape();
        const actual = reducer(state, action);
        const expected = -1;
        assert.deepEqual(expected, actual);
    });
});