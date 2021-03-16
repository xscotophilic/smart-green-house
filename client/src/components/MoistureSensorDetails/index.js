import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  fetchmoistbysensorid,
  allmoistbysensorid,
  getmoisturecontrollerdata,
} from "../../actions";

import "./MoistureSensorDetails.css";

class Sensors extends Component {
  async componentDidMount() {
    await this.props.getmoisturecontrollerdata(
      this.props.match.params.id,
      this.props.user.user_id
    );
    await this.props.fetchmoistbysensorid(
      this.props.match.params.id,
      this.props.user.user_id
    );
    await this.props.allmoistbysensorid(
      this.props.match.params.id,
      this.props.user.user_id
    );
  }

  graphhelper() {
    const data = this.props.allmoistbysensor.slice(0, 15).reverse();
    return (
      <div className="hide-on-med-and-down flex-center chartcenter">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="entrytime" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="moisture" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }

  watermotor() {
    if (this.props.moistcontrollerdata[0].motor_status) {
      return (
        <div>
          <div className="col s12 m12 wrapforwavesouter">
            <div className="wrapforwaves">
              <div className="wave"></div>
              <div className="wave1"></div>
              <div className="wave2"></div>
            </div>
          </div>
          <h6>Watermotor Status: On</h6>
        </div>
      );
    } else {
      return (
        <div>
          <div className="col s12 m12 wrapforwavesouter">
            <div className="wrapforwaves">
              <div className="wave0"></div>
            </div>
          </div>
          <h6>Watermotor Status: Off</h6>
        </div>
      );
    }
  }

  mapalltemp() {
    return (
      <div className="row whiteall">
        <h5 style={{ padding: "25px 0px", margin: "0px" }}>Recorded data</h5>
        {this.graphhelper()}
        <hr />
        {this.props.allmoistbysensor.map((value, index) => {
          return (
            <div key={index} className="col paddingbw s12 m12">
              <div style={{ textAlign: "center" }}>
                <div className="col s6 m6">moisture: {value.moisture}</div>
                <div className="col s6 m6">
                  <Moment format="DD MMM YYYY">{value.entrytime}</Moment>,{" "}
                  <Moment format="hh:mm:ss">{value.entrytime}</Moment>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  renderContent() {
    if (this.props.user == null) {
      return <h3>Login Error!</h3>;
    } else if (
      this.props.user.user_id != null &&
      this.props.recentmoistbysensors[0] != null &&
      this.props.allmoistbysensor != null &&
      this.props.moistcontrollerdata.length > 0
    ) {
      return (
        <div className="mainouter" style={{ padding: "25px" }}>
          <div className="row white whitebox">
            <div className="col s12 m6">
              <img alt="farmimage" width="100%" src="/tempbg.png"></img>
            </div>
            <div className="col s12 m6 ">
              <div className="carddetails" style={{ textAlign: "left" }}>
                Last recorded Moisture for sensor{" "}
                {this.props.recentmoistbysensors[0].sensor_id} is{" "}
                {this.props.recentmoistbysensors[0].moisture}.
                <br />
                It was recorded on{" "}
                <Moment format="DD MMM YYYY">
                  {this.props.recentmoistbysensors[0].entrytime}
                </Moment>
                ,{" "}
                <Moment format="hh:mm:ss">
                  {this.props.recentmoistbysensors[0].entrytime}
                </Moment>
                .
              </div>
            </div>
          </div>
          <div className="row white whitebox">
            <div className="col s12 m12 ">
              <div className="carddetails" style={{ textAlign: "left" }}>
                Lower bound of moisture:{" "}
                {this.props.moistcontrollerdata[0].lowerbound_moi}
                <br />
                Upper bound of moisture:{" "}
                {this.props.moistcontrollerdata[0].upperbound_moi}
                <br />
                <Link
                  style={{ margin: "12px auto" }}
                  className="btn"
                  to={`/changemoisturerange/${this.props.match.params.id}`}
                >
                  Change The Range
                </Link>
                <hr style={{ margin: "10px auto" }} />
              </div>
              {this.watermotor()}
            </div>
          </div>
          <div>{this.mapalltemp()}</div>
        </div>
      );
    } else if (this.props.user.user_id != null) {
      return (
        <div
          className="preloader-wrapper small active"
          style={{ marginTop: "30px" }}
        >
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
      <div
        style={{
          backgroundColor: "#edf2fb",
          textAlign: "center",
        }}
      >
        <div className="container">{this.renderContent()}</div>
      </div>
    );
  }
}

function mapStateToProps({
  user,
  recentmoistbysensors,
  allmoistbysensor,
  moistcontrollerdata,
}) {
  return { user, recentmoistbysensors, allmoistbysensor, moistcontrollerdata };
}

export default connect(mapStateToProps, {
  fetchmoistbysensorid,
  allmoistbysensorid,
  getmoisturecontrollerdata,
})(Sensors);
