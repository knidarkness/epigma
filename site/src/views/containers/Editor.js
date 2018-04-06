import React from 'react';
import { connect } from 'react-redux';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Dashboard from './Dashboard';
import DrawPage from 'views/components/DrawPage/DrawPage';

let Editor = ({dispatch}) => {
    return (
      <Router>
          <div>
              <Route exact path='/' component={Dashboard}/>
              <Route path='/edit' component={DrawPage}/>
          </div>
      </Router>
    );
};


Editor = connect()(Editor);

export default Editor;