import assert from 'assert';
import * as atomicActions from '../../../../src/actions/atomic';

import {CURSOR} from "../../../../src/const";
import {icon as iconReducer, position as positionReducer} from '../../../../src/reducers/editor/cursor';

describe('Cursor reducer tests', function () {
    it('Cursor image when draw mode enabled', function () {
        const actual = iconReducer(CURSOR.DEFAULT, atomicActions.enableDrawMode());
        const expected = CURSOR.DRAW;
        assert.equal(actual, expected);
    });

    it('Cursor image when delete mode enabled', function () {
        const actual = iconReducer(CURSOR.DEFAULT, atomicActions.enableDeleteMode());
        const expected = CURSOR.DELETE;
        assert.equal(actual, expected);
    });

    it('Cursor image when view mode enabled', function () {
        const actual = iconReducer(CURSOR.DEFAULT, atomicActions.enableViewMode());
        const expected = CURSOR.VIEW;
        assert.equal(actual, expected);
    });

    it('Cursor image when edit mode enabled', function () {
        const actual = iconReducer(CURSOR.DEFAULT, atomicActions.enableEditMode());
        const expected = CURSOR.EDIT;
        assert.equal(actual, expected);
    });
});