const assert = require('assert');
const actionTypes = require('./../../src/actions/actionTypes');

const editedPathReducer = require('./../../src/reducers/editedPath');

describe('Edited path tests', function () {
    it('Set edited path', function () {
        const editedPath = {
            path: [
                [100, 100, 1],
                [200, 200, 1]
            ],
            color: 'yellow'
        };
        const action = {
            type: actionTypes.SET_EDITED_PATH,
            path: editedPath.path,
            color: editedPath.color
        };
        const actual = editedPathReducer([], action);
        assert.deepEqual(editedPath, actual);
    })
});