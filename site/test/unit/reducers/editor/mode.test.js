import assert from 'assert';
import {EDITOR_MODE} from "const";
import reducer from 'state/editor/mode';
import * as modeActions from 'state/editor/mode/actions';
import { updateCursorIcon } from "state/editor/cursor/actions";
import { CURSOR } from 'const';
import {modeOperations} from 'state/editor/mode';
import {selectedShapeOperations} from "state/editor/selectedShape"
import {cursorOperations} from 'state/editor/cursor';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Editor mode actions tests', () => {
    it('Change mode to View, change cursor to VIEW and call clearSelectedShape', () => {
        const expectedActions = [
            modeActions.enableMode(EDITOR_MODE.VIEW),
            cursorOperations.updateCursorIcon(CURSOR.VIEW),
            selectedShapeOperations.clearSelectedShape(),
        ];
        const action = modeOperations.changeMode(EDITOR_MODE.VIEW);
        const store = mockStore({})
        store.dispatch(action)
        const actualActions = store.getActions()
        assert.deepEqual(actualActions, expectedActions);
    
    });
    
    it('Change mode to Draw, change cursor to DRAW and call clearSelectedShape', () => {
        const expectedActions = [
            modeActions.enableMode(EDITOR_MODE.DRAW),
            cursorOperations.updateCursorIcon(CURSOR.DRAW),
            selectedShapeOperations.clearSelectedShape(),
          ];
        const action = modeOperations.changeMode(EDITOR_MODE.DRAW);
        const store = mockStore({})
        store.dispatch(action)
        const actualActions = store.getActions()
        assert.deepEqual(actualActions, expectedActions);
    });
    
    it('Change mode to Edit, change cursor to EDIT and call clearSelectedShape', () => {
        const expectedActions = [
            modeActions.enableMode(EDITOR_MODE.EDIT),
            cursorOperations.updateCursorIcon(CURSOR.EDIT),
            selectedShapeOperations.clearSelectedShape(),
          ];
        const action = modeOperations.changeMode(EDITOR_MODE.EDIT);
        const store = mockStore({})
        store.dispatch(action)
        const actualActions = store.getActions()
        assert.deepEqual(actualActions, expectedActions);
    });

});

describe('Editor mode reducer tests', () => {
    it('Enable View mode', () => {
        const actual = reducer(EDITOR_MODE.VIEW, modeActions.enableMode(EDITOR_MODE.VIEW));
        const expected = EDITOR_MODE.VIEW;
        assert.equal(actual, expected);
    });

    it('Enable Draw mode', () => {
        const actual = reducer(EDITOR_MODE.DRAW, modeActions.enableMode(EDITOR_MODE.DRAW));
        const expected = EDITOR_MODE.DRAW;
        assert.equal(actual, expected);
    });

    it('Enable Edit mode', () => {
        const actual = reducer(EDITOR_MODE.EDIT, modeActions.enableMode(EDITOR_MODE.EDIT));
        const expected = EDITOR_MODE.EDIT;
        assert.equal(actual, expected);
    });
});
