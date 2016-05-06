import React from 'react';
import { Link } from 'react-router';

import ProjectsActions from '../../../actions/ProjectsActions';
import ProjectsStore from '../../../stores/ProjectsStore';

class ProjectList extends React.Component {
  constructor() {
    super();
    this.projectsStoreListener = this.projectsStoreListener.bind(this);
    this.state = {
      projects: undefined,
      activeId: undefined,
      projectsStoreListener: ProjectsStore.addListener(this.projectsStoreListener)
    };
  }

  componentWillMount() {
    ProjectsActions.loadProjects();
  }

  componentWillUnmount() {
    ProjectsActions.resetProjectId();
    this.state.projectsStoreListener.remove();
  }

  projectsStoreListener() {
    this.setState({ projects: ProjectsStore.projects, activeId: ProjectsStore.projectId });
  }

  renderLink(path, key, name, active) {
    let className = 'project-list__item';
    if (active) {
      className = `${className} project-list__item--active`;
    }
    return <Link to={path} key={key} className={className}>{name}</Link>;
  }

  render() {
    let template;
    if (this.state.projects !== undefined) {
      template = (
        <div className="project-list">
          {this.state.projects.map((item, index) => {
            const keys = Object.keys(item);
            const path = `/projects/${item[keys[0]]}`;
            const active = item[keys[0]] === this.state.activeId;
            return this.renderLink(path, index, keys[0], active);
          })}
        </div>
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

ProjectList.propTypes = {
  activeId: React.PropTypes.number
};

export default ProjectList;
