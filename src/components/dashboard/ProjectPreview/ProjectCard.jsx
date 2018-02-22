import React from 'react';

import ProjectPreviewMenu from './ProjectPreviewMenu.jsx';
import ProjectImage from './ProjectImage.jsx';

export default class ProjectCard extends React.Component{
    render () {
        return (
            <article className="project-card">
                <ProjectImage/>
                <ProjectPreviewMenu/>
            </article>
        )
    }
}