import assert from 'assert';
import documentsReducer from '../../src/reducers/application/documents';
import * as actionTypes from './../../src/actions/actionTypes';

describe('Documents reducers tests', function() {
   it('Create document for empty state', function() {
       const actual = documentsReducer([], {type: actionTypes.CREATE_DOCUMENT, id: '1', name: '1', editedAt: '1'});
       const expected = [{ id: '1', name: '1', editedAt: '1' }];
       assert.deepEqual(actual, expected);
   });

   it('Create document for non-empty state', function() {
       const state = [{ id: '1', name: '1', editedAt: '1' }];
       const actual = documentsReducer(state, {type: actionTypes.CREATE_DOCUMENT, id: '2', name: '2', editedAt: '2'});
       const expected = [{ id: '2', name: '2', editedAt: '2'}, { id: '1', name: '1', editedAt: '1' }];
       assert.deepEqual(actual, expected);
   });

   it('Store data after ITEMS FETCH DATA SUCCESS', function() {
       const state = [{ id: '1', name: '1', editedAt: '1' }];
       const actual = documentsReducer(state, {type: actionTypes.ITEMS_FETCH_DATA_SUCCESS, items: [{id: '2', name: '2', editedAt: '2'}]});
       const expected = [{ id: '2', name: '2', editedAt: '2'}];
       assert.deepEqual(actual, expected);
   });

   it('Delete document from non-empty state', function() {
       const state = [{ id: '1', name: '1', editedAt: '1' }, { id: '2', name: '2', editedAt: '2'}];
       const actual = documentsReducer(state, {type: actionTypes.DELETE_DOCUMENT, id: '2'});
       const expected = [{ id: '1', name: '1', editedAt: '1'}];
       assert.deepEqual(actual, expected);
   });

   it('Try to delete document from non-empty state, no matching id', function() {
       const state = [{ id: '1', name: '1', editedAt: '1' }, { id: '2', name: '2', editedAt: '2'}];
       const actual = documentsReducer(state, {type: actionTypes.DELETE_DOCUMENT, id: '3'});
       assert.deepEqual(actual, state);
   });

   it('Rename document in not-empty state', function() {
       const state = [{ id: '1', name: '1', editedAt: '1' }, { id: '2', name: '2', editedAt: '2'}];
       const actual = documentsReducer(state, {type: actionTypes.RENAME_DOCUMENT, id: '2', name: 'new name', editedAt: '3'});
       const expected = [{ id: '2', name: 'new name', editedAt: '3'}, { id: '1', name: '1', editedAt: '1' }];
       assert.deepEqual(actual, expected);
   });
});