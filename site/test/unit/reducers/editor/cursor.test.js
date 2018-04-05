import assert from 'assert';
import * as actionTypes from '../../../../src/actions/actionTypes';

import {CURSOR, EDITOR_MODE} from "../../../../src/const";
import {icon as iconReducer, position as positionReducer} from '../../../../src/reducers/editor/cursor';

describe('Cursor reducer tests', function () {
    it('Cursor image when draw mode enabled', function () {
        const actual = iconReducer(CURSOR.DEFAULT,{type: actionTypes.ENABLE_MODE, mode:EDITOR_MODE.DRAW});
        const expected = CURSOR.DRAW;
        assert.equal(actual, expected);
    });

    it('Cursor image when view mode enabled', function () {
        const actual = iconReducer(CURSOR.DEFAULT, {type: actionTypes.ENABLE_MODE, mode:EDITOR_MODE.VIEW});
        const expected = CURSOR.VIEW;
        assert.equal(actual, expected);
    });

    it('Cursor image when edit mode enabled', function () {
        const actual = iconReducer(CURSOR.DEFAULT, {type: actionTypes.ENABLE_MODE, mode:EDITOR_MODE.EDIT});
        const expected = CURSOR.EDIT;
        assert.equal(actual, expected);
    });
});