import React from 'react';
import { connect } from 'react-redux';

import {createDocument, renameDocument, deleteDocument} from "../actions";
import DashboardComponent from './../components/Dashboard/Dashboard';

const mapStateToProps = (state) => ({
    documents: state.documents
});

const mapDispatchToProps = ({
    createDocument,
    renameDocument,
    deleteDocument
});

const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);

export default Dashboard;