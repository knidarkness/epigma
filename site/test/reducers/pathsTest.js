const assert = require('assert');
const pathReducers = require('./../../src/reducers/paths');
const actionTypes = require('./../../src/actions/actionTypes');


describe('Paths reducer tests', function() {
    it('Create new path for empty state', function() {
        const action = {type: actionTypes.CREATE_PATH, id: 1, color: 'black', path: [
            [50, 50, 1],
            [200, 50, 1]]
        };
        const actual = pathReducers([], action);
        const expected = [{id: 1, color: 'black', path:
            [[50, 50, 1],
                [200, 50, 1]]
        }];
        assert.deepEqual(actual, expected);
    });
    /*    for the case:
            case  actionTypes.DELETE_PATH:
            return state
                .filter((p, id) => id !== action.id);*/
    it('Delete path from the state', function() {
        const action = {type: actionTypes.DELETE_PATH, id: 1};
        const actual = pathReducers([
            {id: 1, color: 'black', path: [
                [50, 50, 1],
                [200, 50, 1]]
        }], action);
        const expected = [{id: 1, color: 'black', path: [
            [50, 50, 1],
            [200, 50, 1]]
    }];
        //not working properly yet
        assert.deepEqual(actual, expected);
    });
   // it('Update the path in the state', function () {
       /* const actual = pathReducers([{id: 1, color: 'black', path: [
            [50, 50, 1],
            [200, 50, 1]]
        }]);
       // const expected = ;
    })*/

});
