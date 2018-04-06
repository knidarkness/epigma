import assert from 'assert';
import {setSelectedShape, selectedShapeAddNode, selectedShapeDeleteNode, selectedShapeInsertNode, selectedShapeUpdateNode, clearSelectedShape} from "../../../../src/actions/shape";
import editedShapeReducer from '../../../../src/reducers/editor/selectedShape';

describe('Selected shape tests', function () {
    it('Set selected shape', function () {
        const expected = "c0c48410-af5b-46ae-9c3e-aac8cc4c45b1";
        const action = setSelectedShape(expected);
        const state = -1
        const actual = editedShapeReducer(state, action);
        assert.deepEqual(expected, actual);
    })
    it('Clear selected shape', function () {
        const state = "c0c48410-af5b-46ae-9c3e-aac8cc4c45b1"
        const action = clearSelectedShape();
        const actual = editedShapeReducer(state, action);
        const expected = -1;
        assert.deepEqual(expected, actual);
    })
});