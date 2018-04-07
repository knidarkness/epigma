import assert from 'assert';
import * as types from 'state/editor/mode/types';

import {CURSOR, EDITOR_MODE} from "const";
import reducer from 'state/editor/cursor';

describe('Cursor reducer tests', function () {
    it('Cursor image when draw mode enabled', function () {
        const state = {
            icon: CURSOR.DEFAULT,
            position: undefined
        }
        const actual = reducer(state,{type: types.ENABLE, mode:EDITOR_MODE.DRAW});
        const expected = CURSOR.DRAW;
        assert.equal(actual.icon, expected);
    });

    it('Cursor image when view mode enabled', function () {
        const state = {
            icon: CURSOR.DEFAULT,
            position: undefined
        }
        const actual = reducer(state, {type: types.ENABLE, mode:EDITOR_MODE.VIEW});
        const expected = CURSOR.VIEW;
        assert.equal(actual.icon, expected);
    });

    it('Cursor image when edit mode enabled', function () {
        const state = {
            icon: CURSOR.DEFAULT,
            position: undefined
        }
        const actual = reducer(state, {type: types.ENABLE, mode:EDITOR_MODE.EDIT});
        const expected = CURSOR.EDIT;
        assert.equal(actual.icon, expected);
    });
});