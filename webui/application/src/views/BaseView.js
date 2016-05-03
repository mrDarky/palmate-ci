import React from 'react';

import Header from '../components/header';

class BaseView extends React.Component {
  getActiveTab() {
    let activeTab;
    switch (this.props.location.pathname) {
      case '/projects':
        activeTab = 1;
        break;
      case '/builds':
        activeTab = 2;
        break;
      case '/leaves':
        activeTab = 3;
        break;
      default:
        activeTab = 0;
        break;
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
