import React from 'react';

import Header from './../Header/Header';
import './Dashboard.scss'
import {API_URI, DOCUMENT_LIST_URI} from "../../const";
import documents from "../../reducers/documents";

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
                        this.props.createDocument(doc.id, doc.name);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }

    async createDocument(){
        const docName = prompt('Enter document name');
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
                this.props.createDocument(doc.data._id, doc.data.name);
            });
    }

    deleteDocument(){

    }

    async componentDidMount() {
        await this.fetchData();
    }

    render() {
        const itemList = [
            {
                id: 1,
                name: 'blalbaf',
                editedAt: 'Jan 01, 2018'
            },
            {
                id: 2,
                name: 'My illustration',
                editedAt: 'Jan 12, 2018'
            },
            {
                id: 3,
                name: 'Artwork to prove "M*khailo Huilo"',
                editedAt: 'Jan 23, 2018'
            },
            {
                id: 4,
                name: 'Some ideas not to cry about IoT',
                editedAt: 'Feb 02, 2018'
            },
            {
                id: 5,
                name: 'How I came to "galera"',
                editedAt: 'Feb 15, 2018'
            },
            {
                id: 6,
                name: 'Shiny new start-up...',
                editedAt: 'Mar 16, 2018'
            },{
                id: 3,
                name: 'Artwork to prove "M*khailo Huilo"',
                editedAt: 'Jan 23, 2018'
            },
            {
                id: 4,
                name: 'Some ideas not to cry about IoT',
                editedAt: 'Feb 02, 2018'
            },
            {
                id: 5,
                name: 'How I came to "galera"',
                editedAt: 'Feb 15, 2018'
            },
            {
                id: 6,
                name: 'Shiny new start-up...',
                editedAt: 'Mar 16, 2018'
            },{
                id: 3,
                name: 'Artwork to prove "M*khailo Huilo"',
                editedAt: 'Jan 23, 2018'
            },
            {
                id: 4,
                name: 'Some ideas not to cry about IoT',
                editedAt: 'Feb 02, 2018'
            },
            {
                id: 5,
                name: 'How I came to "galera"',
                editedAt: 'Feb 15, 2018'
            },
            {
                id: 6,
                name: 'Shiny new start-up...',
                editedAt: 'Mar 16, 2018'
            },
            {
                id: 7,
                name: 'Became digital testaments app...',
                editedAt: 'Mar 18, 2018'
            }
        ].reverse(); // instead of this.props.documents
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
                            itemList.map(d => (
                                <li key={d.id} className="document-list__item">
                                    <a href={`/edit?&id=${d.id}`}>
                                        <span>{d.name} - {d.id}</span>
                                        <span>{d.editedAt}</span>
                                        <button onClick={() => {alert('removing')}}></button>
                                    </a>
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
