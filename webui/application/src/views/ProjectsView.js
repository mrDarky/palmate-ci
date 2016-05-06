import React from 'react';

import { ProjectList } from '../components/projects';

class ProjectsView extends React.Component {
  render() {
    const template = (
      <div className="container clear">
        <div className="col-1">
          <ProjectList />
        </div>
        <div className="col-2">
          {this.props.children}
        </div>
      </div>
    );
    return template;
  }
}

ProjectsView.propTypes = {
  children: React.PropTypes.element
};

export default ProjectsView;
