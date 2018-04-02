import assert from 'assert';

import {shiftCanvas, zoomTo} from "../../../src/actions/atomic";
import canvas from '../../../src/reducers/editor/canvas';

import Matrix from '../../../src/utils/matrix';

describe('Canvas zoom/shift tests', function () {
    it('Shift from zero coordinate', function () {
        const state = {
            zoom: 1,
            viewMatrix: Matrix.identity()
        };
        const action = shiftCanvas(10, 10);
        const actual = canvas(state, action);
        const expected = {
            zoom: 1,
            viewMatrix: new Matrix(1, 0, 0, 1, 10, 10)
        };
        assert.deepEqual(actual, expected);
    }),
    it('Shift from non-zero coordinate', function () {
        const state = {
            zoom: 1,
            viewMatrix: new Matrix(1, 0, 0, 1, 15, 15)
        };
        const action = shiftCanvas(10, -10);
        const actual = canvas(state, action);
        const expected = {
            zoom: 1,
            viewMatrix: new Matrix(1, 0, 0, 1, 25, 5)
        };
        assert.deepEqual(actual, expected);
    })
    
    it('Zoom into a point', function () {
        const state = {
            zoom: 1,
            viewMatrix: new Matrix(1, 0, 0, 1, 15, 15)
        };
        const point = [300, 300]
        const action = zoomTo(point, 1.1);
        const actual = canvas(state, action);
        const expected = {
            zoom: 1.1,
            viewMatrix: new Matrix(1.1, 0, 0, 1.1, -13.5, -13.5)
        };
        assert.deepEqual(actual, expected);
    })
   
});

