import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import BaseView from './views/BaseView';
import HomeView from './views/HomeView';
import ErrorView from './views/ErrorView';
import BuildsView from './views/BuildsView';
import BuildView from './views/BuildView';
import LeavesView from './views/LeavesView';
import LeafView from './views/LeafView';
import ProjectsView from './views/ProjectsView';
import ProjectView from './views/ProjectView';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={BaseView}>
      <IndexRoute component={HomeView} />
      <Route path="/projects" component={ProjectsView} />
      <Route path="/projects/:id" component={ProjectView} />
      <Route path="/builds" component={BuildsView} />
      <Route path="/builds/:id" component={BuildView} />
      <Route path="/leaves" component={LeavesView} />
      <Route path="/leaves/:id" component={LeafView} />
    </Route>
    <Route path="*" component={ErrorView} />
  </Router>
);
