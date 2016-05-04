import React from 'react';
import { Link } from 'react-router';

import Navigation from './navigation';

class Header extends React.Component {
  render() {
    const template = (
      <header className="header">
        <div className="container">
          <div className="col-3">
            <Link to="/" className="header__logo">palmate-ci</Link>
            <Navigation activeTab={this.props.activeTab} />
          </div>
        </div>
      </header>
    );
    return template;
  }
}

Header.propTypes = {
  activeTab: React.PropTypes.number.isRequired
};

export default Header;
