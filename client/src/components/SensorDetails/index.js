import React, { Component } from "react";
import { connect } from "react-redux";
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
  fetchtempbysensorid,
  alltempbysensorid,
  getchartdata,
} from "../../actions";

import "./SensorDetails.css";

class Sensors extends Component {
  async componentDidMount() {
    await this.props.fetchtempbysensorid(
      this.props.match.params.id,
      this.props.user.user_id
    );
    await this.props.alltempbysensorid(
      this.props.match.params.id,
      this.props.user.user_id
    );
  }

  graphhelper() {
    const data = this.props.alltempbysensor.slice(0, 15).reverse();
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
          <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }

  mapalltemp() {
    return (
      <div className="row whiteall">
        <h5 style={{ padding: "25px 0px", margin: "0px" }}>Recorded data</h5>
        {this.graphhelper()}
        <hr />
        {this.props.alltempbysensor.map((value, index) => {
          return (
            <div key={index} className="col paddingbw s12 m12">
              <div style={{ textAlign: "center" }}>
                <div className="col s6 m6">temp: {value.temp}</div>
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
      this.props.recenttempbysensors[0] != null &&
      this.props.alltempbysensorid != null
    ) {
      return (
        <div className="mainouter" style={{ padding: "25px" }}>
          <div className="row white whitebox">
            <div className="col s12 m6">
              <img alt="farmimage" width="100%" src="/tempbg.png"></img>
            </div>
            <div className="col s12 m6 ">
              <div className="carddetails" style={{ textAlign: "left" }}>
                Last recorded temperature for sensor{" "}
                {this.props.recenttempbysensors[0].sensor_id} is{" "}
                {this.props.recenttempbysensors[0].temp}F.
                <br />
                It was recorded on{" "}
                <Moment format="DD MMM YYYY">
                  {this.props.recenttempbysensors[0].entrytime}
                </Moment>
                ,{" "}
                <Moment format="hh:mm:ss">
                  {this.props.recenttempbysensors[0].entrytime}
                </Moment>
                .
              </div>
            </div>
          </div>
          <div>{this.mapalltemp()}</div>
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
  recenttempbysensors,
  alltempbysensor,
  chartdata,
}) {
  return { user, recenttempbysensors, alltempbysensor, chartdata };
}

export default connect(mapStateToProps, {
  fetchtempbysensorid,
  alltempbysensorid,
  getchartdata,
})(Sensors);
