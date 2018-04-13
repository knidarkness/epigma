import assert from 'assert';

import {canvasOperations} from 'state/editor/canvas';
import reducer from 'state/editor/canvas';

import Matrix from 'utils/matrix';

describe('Canvas zoom/shift tests', () => {
    it('Shift from zero coordinate', () => {
        const state = {
            zoom: 1,
            viewMatrix: Matrix.identity()
        };
        const action = canvasOperations.shiftCanvas(10, 10);
        const actual = reducer(state, action);
        const expected = {
            zoom: 1,
            viewMatrix: new Matrix(1, 0, 0, 1, 10, 10)
        };
        assert.deepEqual(actual, expected);
    });

    it('Shift from non-zero coordinate', () => {
        const state = {
            zoom: 1,
            viewMatrix: new Matrix(1, 0, 0, 1, 15, 15)
        };
        const action = canvasOperations.shiftCanvas(10, -10);
        const actual = reducer(state, action);
        const expected = {
            zoom: 1,
            viewMatrix: new Matrix(1, 0, 0, 1, 25, 5)
        };
        assert.deepEqual(actual, expected);
    });
    
    it('Zoom into a point', () => {
        const state = {
            zoom: 1,
            viewMatrix: new Matrix(1, 0, 0, 1, 15, 15)
        };
        const point = [300, 300];
        const action = canvasOperations.zoomCanvas(point, 1.1);
        const actual = reducer(state, action);
        const expected = {
            zoom: 1.1,
            viewMatrix: new Matrix(1.1, 0, 0, 1.1, -13.5, -13.5)
        };
        assert.deepEqual(actual, expected);
    });
   
});

