import React from 'react';
import { connect } from 'react-redux';

import {getDocuments} from "reducers";

import {createDocument, updateDocument, deleteDocument, fetchDocuments} from "actions/document";
import DashboardComponent from 'components/Dashboard/Dashboard';

const mapStateToProps = (state) => ({
    documents: getDocuments(state)
});

const mapDispatchToProps = ({
    createDocument,
    updateDocument,
    deleteDocument,
    fetchDocuments
});

const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);

export default Dashboard;