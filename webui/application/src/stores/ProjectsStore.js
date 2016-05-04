import { Store } from 'flux/utils';

import ProjectsActions from '../actions/ProjectsActions';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

class ProjectsStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this.path = 'http://0.0.0.0:12345';
    this.projects = [];
    this.projectInfo = undefined;
  }

  loadProjects() {
    fetch(`${this.path}/projects`)
      .then((response) => response.json())
      .then((json) => {
        this.projects = json.projects;
        ProjectsActions.emitChange();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadProjectInfo(id) {
    fetch(`${this.path}/projects/${id}`)
      .then((response) => response.json())
      .then((json) => {
        this.projectInfo = json;
        ProjectsActions.emitChange();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  __onDispatch(payload) {
    switch (payload.action) {
      case Constants.LOAD_PROJECTS:
        this.loadProjects();
        break;
      case Constants.LOAD_PROJECT_INFO:
        this.loadProjectInfo(payload.projectId);
        break;
      case Constants.EMIT_CHANGE_PROJECTS:
        this.__emitChange();
        break;
      default:
        break;
    }
  }
}

export default new ProjectsStore(Dispatcher);
