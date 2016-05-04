import React from 'react';

import ProjectsActions from '../../../actions/ProjectsActions';
import ProjectsStore from '../../../stores/ProjectsStore';

class ProjectInfo extends React.Component {
  constructor() {
    super();
    this.projectsStoreListener = this.projectsStoreListener.bind(this);
    this.state = {
      project: undefined,
      projectsStoreListener: ProjectsStore.addListener(this.projectsStoreListener)
    };
  }

  componentWillMount() {
    ProjectsActions.loadProjectInfo(this.props.id);
  }

  componentWillUnmount() {
    this.state.projectsStoreListener.remove();
  }

  projectsStoreListener() {
    this.setState({ project: ProjectsStore.projectInfo });
  }

  render() {
    let template;
    if (this.state.project !== undefined) {
      template = (
        <section className="project-info">
          <h2 className="project-info__title">{this.state.project.name}</h2>
          <p className="project-info__description">{this.state.project.description}</p>
          <div className="clear">
            <a href={this.state.project.url} className="project-info-link">
              <span className="project-info-link__icon fa fa-link"></span>
              <span>Website</span>
            </a>
            <a href={this.state.project.git.url} className="project-info-link">
              <span className="project-info-link__icon fa fa-github"></span>
              <span>GitHub</span>
            </a>
          </div>
        </section>
      );
    } else {
      template = (
        <div>
          <h1>LOADING...</h1>
        </div>
      );
    }
    return template;
  }
}

ProjectInfo.propTypes = {
  id: React.PropTypes.number
};

export default ProjectInfo;
