import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Navbar.css';

class Header extends Component {

  renderContent() {
    if (this.props.user == null) {
      return (
        <li>
          <Link to='/myfarming'>My Farming</Link>
        </li>
      );
    }
    else if (this.props.user.user_id != null) {
      return (
        <li>
          <Link to='/sensors'>Sensors</Link>
        </li>
      );
    }
  }

  render() {
    return (
      <header>
        <div className='ui container'>
          <Link to='/' className='left brand-logo'>
            Smart Green House
          </Link>
          <input id='nav' type='checkbox' />
          <label htmlFor='nav'></label>
          <nav style={{backgroundColor: '#ff9f1c'}}>
            <ul>
              {this.renderContent()}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Header);