import React from 'react';
import { connect } from 'react-redux';

import {getDocuments} from "../reducers";

import {createIllustration, renameDocument, deleteDocument, itemsFetchData} from "../actions";
import DashboardComponent from './../components/Dashboard/Dashboard';

const mapStateToProps = (state) => ({
    documents: getDocuments(state)
});

const mapDispatchToProps = ({
    createIllustration,
    renameDocument,
    deleteDocument,
    itemsFetchData
});

const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);

export default Dashboard;