import assert from 'assert';
import {setSelectedShape, selectedShapeAddNode, selectedShapeDeleteNode, selectedShapeInsertNode, selectedShapeUpdateNode} from "../../../../src/actions/atomic";
import editedShapeReducer from '../../../../src/reducers/editor/selectedShape';

describe('Selected shape tests', function () {
    it('Set selected shape', function () {
        const selectedShape = {
            nodes: [
                [100, 100],
                [200, 200]
            ],
            color: 'yellow'
        };
        const action = setSelectedShape(selectedShape.nodes, selectedShape.color);
        const actual = editedShapeReducer({}, action);
        assert.deepEqual(selectedShape, actual);
    })

    it('Add a node into a shape', function () {
        const selectedShape = {
            nodes: [
                [100, 100],
                [200, 200],
                [300, 300]
            ],
            color: 'yellow'
        };
        const expected = {
            nodes: [
                [100, 100],
                [200, 200],
                [300, 300],
                [400, 400]
            ],
            color: 'yellow'
        };
        const action = selectedShapeAddNode([400, 400]);
        const actual = editedShapeReducer(selectedShape, action);
        assert.deepEqual(expected, actual);
    })

    it('Insert a node into a shape', function () {
        const selectedShape = {
            nodes: [
                [100, 100],
                [200, 200],
                [300, 300]
            ],
            color: 'yellow'
        };
        const expected = {
            nodes: [
                [100, 100],
                [400, 400],
                [200, 200],
                [300, 300]
            ],
            color: 'yellow'
        };
        const action = selectedShapeInsertNode(1, [400, 400]);
        const actual = editedShapeReducer(selectedShape, action);
        assert.deepEqual(expected, actual);
    })

    it('Update a node', function () {
        const selectedShape = {
            nodes: [
                [100, 100],
                [200, 200],
                [300, 300]
            ],
            color: 'yellow'
        };
        const expected = {
            nodes: [
                [100, 100],
                [400, 400],
                [300, 300]
            ],
            color: 'yellow'
        };
        const action = selectedShapeUpdateNode(1, [400, 400]);
        const actual = editedShapeReducer(selectedShape, action);
        assert.deepEqual(expected, actual);
    })
    
    it('Delete a node', function () {
        const selectedShape = {
            nodes: [
                [100, 100],
                [200, 200],
                [300, 300]
            ],
            color: 'yellow'
        };
        const expected = {
            nodes: [
                [100, 100],
                [300, 300]
            ],
            color: 'yellow'
        };
        const action = selectedShapeDeleteNode(1);
        const actual = editedShapeReducer(selectedShape, action);
        assert.deepEqual(expected, actual);
    })
});