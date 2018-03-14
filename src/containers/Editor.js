import React from 'react';
import { connect } from 'react-redux';
import { createPath } from '../actions';

import RenderCanvas from './RenderCanvas';

let Editor = ({dispatch}) => {
    return (
      <div>
          <input type="button" onClick={(e) => {
              e.preventDefault();
              dispatch(createPath('bla bla bla'));
          }}/>
          <RenderCanvas/>
      </div>
    );
};


Editor = connect()(Editor);

export default Editor;