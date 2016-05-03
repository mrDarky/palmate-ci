import React from 'react';
import { Link } from 'react-router';

class BaseView extends React.Component {
  render() {
    const template = (
      <div>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/builds">Builds</Link>
        <Link to="/leaves">Leaves</Link>
        {this.props.children}
      </div>
    );
    return template;
  }
}

BaseView.propTypes = {
  children: React.PropTypes.element
};

export default BaseView;
