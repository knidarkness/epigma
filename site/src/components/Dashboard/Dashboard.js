import React from 'react';

import './Dashboard.scss'
import {DOCUMENT_LIST_URI} from "../../const";
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

    async componentDidMount() {
        await this.fetchData();
    }

    render() {
        return (
            <main className="dashboard">
                <section className="action-bar">
                    <input type="button" value="Create"/>
                    <input type="button" value="Delete"/>
                </section>
                <ul className="document-list">
                    {
                        this.props.documents.map(d => (
                            <li key={d.id} className="document-list__item">
                                <a href={`/edit?&id=${d.id}`}>{d.name} - {d.id}</a>
                            </li>
                        ))
                    }
                </ul>
            </main>
        )
    }
}

export default Dashboard;
