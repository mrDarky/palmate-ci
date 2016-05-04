import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

export default {
  loadProjects: () => Dispatcher.dispatch({
    action: Constants.LOAD_PROJECTS
  }),
  loadProjectInfo: (id) => Dispatcher.dispatch({
    action: Constants.LOAD_PROJECT_INFO,
    projectId: id
  }),
  resetProjectId: () => Dispatcher.dispatch({
    action: Constants.RESET_PROJECT_ID
  }),
  emitChange: () => Dispatcher.dispatch({
    action: Constants.EMIT_CHANGE_PROJECTS
  })
};
