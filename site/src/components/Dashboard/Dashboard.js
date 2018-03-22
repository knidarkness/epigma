import React from 'react';
import {Link} from 'react-router-dom';

import Header from './../Header/Header';
import './Dashboard.scss'

import {DOCUMENT_LIST_URI} from "../../const";

class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }

    fetchData() {
        fetch(DOCUMENT_LIST_URI)
            .then(function(response) {
                return response.json();
            })
            .then((data) => {
                data.documents
                    .forEach(doc => {
                        console.log(doc);
                        this.props.createDocument(doc.id, doc.name, doc.editedAt);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }

    async createDocument(){
        const docName = prompt('Enter document name');
        if (!docName || docName.length === 0) return;
        const request = new Request(DOCUMENT_LIST_URI, {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({
                name: docName
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        const r = await fetch(request);
        r.json()
            .then((doc) => {
                this.props.createDocument(doc.data._id, doc.data.name, doc.data.editedAt);
            });
    }

    async deleteDocument(documentId){
        const request = new Request(DOCUMENT_LIST_URI + '/' + documentId, {
            method: 'DELETE',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(() => {
                this.props.deleteDocument(documentId);
            });
    }

    async componentDidMount() {
        await this.fetchData();
    }



    timeConverter(UNIX_timestamp){
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
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
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            this.deleteDocument(d.id);
                                        }}></button>
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
