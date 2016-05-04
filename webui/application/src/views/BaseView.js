import React from 'react';

import Header from '../components/header';

class BaseView extends React.Component {
  getActiveTab() {
    let activeTab;
    if (this.props.location.pathname.indexOf('/projects') !== -1) {
      activeTab = 1;
    } else if (this.props.location.pathname.indexOf('/builds') !== -1) {
      activeTab = 2;
    } else if (this.props.location.pathname.indexOf('/leaves') !== -1) {
      activeTab = 3;
    } else {
      activeTab = 0;
    }
    return activeTab;
  }

  render() {
    const template = (
      <div>
        <Header activeTab={this.getActiveTab()} />
        {this.props.children}
      </div>
    );
    return template;
  }
}

BaseView.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element
};

export default BaseView;
