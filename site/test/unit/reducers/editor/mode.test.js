import assert from 'assert';
import * as types from 'state/editor/mode/types';
import {EDITOR_MODE} from "const";
import reducer from 'state/editor/mode';

 
describe('Editor mode reducer tests', function () {
    it('Enable View mode', function () {
        const actual = reducer(EDITOR_MODE.VIEW, {type: types.ENABLE, mode:EDITOR_MODE.VIEW});
        const expected = EDITOR_MODE.VIEW;
        assert.equal(actual, expected);
    });

    it('Enable Draw mode', function () {
        const actual = reducer(EDITOR_MODE.VIEW,  {type: types.ENABLE, mode:EDITOR_MODE.DRAW});
        const expected = EDITOR_MODE.DRAW;
        assert.equal(actual, expected);
    });

    it('Enable Edit mode', function () {
        const actual = reducer(EDITOR_MODE.VIEW,  {type: types.ENABLE, mode:EDITOR_MODE.EDIT});
        const expected = EDITOR_MODE.EDIT;
        assert.equal(actual, expected);
    });

});