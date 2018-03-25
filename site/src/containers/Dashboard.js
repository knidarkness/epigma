import React from 'react';
import { connect } from 'react-redux';

import {createIllustration, renameDocument, deleteDocument, itemsFetchData} from "../actions";
import DashboardComponent from './../components/Dashboard/Dashboard';

const mapStateToProps = (state) => ({
    documents: state.documents
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