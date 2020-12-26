import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchsensorids } from "../../actions";
import "./AllMySensors.css";

class Sensors extends Component {
  async componentDidMount() {
    if (this.props.user == null) {
    } else if (this.props.user != null) {
      await this.props.fetchsensorids(this.props.user.user_id);
    }
  }

  renderContent() {
    if (this.props.user == null) {
      return <h3>Login Error!</h3>;
    } else if (this.props.user.user_id != null && this.props.sensorids) {
      return (
        <div>
          <h4 style={{ margin: "30px auto" }}>
            Click on sensor id to see details.
          </h4>
          {this.props.sensorids.map((value, index) => {
            return (
              <div key={index}>
                <div className="col s12 m12" style={{ margin: "10px auto" }}>
                  <Link to={`/details/${value}`} className="fillfontcolor">
                    <button className="fill">
                      Check temperature for Sensor: {value}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else if (this.props.user.user_id != null) {
      return (
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
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

function mapStateToProps({ user, sensorids }) {
  return { user, sensorids };
}

export default connect(mapStateToProps, {
  fetchsensorids,
})(Sensors);
