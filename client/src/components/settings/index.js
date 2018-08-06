import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Sidebar from '../sidebar';
import { changePassword } from '../../actions/auth';

const styles = {
  borderBottom: 'none',
  color: 'black',
  border: 'none',
  fontSize: '1.5rem',
  paddingBottom: '2rem',
  paddingTop: '1rem',
};

class Settings extends Component {
  state = {
    error: '',
  };

  handleFormSubmit = ele => {
    if (ele.password !== ele.newPassword) {
      this.setState({ error: 'Passwords do not match' });
    }
    this.props.changePassword(ele, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="window">
        <Sidebar />
        <div className="billing-container">
          <div
            className="billing-navigation"
            style={{ justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <div className="billing-navigation_container">
              <div className="billing-navigation_container_clickable">
                {/* <div className="invoice-buttons"> */}
                <div className="settings-navigation_password">
                  <p>
                    Change Password <i className="fas fa-key" />
                  </p>
                </div>
              </div>
              {/* <p className="setting-line" /> */}
              {/* <p className="settings-navigation_themes">
              Themes

              <i className="fas fa-pencil-alt fa-fw" />
              <br />
            </p> */}
              {/* <div className="own-class ui compact menu" style={{ border: 'none' }}>
              <div className="ui simple dropdown item own-class" style={styles}>
              Themes
              <i className="fas fa-pencil-alt fa-fw" />
              <div className="menu" style={{ paddingTop: '0.3rem', fontSize: '1.3rem' }}>
              <div className="item" onClick={this.listView}>
              Dark
              </div>
              <div className="item" onClick={this.boxView}>
              Light
              </div>
              </div>
              </div>
            </div> */}
            </div>
            {/* </div> */}
          </div>
          <div className="billing-window">
            <div className="settings-form">
              <h1>Change Password</h1>
              <p>{this.state.error}</p>
              <form className="add-invoice" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Field
                  type="email"
                  name="email"
                  component="input"
                  className="settings_field"
                  placeholder="Email"
                  required
                />
                <br />
                <Field
                  type="password"
                  name="currentPassword"
                  component="input"
                  className="settings_field"
                  placeholder="Password"
                  required
                />
                <br />
                <Field
                  type="password"
                  name="password"
                  component="input"
                  className="settings_field"
                  placeholder="New Password"
                  required
                />
                <Field
                  type="password"
                  name="newPassword"
                  component="input"
                  className="settings_field"
                  placeholder="Confirm Password"
                  required
                />
                <br />
                <button className="settings_submit" type="submit" value="Submit">
                  Change Password
                </button>
              </form>
              <h3>{this.props.success}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.auth.success,
  };
};

const Config = connect(
  mapStateToProps,
  { changePassword },
)(Settings);

export default reduxForm({
  form: 'ChangeCredentials', // Unique name for the form
})(Config);
