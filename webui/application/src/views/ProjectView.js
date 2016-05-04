import React from 'react';

import { ProjectInfo } from '../components/projects';

class ProjectView extends React.Component {
  render() {
    const template = (
      <div>
        <ProjectInfo id={Number(this.props.routeParams.id)} />
      </div>
    );
    return template;
  }
}

ProjectView.propTypes = {
  routeParams: React.PropTypes.object
};

export default ProjectView;
