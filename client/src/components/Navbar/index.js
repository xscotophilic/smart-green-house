import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Navbar.css";

class Header extends Component {
  renderContent() {
    if (this.props.user == null) {
      return (
        <li>
          <Link to="/myfarming">My Farming</Link>
        </li>
      );
    } else if (this.props.user.user_id != null) {
      return (
        <Fragment>
          <li>
            <Link to="/moisturesensors">Moisture Sensors</Link>
          </li>
          <li>
            <Link to="/sensors">Temperature Sensors</Link>
          </li>
        </Fragment>
      );
    }
  }

  render() {
    return (
      <header>
        <div className="ui container">
          <Link to="/" className="left brand-logo">
            Smart Green House
          </Link>
          <input id="nav" type="checkbox" />
          <label htmlFor="nav"></label>
          <nav style={{ backgroundColor: "#ff9f1c" }}>
            <ul>{this.renderContent()}</ul>
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
