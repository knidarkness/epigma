import React from 'react';
import {Link} from 'react-router-dom';

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
        this.props.deleteDocument(documentId);
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

    timeConverter(UNIX_timestamp){
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes().toString().length === 2 ? a.getMinutes() : '0' + a.getMinutes();
        const sec = a.getSeconds().toString().length === 2 ? a.getSeconds() : '0' + a.getSeconds();
        const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    render() {
        console.log(this.props.documents);
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
                                    <Link to={`/edit?&id=${d.id}`}>
                                        <span>{d.name}</span>
                                        <span>{this.timeConverter(Number(d.editedAt)/1000)}</span>
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
