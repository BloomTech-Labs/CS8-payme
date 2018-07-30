import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../actions/auth';

import signin from './signin.jpg';
import backgroundImage from './signin.jpg';

const styles = {
  backgroundImage: `url(${backgroundImage})`,
  // backgroundSize: 'cover',
};

class Signin extends Component {
  handleFormSubmit = ele => {
    this.props.login(ele, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signin" style={styles}>
        <div className="signin-foreground">
          <div className="signin-imgbox">
            <img className="signin--img" src={signin} alt="img" />
            <p className="signin-headline">
              Sign in<br /> <span className="signin-headline2">Ut enim ad minim veniam, quis nostrud exercitation 
              ullamco laboris</span>
            </p>
          </div>
          <div className="signin--box">
            <h1 className="signin--box--title">
              payMe
              <span className="signin--box--dot">
              .
              </span>
              <br />
            </h1>
            <h1 className="signin--header">Sign In</h1>
            <h3>{this.props.message}</h3>
            <form className="signin--form" onSubmit={handleSubmit(this.handleFormSubmit)}>
              <Field
                name="username"
                component="input"
                className="signin--form_username"
                placeholder="Username"
                required
              />
              <br />
              <Field
                name="password"
                component="input"
                className="signin--form_password"
                placeholder="Password"
                required
              />
              <br />
              <button className="signin--form_button" action="submit" value="Sign In">
                Sign In
              </button>
            </form>
            <p className="signin--form_options"> Or sign In with </p>
            {/* <div className="signin--buttons">
              <button className="signin--buttons__facebook">
                <i className="fab fa-facebook-square" />facebook
              </button>
              <button className="signin--buttons__google">
                <img
                  src={logo}
                  alt="google logo"
                  className="signin--buttons__google--logo"
                />Google
              </button>
            </div> */}
            <p className="signin--form_notmember">
              Not a member? <Link to="/signup"> Sign up </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    message: state.auth.message,
  };
};

Signin = connect(
  mapStateToProps,
  { login },
)(Signin);

export default reduxForm({
  form: 'logIn', // Unique name for the form
})(Signin);
