import React from 'react';

import Components from './Components.jsx';
import Layers from './Layers.jsx';
import PageDesign from './PageDesign.jsx';

export default class ProjectImage extends React.Component{
    render () {
        return (
            <section>
                <Components/>
                <Layers/>
                <PageDesign/>
            </section>
        )
    }
}