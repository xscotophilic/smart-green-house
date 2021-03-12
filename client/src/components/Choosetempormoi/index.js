import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import "./Choosetempormoi.css";

class Choosetempormoi extends Component {
  renderContent() {
    if (this.props.user == null) {
      return <h3>Login Error!</h3>;
    } else if (this.props.user.user_id != null) {
      return (
        <div>
          <h4 style={{ margin: "30px auto" }}>
            <div className="col s12 m12" style={{ margin: "10px auto" }}>
              <Link to={`/sensors`} className="fillfontcolor">
                <button className="fill">
                  Check temperature Sensors
                </button>
              </Link>
            </div>
            <div className="col s12 m12" style={{ margin: "10px auto" }}>
              <Link to={`/moisturesensors`} className="fillfontcolor">
                <button className="fill">
                  Check Moisture Sensors
                </button>
              </Link>
            </div>
          </h4>
        </div>
      );
    }
  }

  render() {
    return (
      <div style={{ textAlign: "center", margin: "30px" }}>
        <div className="row container">{this.renderContent()}</div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Choosetempormoi);
