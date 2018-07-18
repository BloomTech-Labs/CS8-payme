import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../actions';

// import logo from './google.png';
import backgroundImage from './background.jpg';

const styles = {
  backgroundImage: `url(${backgroundImage})`,
};

class Signin extends Component {

  handleFormSubmit = ({ username, password }) => {
    this.props.login(username, password, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;
    return ( 
      <div className="signup" style={styles}>
        <p className="signup-headline">Lorem ipsum <br/> <span className="signup-headline2">dolor sit amet</span></p>
        <div className="signup--box">
          <h1 className="signin--header">Sign In</h1>
          <h3>{this.props.message}</h3>
          <form className="signin--signin" onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Field 
              name="username"
              component="input"
              className="signin--signin__username"
              placeholder="Username"
              required
            />
            <br />
            <Field
              name="password"
              component="input"
              className="signin--signin__password"
              placeholder="Password"
              required
            />
            <br />
            <button
              className="signin--signin__button"
              action="submit"
              value="Sign In"
            >Sign In</button>
          </form>
          <p className="signin--orsign"> Or sign In with </p>
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
          <p className="signin--notmember">
              Not a member? <Link to="/signup"> Sign up </Link>
            </p>
        </div>
      </div>
     )
  }
}
const mapStateToProps = state => {
  return {
    message: state.auth.message,
  };
};

Signin = (connect(mapStateToProps, { login })(Signin));

export default reduxForm({
  form: 'logginIn', // Unique name for the form
  fields: ['username', 'password'],
})(Signin);
