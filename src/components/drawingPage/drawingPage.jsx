import React from 'react';

import HeaderMenu from './HeaderMenu/index.jsx';

export default class DrawingPage extends React.Component{
    constructor(props){
        super(props);

    }

    render () {
        return ([
                <h1>E-pigma</h1>,
                <HeaderMenu/>
            ])
    }
}