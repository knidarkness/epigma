import assert from 'assert';
import * as actionTypes from './../../src/actions/actionTypes';

import editReducer from'../../src/reducers/canvas/edit';

describe('Edit mode tests', function () {
    it('Edit mode on', function () {
        const state = false;
        const action = {
            type: actionTypes.EDIT_ON
        };
        const expected = true;
        const actual = editReducer(state, action);
        assert.deepEqual(expected, actual);
    });

    it('Edit mode off', function () {
        const state = true;
        const action = {
            type: actionTypes.EDIT_OFF
        };
        const expected = false;
        const actual = editReducer(state, action);
        assert.deepEqual(expected, actual);
    });

    it('Edit mode toggle on', function () {
        const state = false;
        const action = {
            type: actionTypes.TOGGLE_EDIT
        };
        const expected = true;
        const actual = editReducer(state, action);
        assert.deepEqual(expected, actual);
    });

    it('Edit toggle off', function () {
        const state = true;
        const action = {
            type: actionTypes.TOGGLE_EDIT
        };
        const expected = false;
        const actual = editReducer(state, action);
        assert.deepEqual(expected, actual);
    });
});