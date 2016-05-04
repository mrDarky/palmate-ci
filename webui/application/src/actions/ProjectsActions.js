import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

export default {
  loadProjects: () => Dispatcher.dispatch({
    action: Constants.LOAD_PROJECTS
  }),
  emitChange: () => Dispatcher.dispatch({
    action: Constants.EMIT_CHANGE_PROJECTS
  })
};
