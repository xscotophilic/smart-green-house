import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import { verifyuser } from "../../actions/index";

import "./UserSpecificData.css";

class UserSpecificData extends Component {
  render() {
    return (
      <div className="form">
        <div className="form-toggle"></div>

        <div className="form-panel one">
          <div className="form-header">
            <h1>Account Login</h1>
          </div>
          <div className="form-content">
            <form
              autoComplete="off"
              onSubmit={this.props.handleSubmit((e) =>
                this.props.verifyuser(e)
              )}
            >
              <div className="form-group">
                <label htmlFor="username">User id</label>
                <Field
                  component="input"
                  type="string"
                  name="userid"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="userpassword">User password</label>
                <Field
                  component="input"
                  type="password"
                  name="userpass"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const wrappedUserForm = connect(null, {
  verifyuser,
})(UserSpecificData);

export default reduxForm({
  form: "userform",
})(wrappedUserForm);
