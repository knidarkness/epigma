import assert from 'assert';
import * as atomicActions from '../../../../src/actions/atomic';

import {EDITOR_MODE} from "../../../../src/const";
import modeReducer from '../../../../src/reducers/editor/mode';

describe('Editor mode reducer tests', function () {
    it('Editor mode when draw mode enabled', function () {
        const actual = modeReducer(EDITOR_MODE.VIEW, atomicActions.enableDrawMode());
        const expected = EDITOR_MODE.DRAW;
        assert.equal(actual, expected);
    });

    it('Editor mode when delete mode enabled', function () {
        const actual = modeReducer(EDITOR_MODE.VIEW, atomicActions.enableDeleteMode());
        const expected = EDITOR_MODE.DELETE;
        assert.equal(actual, expected);
    });

    it('Editor mode when view mode enabled', function () {
        const actual = modeReducer(EDITOR_MODE.DRAW, atomicActions.enableViewMode());
        const expected = EDITOR_MODE.VIEW;
        assert.equal(actual, expected);
    });
});