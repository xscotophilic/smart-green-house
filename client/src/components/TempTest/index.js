import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchtemp } from '../../actions';

import WarningCard from './WarningCard';
import Chart from './Chart';
import './MyFarming.css';

class MyFarming extends Component {
  state = {
    temp: '',
    sensor_id: '',
    user_id: ''
  };

  async componentDidMount() {
    await this.props.fetchtemp();
    this.setState({
      temp: this.props.fetchRecentTemp[0].temp,
      sensor_id: this.props.fetchRecentTemp[0].sensor_id,
      user_id: this.props.fetchRecentTemp[0].user_id
    });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h4>This is my farming & Stastics!</h4>
        <WarningCard />
        <Chart />
        <br />
        <div className="row">
          <h3>For Sensor 1:</h3>
          <div className="col s12 m6">
            <div className="card-panel teal">
              <span className="white-text">Temperature: {this.state.temp}</span>
            </div>
          </div>
          <div className="col s12 m6">
            <div className="card-panel teal">
              <span className="white-text">Sensor Id: {this.state.sensor_id}</span>
            </div>
          </div>
          <div className="col s12 m6">
            <div className="card-panel teal">
              <span className="white-text">User Id: {this.state.user_id}</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ fetchRecentTemp }) => {
  return { fetchRecentTemp };
};

export default connect(mapStateToProps, { fetchtemp })(MyFarming);