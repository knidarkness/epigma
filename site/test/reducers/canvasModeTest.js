const mathjs  = require("mathjs");

const assert = require('assert');
const actionTypes = require('./../../src/actions/actionTypes');

const canvasModeReducer = require('./../../src/reducers/canvasMode');

describe('Canvas zoom/shift tests', function () {
    it('Shift from zero coordinate', function () {
        const state = {
            zoom: 1,
            transformMatrix: mathjs.eye(3)
        };
        const action = {
            type: actionTypes.SHIFT_CANVAS,
            shiftX: 10,
            shiftY: 10
        };
        const actual = canvasModeReducer(state, action);
        const expected = {
            zoom: 1,
            transformMatrix: mathjs.matrix([[1, 0, 10],
                                            [0, 1, 10],
                                            [0, 0, 1]])
        };
        assert.deepEqual(actual, expected);
    })
});