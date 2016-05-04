import { Store } from 'flux/utils';

import ProjectsActions from '../actions/ProjectsActions';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

class ProjectsStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this.projects = [];
  }

  loadProjects() {
    fetch('http://0.0.0.0:12345/projects')
      .then((response) => response.json())
      .then((json) => {
        this.projects = json.projects;
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
      case Constants.EMIT_CHANGE_PROJECTS:
        this.__emitChange();
        break;
      default:
        break;
    }
  }
}

export default new ProjectsStore(Dispatcher);
