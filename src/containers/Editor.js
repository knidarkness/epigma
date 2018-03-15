import React from 'react';
import { connect } from 'react-redux';
import { createPath } from '../actions';

import RenderCanvas from './RenderCanvas';
import Toolbar from './Toolbar';

let Editor = ({dispatch}) => {
    return (
      <div>
          <Toolbar/>
          <RenderCanvas/>
      </div>
    );
};


Editor = connect()(Editor);

export default Editor;