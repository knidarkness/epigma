import React from 'react';
import qstring from 'query-string';

import RenderCanvas from 'containers/RenderCanvas';
import Toolbar from 'containers/Toolbar';
import Stats from "containers/Stats";

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