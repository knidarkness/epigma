import assert from 'assert';

import {shiftCanvas} from "../../src/actions";
import viewMatrix from '../../src/reducers/canvas/viewMatrix';

import mathjs from 'mathjs';

describe('Canvas zoom/shift tests', function () {
    it('Shift from zero coordinate', function () {
        const state = {
            zoom: 1,
            viewMatrix: [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]
        };
        const action = shiftCanvas(10, 10);
        const actual = viewMatrix(state, action);
        const expected = {
            zoom: 1,
            viewMatrix: mathjs.matrix([[1, 0, 10],
                                       [0, 1, 10],
                                       [0, 0, 1]])
        };
        assert.deepEqual(actual, expected);
    })
});
