import assert from 'assert';
import {setSelectedShape} from "../../src/actions";
import editedPathReducer from './../../src/reducers/canvas/selectedPath';

describe('Edited path tests', function () {
    it('Set edited path', function () {
        const editedPath = {
            nodes: [
                [100, 100, 1],
                [200, 200, 1]
            ],
            color: 'yellow'
        };
        const action = setSelectedShape(editedPath.nodes, editedPath.color);
        const actual = editedPathReducer([], action);
        assert.deepEqual(editedPath, actual);
    })
});