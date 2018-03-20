import React from 'react';
import { connect } from 'react-redux';
import { createPath } from '../actions';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import RenderCanvas from './RenderCanvas';
import Toolbar from './Toolbar';
import Stats from "./Stats";
import Dashboard from './Dashboard';

let Editor = ({dispatch}) => {
    return (
      <Router>
          <div>
              <Route exact path='/' component={Dashboard}/>
              <Route path='/edit' component={canvas}/>
          </div>
      </Router>
    );
};

const canvas = () => (
    <div>
        <Toolbar/>
        <Stats/>
        <RenderCanvas/>
    </div>
);

Editor = connect()(Editor);

export default Editor;