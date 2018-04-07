import assert from 'assert';
import reducer from 'state/application/documents';
import {documentsOperations}  from 'state/application/documents';
import * as documentsActions  from 'state/application/documents/actions';
import {DOCUMENT_LIST_URI} from 'const';

import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Documents actions tests', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })
    it('Creates DOCUMENT_CREATE_SUCCESS when document has been successfully created', () => {
        fetchMock
            .postOnce(DOCUMENT_LIST_URI, { 
                status: 200,
                body: {data: { _id: '1', name: 'document 1', editedAt: '1523109000'}}
            })
  
        const expectedActions = [
            documentsActions.createDocumentSuccess('1', 'document 1', '1523109000')
        ]
        const store = mockStore({})
        const action = documentsOperations.createDocument('document 1')
        const actualActions = store.getActions()

        return store.dispatch(action).then(() => {
            assert.deepEqual(actualActions, expectedActions)
        })
    });
 
    it('Creates DOCUMENT_FETCH_SUCCESS when documents have been successfully fetched', () => {
        fetchMock
            .getOnce(DOCUMENT_LIST_URI, { 
                status: 200,
                body: {documents: [{id: '1', name: 'document 1', editedAt: '1523109000'}]}
            })
  
        const expectedActions = [
            documentsActions.fetchDocumentsSuccess([{id: '1', name: 'document 1', editedAt: '1523109000'}])
        ]
        const store = mockStore({})
        const action = documentsOperations.fetchDocuments()
        const actualActions = store.getActions()

        return store.dispatch(action).then(() => {
            assert.deepEqual(actualActions, expectedActions)
        })
    });


    it('Creates DOCUMENT_DELETE_SUCCESS when document has been successfully deleted', () => {
        fetchMock
            .deleteOnce("begin:" + DOCUMENT_LIST_URI, { 
                status: 200
            })
  
        const expectedActions = [
            documentsActions.deleteDocumentSuccess('1')
        ]
        const store = mockStore({})
        const action = documentsOperations.deleteDocument('1')
        const actualActions = store.getActions()

        return store.dispatch(action).then(() => {
            assert.deepEqual(actualActions, expectedActions)
        })
    });


    it('Creates DOCUMENT_UPDATE_SUCCESS when document has been successfully updated', () => {
        fetchMock
            .patchOnce("begin:" + DOCUMENT_LIST_URI, { 
                status: 200,
                body: {data: {id: '1', name: 'new name', editedAt: '1523109000'}}
            })
  
        const expectedActions = [
            documentsActions.updateDocumentSuccess('1', 'new name', '1523109000')
        ]
        const store = mockStore({})
        const action = documentsOperations.updateDocument('1', 'new name')
        const actualActions = store.getActions()

        return store.dispatch(action).then(() => {
            assert.deepEqual(actualActions, expectedActions)
        })
    });
})

describe('Documents reducers tests', () => {
   it('Create document for empty state', () => {
       const actual = reducer([], documentsActions.createDocumentSuccess('1', 'document 1', '1523109000'));
       const expected = [{ id: '1', name: 'document 1', editedAt: '1523109000' }];
       assert.deepEqual(actual, expected);
   });

   it('Create document for non-empty state', () => {
       const state = [{ id: '1', name: 'document 1', editedAt: '1523109000'}];
       const actual = reducer(state, documentsActions.createDocumentSuccess('2', 'document 2', '1523109001'));
       const expected = [{ id: '2', name: 'document 2', editedAt: '1523109001'}, { id: '1', name: 'document 1', editedAt: '1523109000' }];
       assert.deepEqual(actual, expected);
   });

   it('Store data after fetching documents', () => {
       const state = [{ id: '1', name: 'document 1', editedAt: '1523109000'}];
       const actual = reducer(state, documentsActions.fetchDocumentsSuccess([{ id: '2', name: 'document 2', editedAt: '1523109001'}]));
       const expected = [{ id: '2', name: 'document 2', editedAt: '1523109001'}];
       assert.deepEqual(actual, expected);
   });

   it('Delete document from non-empty state', () => {
       const state = [{ id: '1', name: 'document 1', editedAt: '1523109000' }, { id: '2', name: 'document 2', editedAt: '1523109001'}];
       const actual = reducer(state, documentsActions.deleteDocumentSuccess('2'));
       const expected = [{ id: '1', name: 'document 1', editedAt: '1523109000'}];
       assert.deepEqual(actual, expected);
   });

   it('Try to delete document from non-empty state, no matching id', () => {
       const state = [{ id: '1', name: 'document 1', editedAt: '1523109000' }, { id: '2', name: 'document 2', editedAt: '1523109001'}];
       const actual = reducer(state, documentsActions.deleteDocumentSuccess(3));
       assert.deepEqual(actual, state);
   });

   it('Rename document in not-empty state', () => {
       const state = [{ id: '1', name: 'document 1', editedAt: '1523109000' }, { id: '2', name: 'document 2', editedAt: '1523109001'}];
       const actual = reducer(state, documentsActions.updateDocumentSuccess('2', 'new name', '1523109002'));
       const expected = [{ id: '2', name: 'new name', editedAt: '1523109002'}, { id: '1', name: 'document 1', editedAt: '1523109000' }];
       assert.deepEqual(actual, expected);
   });



});