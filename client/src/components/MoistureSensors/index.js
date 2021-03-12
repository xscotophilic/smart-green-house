import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchmoisturesensorids } from "../../actions";
import "./Moisturesensors.css";

class MoistureSensors extends Component {
  async componentDidMount() {
    if (this.props.user == null) {
    } else if (this.props.user != null) {
      await this.props.fetchmoisturesensorids(this.props.user.user_id);
    }
  }

  renderContent() {
    if (this.props.user == null) {
      return <h3>Login Error!</h3>;
    } else if (this.props.user.user_id != null && this.props.moisturesensorids) {
      return (
        <div>
          <h4 style={{ margin: "30px auto" }}>
            Click on sensor id to see details.
          </h4>
          {this.props.moisturesensorids.map((value, index) => {
            return (
              <div key={index}>
                <div className="col s12 m12" style={{ margin: "10px auto" }}>
                  <Link to={`/moisturedetails/${value}`} className="fillfontcolor">
                    <button className="fill">
                      Check Moisture for Sensor: {value}
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

function mapStateToProps({ user, moisturesensorids }) {
  return { user, moisturesensorids };
}

export default connect(mapStateToProps, {
  fetchmoisturesensorids,
})(MoistureSensors);
