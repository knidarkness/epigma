import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Header from './../Header/Header';
import './Dashboard.scss'

import {DOCUMENT_LIST_URI} from "../../const";

class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }

    async createDocument(){
        const docName = prompt('Enter document name');
        if (!docName || docName.length === 0) return;
        this.props.createIllustration(docName);
    }

    async deleteDocument(documentId){
        const confirmed = confirm('Are you sure, you want to delete this document?');
        if (confirmed){
            this.props.deleteDocument(documentId);
        }
    }

    async editDocument(documentId){
        const newName = prompt('Enter new document name', 'Current name');
        if (newName && newName.length > 0){
            this.props.renameDocument(documentId, newName);
        }
    }

    async componentDidMount() {
        this.props.itemsFetchData(DOCUMENT_LIST_URI);
    }


    render() {
        return (
            <div>
                <Header/>
                <main className="dashboard">
                    <header className='dashboard-header'>
                        <h2 className="dashboard-header__title">Your documents</h2>
                        <input className="dashboard-header__add" type="button"
                               value="+" onClick={this.createDocument.bind(this)}/>
                    </header>
                    <div className='document-list-header'>
                        <span className='document-list-header__name'>Name</span>
                        <span className='document-list-header__last-edited'>Last modified</span>
                        <span></span>
                    </div>
                    <ul className="document-list">
                        {
                            this.props.documents.map(d => (
                                <li key={d.id} className="document-list__item">
                                    <Link to={`/edit?id=${d.id}`}>
                                        <span>{d.name}</span>
                                        <span>{moment(d.editedAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                        <div>
                                            <button className="button button_edit" onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                this.editDocument(d.id);
                                            }}></button>
                                            <button className="button button_delete" onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                this.deleteDocument(d.id);
                                            }}></button>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </main>
            </div>
        )
    }
}

export default Dashboard;
