import assert from 'assert';
import * as actionTypes from '../../../../src/actions/actionTypes';
import {EDITOR_MODE} from "../../../../src/const";
import modeReducer from '../../../../src/reducers/editor/mode';

 
describe('Editor mode reducer tests', function () {
    it('Enable View mode', function () {
        const actual = modeReducer(EDITOR_MODE.VIEW, {type: actionTypes.MODE_ENABLE, mode:EDITOR_MODE.VIEW});
        const expected = EDITOR_MODE.VIEW;
        assert.equal(actual, expected);
    });

    it('Enable Draw mode', function () {
        const actual = modeReducer(EDITOR_MODE.VIEW,  {type: actionTypes.MODE_ENABLE, mode:EDITOR_MODE.DRAW});
        const expected = EDITOR_MODE.DRAW;
        assert.equal(actual, expected);
    });

    it('Enable Edit mode', function () {
        const actual = modeReducer(EDITOR_MODE.VIEW,  {type: actionTypes.MODE_ENABLE, mode:EDITOR_MODE.EDIT});
        const expected = EDITOR_MODE.EDIT;
        assert.equal(actual, expected);
    });

});