import assert from 'assert';
import {CURSOR} from 'const';
import reducer from 'state/editor/cursor';
import {cursorOperations} from 'state/editor/cursor';

describe('Cursor reducer tests', () => {
    it('Cursor image when draw mode enabled', () => {
        const state = {
            icon: CURSOR.DEFAULT,
            position: undefined
        };
        const actual = reducer(state, cursorOperations.updateCursorIcon(CURSOR.DRAW));
        const expected = CURSOR.DRAW;
        assert.equal(actual.icon, expected);
    });

    it('Cursor image when view mode enabled', () => {
        const state = {
            icon: CURSOR.DEFAULT,
            position: undefined
        };
        const actual = reducer(state, cursorOperations.updateCursorIcon(CURSOR.VIEW));
        const expected = CURSOR.VIEW;
        assert.equal(actual.icon, expected);
    });

    it('Cursor image when edit mode enabled', () => {
        const state = {
            icon: CURSOR.DEFAULT,
            position: undefined
        };
        const actual = reducer(state, cursorOperations.updateCursorIcon(CURSOR.EDIT));
        const expected = CURSOR.EDIT;
        assert.equal(actual.icon, expected);
    });
});