import React from 'react';
import qstring from 'query-string';

import PropTypes from 'prop-types';

import RenderCanvas from 'views/containers/RenderCanvas';
import Toolbar from 'views/containers/Toolbar';

class DrawPage extends React.Component{

    render() {
        return (
            <div>
                <Toolbar/>
                <RenderCanvas documentId={qstring.parse(this.props.location.search).id}/>
            </div>
        );
    }
}

DrawPage.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string.isRequired
    })
};

export default DrawPage;