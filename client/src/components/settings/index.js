import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/';

class Settings extends Component {
  state = {}

  handleFormSubmit = ({ username, password }) => {
    this.props.login(username, password, this.props.history);
  };

  render() {
    return (
      <div className="settings">
        <Sidebar />
        <div className="settings-form">
          <h1>Change Password</h1>
          <form className="add-invoice" onSubmit={this.handleFormSubmit}>
            <Field
              name="name"
              component="input"
              className="settings_field"
              placeholder="Email"
            />
            <br />
            <Field
              name="company"
              component="input"
              className="settings_field"
              placeholder="Password"
            />
            <br />
            <Field
              name="email"
              component="input"
              className="settings_field"
              placeholder="New Password"
            />
            <Field
              name="email"
              component="input"
              className="settings_field"
              placeholder="Confirm Password"
            />
            <br />
            <button
              className="settings_submit"
              type="submit"
              value="Submit"
            >Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const Config = (connect(null)(Settings));

export default reduxForm({
  form: 'ChangeCredentials', // Unique name for the form
  fields: ['username', 'password'],
})(Config);
