import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import { setcontrollerdata, getcontrollerdata } from "../../actions/index";

import "./ChangeRange.css";

class ChangeRange extends Component {
  async componentDidMount() {
    await this.props.getcontrollerdata(
      this.props.match.params.id,
      this.props.user.user_id
    );
  }

  render() {
    return (
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
                this.props.setcontrollerdata(e, this.props.gcontrollerdata[0].user_id, this.props.gcontrollerdata[0].sensor_id, this.props.gcontrollerdata[0].fan_status, this.props.gcontrollerdata[0].light_status)
              )}
            >
              <div className="form-group">
                <label htmlFor="lowerbound_temp">Lower bound of temp</label>
                <Field
                  component="input"
                  type="number"
                  name="lowerbound_temp"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="upperbound_temp">Upper bound of temp</label>
                <Field
                  component="input"
                  type="number"
                  name="upperbound_temp"
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
    );
  }
}

function mapStateToProps({ user, gcontrollerdata }) {
  return { user, gcontrollerdata };
}

const wrappedChangeRange = connect(mapStateToProps, {
  setcontrollerdata,
  getcontrollerdata,
})(ChangeRange);

export default reduxForm({
  form: "changerangeform",
})(wrappedChangeRange);
