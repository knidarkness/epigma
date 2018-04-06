import React from 'react';
import qstring from 'query-string';

import RenderCanvas from 'views/containers/RenderCanvas';
import Toolbar from 'views/containers/Toolbar';
import Stats from "views/containers/Stats";

class DrawPage extends React.Component{

    render() {
        return (
            <div>
                <Toolbar/>
                {/*<Stats/>*/}
                <RenderCanvas documentId={qstring.parse(this.props.location.search).id}/>
            </div>
        )
    }
}

export default DrawPage;