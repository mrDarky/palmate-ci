import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {
  createTab(to, name, active) {
    let className = 'header-nav__item';
    if (active) {
      className = `${className} header-nav__item--active`;
    }
    return (
      <Link to={to} className={className}>{name}</Link>
    );
  }

  render() {
    let projectsTab = this.createTab('/projects', 'Projects', false);
    let buildsTab = this.createTab('/builds', 'Builds', false);
    let leavesTab = this.createTab('/leaves', 'Leaves', false);
    switch (this.props.activeTab) {
      case 1:
        projectsTab = this.createTab('/projects', 'Projects', true);
        break;
      case 2:
        buildsTab = this.createTab('/builds', 'Builds', true);
        break;
      case 3:
        leavesTab = this.createTab('/leaves', 'Leaves', true);
        break;
      default:
        break;
    }
    return (
      <nav className="header-nav">
        {projectsTab}
        {buildsTab}
        {leavesTab}
      </nav>
    );
  }
}

Navigation.propTypes = {
  activeTab: React.PropTypes.number.isRequired
};

export default Navigation;
