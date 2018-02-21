import React from 'react';

import BasicMenu from './BasicMenu.jsx';
import ExportMenu from './ExportMenu.jsx';
import MasterMenu from './MasterMenu.jsx';
import ProjectSettings from './ProjectSettings.jsx';

export default class HeaderMenu extends React.Component{
  render() {
      return ([
                <MasterMenu/>,
                <BasicMenu/>,
                <ProjectSettings/>,
                <ExportMenu/>
          ]
      )
  }
};