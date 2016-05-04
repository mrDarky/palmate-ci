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
      projectsStoreListener: ProjectsStore.addListener(this.projectsStoreListener)
    };
  }

  componentWillMount() {
    ProjectsActions.loadProjects();
  }

  componentWillUnmount() {
    this.state.projectsStoreListener.remove();
  }

  projectsStoreListener() {
    this.setState({ projects: ProjectsStore.projects });
  }

  render() {
    let template;
    if (this.state.projects !== undefined) {
      template = (
        <div className="project-list">
          {this.state.projects.map((item, index) => {
            const keys = Object.keys(item);
            const path = `/projects/${item[keys[0]]}`;
            return <Link to={path} key={index} className="project-list__item">{keys[0]}</Link>;
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

export default ProjectList;
