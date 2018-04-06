import React from 'react';
import { connect } from 'react-redux';

import {documentsOperations, documentsSelectors} from "state/application/documents";
import DashboardComponent from 'views/components/Dashboard/Dashboard';

const mapStateToProps = (state) => ({
    documents: documentsSelectors.getAllDocuments(state)
});

const mapDispatchToProps = ({
    createDocument: documentsOperations.createDocument,
    updateDocument: documentsOperations.updateDocument,
    deleteDocument: documentsOperations.deleteDocument,
    fetchDocuments: documentsOperations.fetchDocuments
});

const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);

export default Dashboard;