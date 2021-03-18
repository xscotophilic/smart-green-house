import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import {
  setmoisturecontrollerdata,
  getmoisturecontrollerdata,
} from "../../actions/index";

import "./ChangeMoistureRange.css";

class ChangeMoistureRange extends Component {
  async componentDidMount() {
    await this.props.getmoisturecontrollerdata(
      this.props.match.params.id,
      this.props.user.user_id
    );
  }

  render() {
    return (
      <div className="outerwrap">
        <div className="form">
          <div className="form-toggle"></div>

          <div className="form-panel one">
            <div className="form-header">
              <h1>Change the range</h1>
            </div>
            <div className="form-content">
              <form
                autoComplete="off"
                onSubmit={this.props.handleSubmit((e) =>
                  this.props.setmoisturecontrollerdata(
                    e,
                    this.props.moistcontrollerdata[0].user_id,
                    this.props.moistcontrollerdata[0].sensor_id,
                    this.props.moistcontrollerdata[0].motor_status
                  )
                )}
              >
                <div className="form-group">
                  <label htmlFor="lowerbound_moi">
                    Lower bound of moisture
                  </label>
                  <Field
                    component="input"
                    type="number"
                    name="lowerbound_moi"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="upperbound_moi">
                    Upper bound of moisture
                  </label>
                  <Field
                    component="input"
                    type="number"
                    name="upperbound_moi"
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <img src="/conversion.png" alt="conversion"></img>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user, moistcontrollerdata }) {
  return { user, moistcontrollerdata };
}

const wrappedChangeRange = connect(mapStateToProps, {
  setmoisturecontrollerdata,
  getmoisturecontrollerdata,
})(ChangeMoistureRange);

export default reduxForm({
  form: "changemoisturerangeform",
})(wrappedChangeRange);
