import React from 'react';
import { connect } from 'react-redux';
import { createPath } from '../actions';

import RenderCanvas from './RenderCanvas';
import Toolbar from './Toolbar';
import Stats from "./Stats";

let Editor = ({dispatch}) => {
    return (
      <div>
          <Toolbar/>
          <Stats/>
          <RenderCanvas/>
      </div>
    );
};


Editor = connect()(Editor);

export default Editor;