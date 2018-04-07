import assert from 'assert';
import {EDITOR_MODE} from "const";
import reducer from 'state/editor/mode';
import {selectedShapeOperations} from "state/editor/selectedShape"
import * as modeActions from 'state/editor/mode/actions';
import {modeOperations} from 'state/editor/mode';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Editor mode reducer tests', function () {
    it('Enable View mode', function () {
        const actual = reducer(EDITOR_MODE.VIEW, modeActions.enableMode(EDITOR_MODE.VIEW));
        const expected = EDITOR_MODE.VIEW;
        assert.equal(actual, expected);
    });

    it('Enable Draw mode', function () {
        const actual = reducer(EDITOR_MODE.DRAW, modeActions.enableMode(EDITOR_MODE.DRAW));
        const expected = EDITOR_MODE.DRAW;
        assert.equal(actual, expected);
    });

    it('Enable Edit mode', function () {
        const actual = reducer(EDITOR_MODE.EDIT, modeActions.enableMode(EDITOR_MODE.EDIT));
        const expected = EDITOR_MODE.EDIT;
        assert.equal(actual, expected);
    });

    it('Change mode to View and call clearSelectedShape', function () {
        const expectedActions = [
            modeActions.enableMode(EDITOR_MODE.VIEW),
            selectedShapeOperations.clearSelectedShape(),
          ];
        const action = modeOperations.changeMode(EDITOR_MODE.VIEW);
        const store = mockStore({})
        store.dispatch(action)
        const actualActions = store.getActions()
        assert.deepEqual(actualActions, expectedActions);
    
    });
    
    it('Change mode to Draw and call clearSelectedShape', function () {
        const expectedActions = [
            modeActions.enableMode(EDITOR_MODE.DRAW),
            selectedShapeOperations.clearSelectedShape(),
          ];
        const action = modeOperations.changeMode(EDITOR_MODE.DRAW);
        const store = mockStore({})
        store.dispatch(action)
        const actualActions = store.getActions()
        assert.deepEqual(actualActions, expectedActions);
    });
    
    it('Change mode to Edit and call clearSelectedShape', function () {
        const expectedActions = [
            modeActions.enableMode(EDITOR_MODE.EDIT),
            selectedShapeOperations.clearSelectedShape(),
          ];
        const action = modeOperations.changeMode(EDITOR_MODE.EDIT);
        const store = mockStore({})
        store.dispatch(action)
        const actualActions = store.getActions()
        assert.deepEqual(actualActions, expectedActions);
    });

});