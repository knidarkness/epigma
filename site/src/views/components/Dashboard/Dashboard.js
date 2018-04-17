import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

import Header from 'views/components/Header/Header';
import PromptDocumentModal from 'views/components/PromptDocumentModal/PromptDocumentModal';
import ConfirmModalWindow from 'views/components/ConfirmModalWindow/ConfirmModalWindow';
import './Dashboard.scss';
import ModalWindow from '../ModalWindow/ModalWindow';


class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            createVisible: false,
            removeVisible: false,
            renameVisible: false,
            selectedDoc: -1
        };
    }

    showCreateModal() {
        this.setState({createVisible: true});
    }

    hideCreateModal() {
        this.setState({createVisible: false});
    }

    showRemoveModal() {
        this.setState({removeVisible: true});
    }

    hideRemoveModal() {
        this.setState({removeVisible: false});
    }

    showRenameModal() {
        this.setState({renameVisible: true});
    }

    hideRenameModal() {
        this.setState({renameVisible: false});
    }

    async createDocument(docName){
        if (!docName || docName.length === 0) {
            return;
        }
        this.props.createDocument(docName);
    }

    async deleteDocument(documentId){
        this.setState({selectedDoc: documentId});
        this.showRemoveModal();
    }

    async editDocument(documentId){
        this.setState({selectedDoc: documentId});
        this.showRenameModal();
    }

    async componentDidMount() {
        this.props.fetchDocuments();
    }

    render() {
        return (
            <div>
                <Header/>
                <main className="dashboard">
                    <header className='dashboard-header'>
                        <h2 className="dashboard-header__title">Your documents</h2>
                        <input className="dashboard-header__add" type="button"
                            value="+" onClick={() => {
                                this.showCreateModal();
                            }}/>
                    </header>
                    <div className='document-list-header'>
                        <span className='document-list-header__name'>Name</span>
                        <span className='document-list-header__last-edited'>Last modified</span>
                        <span></span>
                    </div>

                    <ModalWindow content={PromptDocumentModal}
                        contentProps={{
                            message: 'Enter document name',
                            placeholder: 'Document name',
                            onOk: (docName) => {
                                alert('2');
                                this.props.createDocument(docName);
                            }
                        }}
                        visible={this.state.createVisible}
                        hideModal={() => {
                            this.hideCreateModal();
                        }}
                    />

                    <ModalWindow content={PromptDocumentModal}
                        contentProps={{
                            message: 'Enter new document name',
                            placeholder: 'New name',
                            onOk: (newName) => {
                                alert('1');
                                if (newName && newName.length > 0) {
                                    this.props.updateDocument(this.state.selectedDoc, newName);
                                }
                            }
                        }}
                        visible={this.state.renameVisible}
                        hideModal={() => {
                            this.hideRenameModal();
                        }}
                    />

                    <ModalWindow content={ConfirmModalWindow}
                        contentProps={{
                            onConfirm: () => {
                                this.props.deleteDocument(this.state.selectedDoc);
                            }
                        }}
                        visible={this.state.removeVisible}
                        hideModal={() => {
                            this.hideRemoveModal();
                        }}
                    />



                    <ul className="document-list">
                        {
                            this.props.documents.map(d => (
                                <li key={d.id} className="document-list__item">
                                    <Link to={`/edit?id=${d.id}`}>
                                        <span>{d.name}</span>
                                        <span>{dateformat(d.editedAt, 'dddd, mmmm dS, yyyy,  HH:MM:ss ')}</span>
                                        <div>
                                            <button className="button button_edit" onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                this.editDocument(d.id);
                                            }}> </button>
                                            <button className="button button_delete" onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                this.deleteDocument(d.id);
                                            }}> </button>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </main>
            </div>
        );
    }
}

Dashboard.propTypes = {
    createDocument: PropTypes.func.isRequired,
    deleteDocument: PropTypes.func.isRequired,
    updateDocument: PropTypes.func.isRequired,
    fetchDocuments: PropTypes.func.isRequired,
    documents: PropTypes.array
};

export default Dashboard;
