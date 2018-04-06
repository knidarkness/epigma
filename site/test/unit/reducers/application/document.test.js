import assert from 'assert';
import reducer from 'state/application/documents';
import * as types from 'state/application/documents/types';

describe('Documents reducers tests', function() {
   it('Create document for empty state', function() {
       const actual = reducer([], {type: types.DOCUMENT_CREATE_SUCCESS, id: '1', name: '1', editedAt: '1'});
       const expected = [{ id: '1', name: '1', editedAt: '1' }];
       assert.deepEqual(actual, expected);
   });

   it('Create document for non-empty state', function() {
       const state = [{ id: '1', name: '1', editedAt: '1' }];
       const actual = reducer(state, {type: types.DOCUMENT_CREATE_SUCCESS, id: '2', name: '2', editedAt: '2'});
       const expected = [{ id: '2', name: '2', editedAt: '2'}, { id: '1', name: '1', editedAt: '1' }];
       assert.deepEqual(actual, expected);
   });

   it('Store data after fetching documents', function() {
       const state = [{ id: '1', name: '1', editedAt: '1' }];
       const actual = reducer(state, {type: types.DOCUMENTS_FETCH_SUCCESS, documents: [{id: '2', name: '2', editedAt: '2'}]});
       const expected = [{ id: '2', name: '2', editedAt: '2'}];
       assert.deepEqual(actual, expected);
   });

   it('Delete document from non-empty state', function() {
       const state = [{ id: '1', name: '1', editedAt: '1' }, { id: '2', name: '2', editedAt: '2'}];
       const actual = reducer(state, {type: types.DOCUMENT_DELETE_SUCCESS, id: '2'});
       const expected = [{ id: '1', name: '1', editedAt: '1'}];
       assert.deepEqual(actual, expected);
   });

   it('Try to delete document from non-empty state, no matching id', function() {
       const state = [{ id: '1', name: '1', editedAt: '1' }, { id: '2', name: '2', editedAt: '2'}];
       const actual = reducer(state, {type: types.DOCUMENT_DELETE_SUCCESS, id: '3'});
       assert.deepEqual(actual, state);
   });

   it('Rename document in not-empty state', function() {
       const state = [{ id: '1', name: '1', editedAt: '1' }, { id: '2', name: '2', editedAt: '2'}];
       const actual = reducer(state, {type: types.DOCUMENT_UPDATE_SUCCESS, id: '2', name: 'new name', editedAt: '3'});
       const expected = [{ id: '2', name: 'new name', editedAt: '3'}, { id: '1', name: '1', editedAt: '1' }];
       assert.deepEqual(actual, expected);
   });
});