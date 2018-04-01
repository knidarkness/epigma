import assert from 'assert';
import {setSelectedShape} from "../../src/actions";
import editedShapeReducer from './../../src/reducers/canvas/selectedShape';

describe('Edited shape tests', function () {
    it('Set edited shape', function () {
        const editedShape = {
            nodes: [
                [100, 100, 1],
                [200, 200, 1]
            ],
            color: 'yellow'
        };
        const action = setSelectedShape(editedShape.nodes, editedShape.color);
        const actual = editedShapeReducer([], action);
        assert.deepEqual(editedShape, actual);
    })
});